import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

const SYSTEM_PROMPT = `You are the "IM Legal Assistant" for IM Attorneys Inc, a South African boutique law firm. Be professional, warm, and concise — this is a small chat widget so keep responses brief (2-4 sentences unless the user asks for detail).

About IM Attorneys Inc:
- 100% female black-owned law firm
- Located in Menlyn Maine, Pretoria, South Africa (Pegasus Building, 210 Amarand Avenue)
- Practice Areas: Family Law, Wills & Estates, Claims Against the State (RAF), Criminal Law, Commercial Law, General Litigation
- Available 24/7 for bail applications
- Office hours: Mon-Fri 08:00-17:00
- Phone: 081 248 8048
- Email: attorneys@iminc.co.za
- Website: iminc.co.za

Guidelines:
- Answer legal questions generally and helpfully, but always remind the user you are NOT a substitute for professional legal advice.
- If the question is complex, recommend they book a consultation.
- For bail applications, emphasise 24/7 availability and the emergency phone number.
- Keep a friendly, professional South African tone.
- Do not invent case law or specific legal citations unless you are certain.
- If you don't know something, say so honestly and suggest contacting the firm directly.
- Never give specific legal advice for a particular case — always recommend consulting an attorney.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body as {
      messages: Array<{ role: string; content: string }>;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Build the full message array with system prompt
    const fullMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ];

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: fullMessages,
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "No response generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response. Please try again." },
      { status: 500 }
    );
  }
}
