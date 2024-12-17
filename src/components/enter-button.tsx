'use client'

import { useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import useStore from '@/app/state';
import { Suggestion } from '@/types/suggestions';

// Define the response type


export default function EnterButton() {
  const { incrementDisplayed, numberDisplayed, questions, setSuggestions, submitted, setSubmitted, addToHistory } = useStore();

  const handleSubmit = useCallback(async () => {
    try {
      setSubmitted(true);
      (async () => {
        const response = await fetch('/api/suggestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ questions }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit questions');
        }

        const suggestions: Suggestion[] = await response.json();
        setSuggestions(suggestions);
        addToHistory();
        console.log('Received suggestions:', suggestions);
      })()
    } catch (error) {
      console.error('Error submitting questions:', error);
      // Handle error appropriately
    }
  }, [questions, setSuggestions, setSubmitted, addToHistory]);
  const handlePress = useCallback(async () => {
    if (numberDisplayed === questions.length) {
      await handleSubmit();
    } else {
      incrementDisplayed();
    }
  }, [numberDisplayed, questions.length, incrementDisplayed, handleSubmit]);

  useEffect(() => {
    const handleKeyPress = async (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handlePress();
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [numberDisplayed, questions.length, incrementDisplayed, handleSubmit, handlePress])

  return (
    <div className="flex flex-col items-center gap-2">
      {!submitted && <span className="text-blue-400 text-xs">Press Enter</span>}
      {!submitted && <Button
        className="bg-[#f3ff87] hover:bg-[#e9ff66] text-[#1a1a1a] px-12 py-6 rounded-full border border-[#1a1a1a]/10 transition-colors"
        onClick={handlePress}
      >
        {
          (() => {
            switch (numberDisplayed) {
              case 0:
                return <span className="text-md font-semibold">Let&apos;s Go</span>
              case questions.length:
                return <span className="text-md font-semibold">Submit</span>
              default:
                return <span className="text-md font-semibold">Next</span>
            }
          })()
        }
      </Button>}
    </div>
  )
}

