import { Card } from "@/components/ui/card"
import Link from "next/link"

interface Tool {
    title: string
    description: string
    tags: string[]
    isFree?: boolean
    href: string
}

interface ToolsDisplayProps {
    tools: Tool[]
}

export function ToolsDisplay({ tools }: ToolsDisplayProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <Link href={tool.href} key={tool.title}>
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <div className="mb-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg mb-4" />
                                <h3 className="text-xl font-bold font-mono mb-2">{tool.title}</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {tool.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`text-sm px-2 py-1 rounded-full ${tag.includes("getting") ? "bg-blue-100 text-blue-700" :
                                                tag.includes("essay") ? "bg-purple-100 text-purple-700" :
                                                    tag.includes("your") ? "bg-green-100 text-green-700" :
                                                        tag.includes("perfect") ? "bg-blue-100 text-blue-700" :
                                                            "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-600">{tool.description}</p>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}