'use client'

import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Suggestion } from '@/types/suggestions'
import useStore from '@/app/state'

export default function StoryStrategyCard({
  suggestionSummary,
  suggestionText,
  intendedAudience,
  id,
  isBookmarked,
}: Suggestion) {
  const { setBookmarked } = useStore();
  return (
    <div className="p-6 rounded-3xl border border-gray-200 max-w-3xl space-y-4 bg-white text-left">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-mono text-[#1a1a4b]">{suggestionSummary}</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
          >
            {/* <MessageSquare className="w-5 h-5" /> */}
            <span className="sr-only">Message about {suggestionSummary}</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              console.log('bookmarking')
              setBookmarked(id, !isBookmarked)
            }}>
            <Bookmark
              className="w-5 h-5"
              fill={isBookmarked ? "currentColor" : "none"}
            />
          </Button>
        </div>
      </div>

      <div className="space-y-4 text-[#1a1a4b]">
        <p>
          {suggestionText}
        </p>
        <p>
          <span className="font-bold">Where it fits: </span>
          {intendedAudience}
        </p>
      </div>

      <a
        href="#"
        className="inline-block text-blue-500 hover:text-blue-600 hover:underline"
      >
        Try the Match Maker tool →
      </a>
    </div>
  );
}
