import { cn } from "@/lib/utils"
import { Message } from "ai/react"
import { Loader2 } from "lucide-react"
import React from "react"

type Props = {
    isLoading: boolean
    messages: Message[]
}

const MessageList = ({ messages, isLoading }: Props) => {
    if (isLoading) {
        return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
                <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        )
    }
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
                                    "bg-orange-200 p-1 text-black":
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

export default MessageList
