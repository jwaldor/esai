import { ToolsDisplay } from "@/components/ToolsDisplay"
import { Sidebar } from "@/components/Sidebar"

export default function Page() {
  const tools = [
    {
      title: "Story Strategist",
      description: "Uncover unique themes and make unlikely connections across your story to package your most effective college application narrative.",
      tags: ["#gettingstarted", "#yourstory"],
      isFree: true,
      href: "/story",
    },
    // {
    //   title: "School Match Maker",
    //   description: "Find the best schools and programs for you based on your strengths, goals, and budget.",
    //   tags: ["#gettingstarted", "#perfectmatch"],
    //   isFree: true,
    // },
    // {
    //   title: "Major Mentor",
    //   description: "Discover the best majors for you! Align your interests, strengths, and goals to find a future that fits.",
    //   tags: ["#perfectmatch", "#gettingstarted"],
    //   isFree: true,
    // },
    // {
    //   title: "Personal Statement",
    //   description: "Not sure what to write your main college essay about? We'll help you brainstorm topics that make your story work harder for you!",
    //   tags: ["#gettingstarted", "#essaymaster", "#yourstory"],
    // },
    // {
    //   title: "Supplemental Essay Assistant",
    //   description: "Working on an essay for a specific school? We'll help you make it more specific and effective!",
    //   tags: ["#gettingstarted", "#essaymaster", "#yourstory"],
    // },
    // {
    //   title: "Outline Assistant",
    //   description: "Map out your perfect story with a customized framework that helps you put pen to paper.",
    //   tags: ["#essaymaster", "#yourstory"],
    // },
    // {
    //   title: "Conclusion Coach",
    //   description: "Not sure how to land your essay? Leave your reader wanting more with this custom conclusion coach.",
    //   tags: ["#essaymaster", "#finishingtouch"],
    // },
    // {
    //   title: "Hook Generator",
    //   description: "Grab your reader from the first sentence to create an essay that gets remembered.",
    //   tags: ["#gettingstarted", "#essaymaster"],
    // },
    // {
    //   title: "Essay Draft Editor",
    //   description: "Looking for feedback on your essay draft? We'll help with grammar, spelling, flow of ideas, and more!",
    //   tags: ["#essaymaster", "#finishingtouch", "#yourstory"],
    // },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 md:grid md:grid-cols-[256px_1fr]">
      <Sidebar />
      <main className="md:col-start-2">
        <ToolsDisplay tools={tools} />
      </main>
    </div>
  )
}

