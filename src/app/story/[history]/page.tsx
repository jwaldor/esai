"use client"

import StoryDialogHistory from "@/components/StoryDialogHistory";
import useStore from "@/app/state";
import { use } from "react";

interface StoryHistoryPageProps {
    params: Promise<{
        history: string;
    }>;
}

export default function StoryHistoryPage({ params }: StoryHistoryPageProps) {
    const { getHistoryItem } = useStore();
    const resolvedParams = use(params);
    const story = getHistoryItem(resolvedParams.history);

    if (!story) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl text-gray-600">Story not found</h1>
            </div>
        );
    }

    return (

        <StoryDialogHistory
            questions={story.questionSet}
            suggestions={story.suggestions}
        />
    );
} 