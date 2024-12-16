import Link from "next/link"
import { ToolsDisplay } from "@/components/ToolsDisplay"
import StoryDialog from "@/components/StoryDialog"

export default function Page() {
  const tools = [
    {
      title: "Story Strategist",
      description: "Uncover unique themes and make unlikely connections across your story to package your most effective college application narrative.",
      tags: ["#gettingstarted", "#yourstory"],
      isFree: true,
    },
    {
      title: "School Match Maker",
      description: "Find the best schools and programs for you based on your strengths, goals, and budget.",
      tags: ["#gettingstarted", "#perfectmatch"],
      isFree: true,
    },
    {
      title: "Major Mentor",
      description: "Discover the best majors for you! Align your interests, strengths, and goals to find a future that fits.",
      tags: ["#perfectmatch", "#gettingstarted"],
      isFree: true,
    },
    {
      title: "Personal Statement",
      description: "Not sure what to write your main college essay about? We'll help you brainstorm topics that make your story work harder for you!",
      tags: ["#gettingstarted", "#essaymaster", "#yourstory"],
    },
    {
      title: "Supplemental Essay Assistant",
      description: "Working on an essay for a specific school? We'll help you make it more specific and effective!",
      tags: ["#gettingstarted", "#essaymaster", "#yourstory"],
    },
    {
      title: "Outline Assistant",
      description: "Map out your perfect story with a customized framework that helps you put pen to paper.",
      tags: ["#essaymaster", "#yourstory"],
    },
    {
      title: "Conclusion Coach",
      description: "Not sure how to land your essay? Leave your reader wanting more with this custom conclusion coach.",
      tags: ["#essaymaster", "#finishingtouch"],
    },
    {
      title: "Hook Generator",
      description: "Grab your reader from the first sentence to create an essay that gets remembered.",
      tags: ["#gettingstarted", "#essaymaster"],
    },
    {
      title: "Essay Draft Editor",
      description: "Looking for feedback on your essay draft? We'll help with grammar, spelling, flow of ideas, and more!",
      tags: ["#essaymaster", "#finishingtouch", "#yourstory"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold">
              ESAI
            </Link>
          </div>
          <div className="flex items-center gap-4">

          </div>
        </div>
      </header>

      <aside className="fixed left-0 top-0 h-screen w-64 p-4 border-r bg-white">
        <nav className="space-y-4">
          <Link href="/" className="text-2xl font-bold block mb-8">
            ESAI
          </Link>
          <div className="space-y-2">
            <Link href="#" className="text-purple-600 block">
              All ESAI Tools
            </Link>
            <Link href="#" className="text-gray-600 block">
              History
            </Link>
            <Link href="#" className="text-gray-600 block">
              Get AI Certified
            </Link>
            <Link href="#" className="text-gray-600 block">
              Hall of Acceptances
            </Link>
          </div>
          <div className="mt-8">
            <h3 className="text-sm font-medium text-purple-600 mb-4">
              Track Your Progress with ESAI Punch Cards
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
            <h4 className="text-sm text-gray-600 mb-2">Share Feedback</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600">
                FB
              </Link>
              <Link href="#" className="text-gray-600">
                IG
              </Link>
              <Link href="#" className="text-gray-600">
                IN
              </Link>
              <Link href="#" className="text-gray-600">
                TK
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      <main className="pl-64">
        {/* <ToolsDisplay tools={tools} /> */}
        <StoryDialog />
      </main>
    </div>
  )
}

