'use client'

import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import useStore from '@/app/state'

interface StoryQuestion {
    title: string
    description: string
    exampleAnswer: string
    id: number
    input: string
}

interface StoryFormProps {
    questions: StoryQuestion[]
}

export default function StoryForm({ questions }: StoryFormProps) {
    const { setInput } = useStore();

    const handleInputChange = (id: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(id, e.target.value);
    };

    return (

        <Card className="p-8 bg-white rounded-3xl text-left">
            <div className="space-y-8">
                {questions.map((question) => (
                    <div key={question.id} className="space-y-4">
                        <h2 className="text-[#1a1a4f] text-xl font-bold tracking-tight">
                            {question.title}
                        </h2>
                        <p className="text-[#6b64ff] text-base">
                            {question.description}
                        </p>

                        <Textarea
                            placeholder={`example: ${question.exampleAnswer}`}
                            onChange={handleInputChange(question.id)}
                            value={question.input}
                            className="rounded-2xl p-4 text-[#8b86ff] text-sm placeholder:text-[#8b86ff] resize-none "
                        />

                        <div className="space-y-2">

                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
