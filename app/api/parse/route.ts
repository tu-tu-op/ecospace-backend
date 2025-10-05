import { NextRequest, NextResponse } from "next/server";
import { getLLMFallbackResponse } from "../../utils/llm"; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, input } = body;

    if (!type || !input) {
      return NextResponse.json({ error: "Missing input or type" }, { status: 400 });
    }

    const result = await getLLMFallbackResponse(type, input);

    // ✅ Log raw LLM result to terminal
    console.log("[LLM RESULT]", result);

    return NextResponse.json({ result });
  } catch (err) {
    console.error("LLM API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
