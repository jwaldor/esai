import { History } from "@/components/history"
import { Sidebar } from "@/components/Sidebar"

export default function HistoryPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 md:grid md:grid-cols-[256px_1fr]">
            <Sidebar />
            <main className="md:col-start-2 p-8">
                <h1 className="text-2xl font-bold mb-6">History</h1>
                <History />
            </main>
        </div>
    )
} 