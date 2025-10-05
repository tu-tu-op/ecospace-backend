import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from "./prom";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_GEMINI_API_KEY! });
const MODEL = "gemma-3n-e2b-it";

export async function getLLMFallbackResponse(fileName: string, code: string): Promise<string> {
  try {
    const prompt = buildPrompt(fileName, code);

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [prompt],
    });

    const text = response.text ?? "No response generated.";
    console.log(response.text);

    return text
  } catch (err) {
    console.error("LLM fallback error:", err);
    return "Sorry, something went wrong while analyzing your request.";
  }
}
