import { NextResponse } from "next/server";
import { Anthropic } from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { card, chatHistory } = await request.json();
    console.log("chatHistory", chatHistory);

    const messages = chatHistory.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })
    );

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages,
      system: `The user has requested changes to the card below. Perform the requested changes and return the updated card as a JSON object with the following fields: suggestionSummary, suggestionText, intendedAudience.
        Encose the JSON object in triple backticks (\`\`\`).
        Card: ${JSON.stringify(card)}`,
    });

    console.log("response", response);
    if (response.content[0].type === "text") {
      // Extract JSON from between triple backticks
      const jsonMatch = response.content[0].text
        .replace(/```json/, "```")
        .match(/```([\s\S]*?)```/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const suggestions = JSON.parse(jsonMatch[1]);
      return NextResponse.json({
        message: suggestions,
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Failed to get chat response",
        success: false,
      });
    }
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request", success: false },
      { status: 500 }
    );
  }
}
