
import { GoogleGenAI } from "@google/genai";
import { WeatherData, AppLocation, Unit } from "../types";

export const fetchWeatherFromGemini = async (
  location: AppLocation,
  unit: Unit
): Promise<WeatherData> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    throw new Error("Vercel üzerinde API_KEY ayarlanmamış. Lütfen Environment Variables kısmından API_KEY ekleyin.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const locationString = location.city 
    ? location.city 
    : `coordinates ${location.coords?.latitude}, ${location.coords?.longitude}`;

  const prompt = `Get the current weather and a 5-day forecast for ${locationString}.
  Please respond strictly with a JSON object. No other text. Use ${unit === 'metric' ? 'Celsius' : 'Fahrenheit'} for temperature.
  
  JSON structure:
  {
    "current": {
      "temp": number,
      "condition": string (e.g., Clear, Rain, Clouds),
      "description": string,
      "humidity": number (percentage),
      "windSpeed": number (km/h or mph),
      "feelsLike": number,
      "locationName": string
    },
    "forecast": [
      {
        "date": "YYYY-MM-DD",
        "temp": number (average temp for the day),
        "condition": string,
        "description": string
      }
    ]
  }

  Search for the most recent data to be accurate.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Gemini geçerli bir hava durumu verisi döndüremedi.");
    }

    const parsedData = JSON.parse(jsonMatch[0]);
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    return {
      ...parsedData,
      sources: sources || [],
    };
  } catch (err: any) {
    console.error("Gemini Weather Error:", err);
    throw new Error(err.message || "Hava durumu verisi alınırken bir hata oluştu.");
  }
};
