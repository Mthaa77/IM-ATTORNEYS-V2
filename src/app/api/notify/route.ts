import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

type NotifyRequest = {
  type: "contact" | "newsletter";
  data: Record<string, unknown>;
};

function getContactPrompt(data: Record<string, unknown>): string {
  return `You are a professional law firm notification assistant for IM Attorneys, a South African law firm.

A new client enquiry has been submitted via the website contact form. Generate a professional notification summary using the following information:

- Client Name: ${data.fullName ?? "N/A"}
- Phone: ${data.phone ?? "N/A"}
- Email: ${data.email ?? "N/A"}
- Area of Law: ${data.areaOfLaw ?? "N/A"}
- Description: ${data.description ?? "N/A"}
- Submitted At: ${data.createdAt ?? new Date().toISOString()}

Format the notification as follows:

📋 NEW CLIENT ENQUIRY — IM Attorneys
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Client Information:
- Name: [client name]
- Phone: [phone number]
- Email: [email address]

⚖️ Legal Matter:
- Area of Law: [area of law]
- Description: [brief description]

🚨 Urgency Assessment:
[Assess urgency. Flag as URGENT if this relates to bail applications, criminal matters, restraining orders, or emergency legal situations. Otherwise mark as Standard or Moderate.]

⏰ Recommended Response Time:
[Suggest a response time based on urgency — e.g., "Within 1 hour" for urgent matters, "Within 4 hours" for moderate, "Within 24 hours" for standard.]

📝 Notes:
[Any relevant observations or suggestions for the team.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Keep the notification concise but comprehensive. Use professional legal terminology where appropriate.`;
}

function getNewsletterPrompt(data: Record<string, unknown>): string {
  return `You are a professional law firm notification assistant for IM Attorneys, a South African law firm.

A new newsletter subscription has been received. Generate a brief notification:

📬 NEW NEWSLETTER SUBSCRIPTION — IM Attorneys
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Subscriber Email: ${data.email ?? "N/A"}
- Subscribed At: ${data.createdAt ?? new Date().toISOString()}
- Subscriber ID: ${data.id ?? "N/A"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Keep it brief and professional.`;
}

export async function POST(request: Request) {
  try {
    const body: NotifyRequest = await request.json();
    const { type, data } = body;

    if (!type || (type !== "contact" && type !== "newsletter")) {
      return NextResponse.json(
        { error: "Invalid notification type. Must be 'contact' or 'newsletter'." },
        { status: 400 }
      );
    }

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Notification data is required." },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const systemPrompt =
      "You are a law firm assistant for IM Attorneys. Format client notifications professionally and concisely.";

    const userPrompt =
      type === "contact" ? getContactPrompt(data) : getNewsletterPrompt(data);

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const summary = completion.choices[0]?.message?.content ?? "Unable to generate summary.";

    console.log("=== AI Notification Summary ===");
    console.log(`Type: ${type}`);
    console.log(summary);
    console.log("=== End AI Summary ===");

    return NextResponse.json({
      success: true,
      type,
      summary,
    });
  } catch (error) {
    console.error("Notification generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate notification summary." },
      { status: 500 }
    );
  }
}
