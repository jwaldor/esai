'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import useStore from '@/app/state';
export default function EnterButton() {
  const { incrementDisplayed, numberDisplayed } = useStore();
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        // Handle enter key press
        incrementDisplayed()
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-blue-400 text-xs">Press Enter</span>
      <Button
        className="bg-[#f3ff87] hover:bg-[#e9ff66] text-[#1a1a1a] px-12 py-6 rounded-full border border-[#1a1a1a]/10 transition-colors"
        onClick={() => incrementDisplayed()}
      >
        {numberDisplayed === 0 ? <span className="text-md font-semibold">Let&apos;s Go</span> : <span className="text-md font-semibold">Send</span>}
      </Button>
    </div>
  )
}

