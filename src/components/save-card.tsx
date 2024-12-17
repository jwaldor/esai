'use client'

import { Bookmark, MessageSquare, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

import { Suggestion } from '@/types/suggestions'
import useStore from '@/app/state'

export default function StoryStrategyCard({
  suggestionSummary,
  suggestionText,
  intendedAudience,
  id,
  isBookmarked,
  createdAt,
}: Suggestion) {
  const { setBookmarked, updateHistoryItem } = useStore();
  const [showChatInput, setShowChatInput] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(suggestionSummary, suggestionText, intendedAudience, id, isBookmarked, createdAt);
  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    setIsLoading(true);
    const newHistory = [...chatHistory, { role: 'user', content: chatMessage }];
    setChatHistory(newHistory);
    setChatMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ card: { suggestionSummary, suggestionText, intendedAudience }, chatHistory: newHistory }),
      });
      const data = await response.json();
      console.log("response", data.message);
      updateHistoryItem(id, { ...data.message, id, isBookmarked, createdAt });

      setChatHistory([...newHistory, { role: 'assistant', content: JSON.stringify(data.message) }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl border border-gray-200 max-w-3xl space-y-4 bg-white text-left">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-mono text-[#1a1a4b]">{suggestionSummary}</h2>
          {createdAt && (
            <p className="text-sm text-gray-500 mt-1">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
            onClick={() => setShowChatInput(!showChatInput)}
          >
            <MessageSquare className="w-5 h-5" />
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

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showChatInput ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex gap-2">
          <Input
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full border-indigo-200 focus:border-indigo-500"
          />
          <Button
            size="icon"
            className="text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span className="sr-only">Send message</span>
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
