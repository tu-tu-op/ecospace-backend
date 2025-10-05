import { NextRequest, NextResponse } from "next/server";
import { getLLMFallbackResponse } from "../../utils/get-llm"; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileName, input } = body;

    if (!input) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 });
    }

    // Forward input to LLM
    const result = await getLLMFallbackResponse(fileName, input);

    // Log raw LLM result for debugging
    console.log("[LLM RESULT]", result);

    return NextResponse.json({ result });
  } catch (err) {
    console.error("LLM API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
