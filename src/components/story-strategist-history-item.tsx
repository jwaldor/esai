import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface StoryStrategistHistoryItemProps {
  id: string
  timestamp: string
  content: {
    summary: string
    body: string
  }[]
  onDelete?: () => void
}

export function StoryStrategistHistoryItem({
  id,
  timestamp,
  content,
  onDelete
}: StoryStrategistHistoryItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-50">
        {/* <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="#FF69B4"
            fillOpacity="0.2"
          />
          <path
            d="M8 12H16M12 8V16"
            stroke="#FF69B4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}
      </div>
      <Link href={`/story/${id}`} className="flex-1">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-lg font-semibold">Story Strategist</h3>
            <div className="flex items-center gap-2">
              <time className="text-sm text-muted-foreground">{timestamp}</time>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground/60 hover:text-muted-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete?.();
                }}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete history item</span>
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            {content.map((line, index) => (
              <span key={index}>
                <p
                  key={index}
                  className="line-clamp-1 text-sm text-primary font-bold"
                >
                  {line.summary}
                </p>
                <p className="line-clamp-1 text-sm text-primary">
                  {line.body}
                </p>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}

