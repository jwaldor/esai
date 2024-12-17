"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StoryStrategistHistoryItem } from "./story-strategist-history-item"
import useStore from "@/app/state"
import { HistoryEntry } from "@/app/state"
import { Sidebar } from '@/components/Sidebar'


// Sample data - replace with your actual data source


const transformHistory = (history: HistoryEntry[]) => {
  console.log(JSON.stringify(history.map(item => item.createdAt.toLocaleString()), null, 2))
  console.log(JSON.stringify(history.map(item => item.createdAt), null, 2))

  return history.map((item) => ({
    id: item.id,
    timestamp: new Date(item.createdAt).toLocaleString(),
    content: item.suggestions.flat().map(suggestion => ({
      summary: suggestion.suggestionSummary,
      body: suggestion.suggestionText
    })).slice(0, 2)
  }))
}

export function History() {
  // const [dateRange, setDateRange] = useState("")
  const { history } = useStore();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Card className="w-full max-w-3xl mx-auto mt-4">
          <CardHeader className="flex flex-row items-center justify-center">
            <CardTitle className="font-mono tracking-wide">History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Dates</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="mm/dd/yyyy - mm/dd/yyyy"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="pl-4 pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="sr-only">Pick date range</span>
                </Button>
              </div>
            </div> */}
            <div className="space-y-4">
              {transformHistory(history).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((item) => (
                <StoryStrategistHistoryItem
                  key={item.id}
                  id={item.id}
                  timestamp={item.timestamp}
                  content={item.content}
                  onDelete={() => console.log("Delete item:", item.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

