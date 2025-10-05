import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from "./prompt";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_GEMINI_API_KEY! });
const MODEL = "gemma-3n-e2b-it";

export async function getLLMFallbackResponse(
  type: "open" | "chat",
  raw: string
): Promise<string | null> {
  try {
    const prompt = buildPrompt(type, raw);

    const result = await ai.models.generateContent({
      model: MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // 🔥 Remove markdown formatting like ```json ... ```
    text = text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    return text;
  } catch (err) {
    console.error("LLM fallback error:", err);
    return null;
  }
}
