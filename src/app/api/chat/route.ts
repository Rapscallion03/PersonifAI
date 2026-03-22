import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let message = "";
  try {
    const body = await req.json();
    message = body.message;
    const history = body.history;

    // The test-ai.mjs uses GOOGLE_GENERATIVE_AI_API_KEY
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_GENERATIVE_AI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Prepare full prompt with history context
    const context = history
      .map((msg: any) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
    
    const systemPrompt = `You are PersonifAI, a personalized academic assistant for students.
Your goal is to help students break down complex tasks into manageable sub-steps.

FLOW:
1. If the user's task is vague, ask 1-2 clarifying questions (e.g., word count, rubric, level of detail).
2. Once the task is clear, provide a "Breakdown Preview". 

When providing a breakdown, you MUST include a JSON block at the end of your response following this structure:
{
  "type": "BREAKDOWN_PREVIEW",
  "title": "Main Task Title",
  "subject": "e.g., Biology, History, Computer Science",
  "priority": "high | medium | low",
  "subSteps": [
    { "type": "TEXT" | "VIDEO" | "REVISION", "title": "Substep Title", "content": "Instructional content or URL" }
  ]
}

Keep your conversational text brief and encouraging.`;

    const fullPrompt = `${systemPrompt}\n\n${context}\nUser: ${message}\nAssistant:`;

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
