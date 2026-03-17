import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    // The test-ai.mjs uses GOOGLE_GENERATIVE_AI_API_KEY
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_GENERATIVE_AI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Prepare full prompt with history context
    // Vercel AI SDK generateText can also take 'messages' array, 
    // but to keep it simple and match the test-ai.mjs style:
    const context = history
      .map((msg: any) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
    
    const fullPrompt = `${context}\nUser: ${message}\nAssistant:`;

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: fullPrompt,
    });

    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Fallback to gemini-1.5-flash if 2.5 is not available (though test-ai.mjs says it works)
    try {
        const { text } = await generateText({
            model: google('gemini-1.5-flash'),
            prompt: message,
        });
        return NextResponse.json({ content: text });
    } catch (innerError) {
        return NextResponse.json(
            { error: "Failed to fetch response from AI: " + error.message },
            { status: 500 }
          );
    }
  }
}
