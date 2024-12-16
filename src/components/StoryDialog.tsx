"use client"

import useStore from "@/app/state";
import StoryForm from "./dialog/story-form"
import { Card } from "@/components/ui/card"
import EnterButton from "./enter-button";
import EditableResponse from "./editable-response";
import { questions } from "@/app/state";

export default function StoryDialog() {
    const { numberDisplayed } = useStore();

    // Get all previous questions up to but not including the current one
    const previousQuestions = questions.slice(0, Math.max(0, numberDisplayed - 1));

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

                {/* Display EditableResponse components for previous questions */}
                {previousQuestions.map((questionSet) =>
                    questionSet.list.map((question) => (
                        <EditableResponse key={question.id} id={question.id} />
                    ))
                )}

                {/* Display current question form */}
                {numberDisplayed > 0 && <div className="text-center text-sm text-gray-500">Step {numberDisplayed} of {questions.length}</div>}
                {numberDisplayed >= 1 ?
                    <StoryForm
                        key={questions[numberDisplayed - 1].cardNumber}
                        questions={questions[numberDisplayed - 1].list}
                    />
                    : null}

                <EnterButton />
            </div>
        </div>
    )
}

