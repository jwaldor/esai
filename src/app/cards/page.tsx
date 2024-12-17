'use client'

import AICard from '@/components/save-card'
import useStore from '@/app/state'
import { Sidebar } from '@/components/Sidebar'

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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 md:grid md:grid-cols-[256px_1fr]">
            <Sidebar />
            <main className="md:col-start-2 p-8">
                <h1 className="text-2xl font-bold mb-6">My Cards</h1>
                <div className="space-y-6">
                    {allSuggestions.filter((suggestion) => suggestion.isBookmarked).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((suggestion) => (
                        <AICard
                            key={suggestion.id}
                            {...suggestion}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
} 