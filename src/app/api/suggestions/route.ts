import { NextResponse } from "next/server";
import { generateSuggestions } from "@/app/services/suggestionService";
import { SuggestionsRequestBody } from "@/types/questions";
import { v4 as uuidv4 } from "uuid";
import { Suggestion } from "@/types/suggestions";
export async function POST(
  request: Request
): Promise<NextResponse<Suggestion[] | { error: string }>> {
  try {
    const body: SuggestionsRequestBody = await request.json();

    // Format questions for the LLM
    const questions = body.questions.flatMap((questionSet) =>
      questionSet.list
        .filter((q) => q.input.trim() !== "")
        .map((q) => ({
          title: q.title,
          description: q.description,
          input: q.input,
          rating: q.rating,
        }))
    );

    if (questions.length === 0) {
      return NextResponse.json(
        { error: "No valid questions provided" },
        { status: 400 }
      );
    }

    const suggestions = await generateSuggestions(questions);
    console.log(suggestions);
    return NextResponse.json(
      suggestions.map((suggestion) => ({ ...suggestion, id: uuidv4() })),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing suggestions:", error);
    return NextResponse.json(
      { error: "Failed to process suggestions" },
      { status: 500 }
    );
  }
}
