import Anthropic from "@anthropic-ai/sdk";
import { Suggestion } from "@/types/suggestions";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const SYSTEM_PROMPT = `You are an AI writing assistant helping students strategize their college application essays. 
Analyze the provided responses to essay questions and provide 3 meaningful stories they could tell in an admissions process.
Format your response as a JSON, where each suggestion has:
- suggestionSummary: a short summary/title of the suggestion (5-10 words)
- suggestionText: specific, actionable advice.
- intendedAudience: the intended audience for the story. what kind of school or department would be interested in this story? provide specific examples of departments or programs that would be interested in this story. Make sure to include a range of prestige levels.
- tags: relevant categories for the suggestion

Here's an example of the kind of tone to use in your suggestions:
Your volunteer experience teaching music to elementary students and the profound impact of witnessing their creative growth can weave beautifully with your passion for innovation. This intersection of nurturing artistic expression while developing teaching methods can serve as a compelling narrative thread in your personal statement, showcasing how these experiences shaped your approach to technological solutions. This will definitely stand out — you've discovered that unique perspective!


Output only valid JSON between triple backticks (\`\`\`).`;

export async function generateSuggestions(
  questions: Array<{
    title: string;
    description: string;
    input: string;
    rating: number;
  }>
): Promise<Suggestion[]> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Please analyze these essay responses and provide suggestions:
          ${questions
            .map(
              (q) => `
            Question: ${q.title}
            Description: ${q.description}
            Response: ${q.input}
            Rating of importance to user: ${q.rating}
          `
            )
            .join("\n")}
        `,
        },
      ],
    });

    if (response.content[0].type !== "text") {
      throw new Error("No text response from Anthropic");
    }

    // Extract JSON from between triple backticks
    const jsonMatch = response.content[0].text
      .replace(/```json/, "```")
      .match(/```([\s\S]*?)```/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const suggestions = JSON.parse(jsonMatch[1]);
    return suggestions;
  } catch (error) {
    console.error("Error generating suggestions:", error);
    throw error;
  }
}
