import StoryDialog from "@/components/StoryDialog"
import { Sidebar } from "@/components/Sidebar"

export default function StoryPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 grid grid-cols-[256px_1fr]">
            <Sidebar />
            <main className="col-start-2 p-8">
                <StoryDialog />
            </main>
        </div>
    )
} 