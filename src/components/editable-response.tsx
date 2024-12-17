'use client'

import { useState } from 'react'
import { PenSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useStore from '@/app/state'

export default function EditableResponse({ id }: { id: number }) {
  const { setInput, questions } = useStore();
  const [isEditing, setIsEditing] = useState(false)

  const question = questions.flat().find(q => q.list.find(item => item.id === id))?.list.find(item => item.id === id);
  const input = question?.input || "";

  return (
    <div className="flex flex-col items-left text-left justify-between p-4 rounded-3xl border border-[#6366f1]/20 bg-white/50 backdrop-blur-sm max-w-md gap-4 ml-auto">
      {isEditing ? (
        <Input
          value={input}
          onChange={(e) => setInput(id, e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsEditing(false)
            }
          }}
          className="h-8 bg-transparent border-none focus-visible:ring-1 focus-visible:ring-offset-0"
          autoFocus
        />
      ) : (
        <span className="text-md">{input}</span>
      )}
      <div className="flex items-center gap-4">


        <Button
          variant="ghost"
          size="icon"
          className="text-[#6366f1] hover:text-[#6366f1] hover:bg-[#6366f1]/10"
          onClick={() => setIsEditing(true)}
        >
          <PenSquare className="w-5 h-5" />
          <span className="sr-only">Edit review</span>
        </Button>
      </div>
    </div>
  )
}

