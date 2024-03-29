import { cn } from "@/lib/utils"
import { Message } from "ai/react"
import { Loader2 } from "lucide-react"
import React from "react"

type Props = {
    messages: Message[]
}

const MassageListAI = ({ messages }: Props) => {
    if (!messages) return <></>

    return (
        <div className="flex flex-col gap-2 px-4">
            {messages.map((message) => {
                return (
                    <div
                        key={message.id}
                        className={cn("flex", {
                            "justify-end pl-10": message.role === "user",
                            "justify-start": message.role === "assistant",
                        })}
                    >
                        <div
                            className={cn(
                                "rounded-lg px-1 text-slate-200 text-sm py-1",
                                {
                                    "bg-lime-200 border text-black":
                                        message.role === "user",
                                }
                            )}
                        >
                            <p>{message.content}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MassageListAI
