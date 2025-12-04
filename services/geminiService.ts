import { GoogleGenAI, Type } from "@google/genai";
import { PredictionResponse } from "../types";

const apiKey = process.env.API_KEY;

// Fallback if key is missing to prevent crash, though logic handles errors
const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });

export const generateNewYearPrediction = async (): Promise<PredictionResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const model = "gemini-2.5-flash";
  
  const prompt = `
    Ты - волшебный новогодний оракул. Твоя задача - придумать короткое, смешное, доброе и вдохновляющее предсказание на 2026 год для случайного коллеги.
    
    Предсказание должно быть связано с работой, успехом, отдыхом или личным счастьем, но в стиле корпоративного мага. 
    Используй метафоры, связанные с новым годом, будущим, космосом и офисной магией.
    Не используй конкретные имена. Обращайся к человеку на "ты" или используй слово "Коллега".
    Тон: дружелюбный, праздничный, интригующий и с юмором.
    Длина: 2-3 предложения.
    Язык: Русский.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prediction: {
              type: Type.STRING,
              description: "Текст предсказания на 2026 год"
            },
            theme: {
              type: Type.STRING,
              enum: ['success', 'wealth', 'travel', 'love', 'wisdom'],
              description: "Основная тема предсказания для выбора иконки"
            }
          },
          required: ["prediction", "theme"]
        },
        temperature: 0.9, // Increased creativity for variety
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response generated");

    return JSON.parse(text) as PredictionResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Магия временно недоступна. Попробуйте позже!");
  }
};