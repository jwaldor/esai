"use client"

import { Card } from "@/components/ui/card"
import EditableResponse from "./editable-response";
import StoryStrategyCard from "./save-card";
import { Question } from "@/types/questions";
import { Suggestion } from "@/types/suggestions";
interface StoryDialogHistoryProps {
    questions: Array<{
        cardNumber: number;
        list: Question[];
    }>;
    suggestions: Suggestion[];
}

export default function StoryDialogHistory({ questions, suggestions }: StoryDialogHistoryProps) {
    // numberDisplayed is always equal to questions.length
    const numberDisplayed = questions.length;

    // Get all questions since this is a history view
    const previousQuestions = questions.slice(0, numberDisplayed);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-white p-8 md:p-12 flex flex-col items-center rounded-3xl font-mono h-full">
            <div className="space-y-8 text-center justify-center w-[75%]">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-indigo-600">
                    Story Strategist
                </h1>

                <div className="flex gap-3 justify-center">
                    <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-sm">
                        #gettingstarted
                    </span>
                    <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-sm">
                        #yourstory
                    </span>
                </div>

                <Card className="bg-white rounded-3xl p-8 shadow-sm text-left">
                    <h2 className="text-xl font-bold text-[#1D1B48] mb-4">
                        Let&apos;s get to know you!
                    </h2>
                    <p className="text-[#4F46E5] text-lg">
                        Share the pieces of your story that are most important to you. While not every section is required, we recommend filling out at least three in order to get to know you better
                    </p>
                </Card>

                {/* Display EditableResponse components for all questions */}
                {previousQuestions.map((questionSet) =>
                    questionSet.list.map((question) => (
                        <EditableResponse key={question.id} id={question.id} />
                    ))
                )}

                {suggestions.map((suggestion) =>
                    <StoryStrategyCard key={suggestion.id} {...suggestion} />
                )}
            </div>
        </div>
    )
} 