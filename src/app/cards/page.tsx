'use client'

import AICard from '@/components/save-card'
import useStore from '@/app/state'

export default function CardsPage() {
    const { history } = useStore()

    // Flatten all suggestions from history entries and sort by date
    const allSuggestions = history
        .flatMap(entry => entry.suggestions.map(suggestion => ({
            ...suggestion,
            createdAt: entry.createdAt
        })))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return (
        <main className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">All Story Strategies</h1>
            <div className="space-y-6">
                {allSuggestions.map((suggestion) => (
                    <AICard
                        key={suggestion.id}
                        {...suggestion}
                    />
                ))}
            </div>
        </main>
    )
} 