"use client"
import React from "react"
import { Input } from "./ui/input"
import { useChat } from "ai/react"
import { Button } from "./ui/button"
import { ChevronsDown, Send } from "lucide-react"
import MessageList from "./MessageList"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Message } from "ai"

type Props = { chatId: number }

const ChatComponent = ({ chatId }: Props) => {
    const { data, isLoading } = useQuery({
        queryKey: ["chat", chatId],
        queryFn: async () => {
            const response = await axios.post<Message[]>("/api/get-messages", {
                chatId,
            })
            return response.data
        },
    })

    const { input, handleInputChange, handleSubmit, messages } = useChat({
        api: "/api/chat",
        body: {
            chatId,
        },
        initialMessages: data || [],
    })

    React.useEffect(() => {
        const messageContainer = document.getElementById("message-container")
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth",
            })
        }
    }, [messages])
    return (
        <div
            className="relative max-h-[49vh] overflow-scroll rounded-xl"
            id="message-container"
        >
            {/* header */}
            <div className="sticky bottom-0 inset-x-0 ">
                <div className="flex justify-center items-center mt-10">
                    <div className="block max-w-xs  p-6 relative">
                        <h5 className="mb-2 xl:text-4xl md:text-2xl sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 font-bold text-center">
                            CHAT TO YOUR LITERATURE
                        </h5>
                    </div>
                </div>

                <div className="max-w-md w-full bg-white p-4 rounded-md shadow-md mb-4">
                    <h2 className="text-sm mb-4 font-semibold text-center underline">
                        RAG Systems Capabilities
                    </h2>

                    <ul className="list-disc pl-5 mb-4 text-[12px] font-light gap-2">
                        <li>
                            <span className="font-bold">
                                Summarizing PDF Paper Context:
                            </span>
                            Proficient in summarizing key information from PDF
                            files.
                        </li>
                        <li>
                            <span className="font-bold">
                                Multilingual Analysis and Understanding:
                            </span>
                            Able to analyze and comprehend content in PDF files
                            written in various languages.
                        </li>
                        <li>
                            <span className="font-bold">
                                Contextual Understanding:
                            </span>
                            Can analyze user queries within the context of the
                            conversation, identifying similarities with
                            information in PDF files to provide relevant
                            responses.
                        </li>
                        <li>
                            <span className="font-bold">
                                Multilingual Communication:
                            </span>
                            Capable of responding to user queries and engaging
                            in conversations in multiple languages.
                        </li>
                    </ul>
                </div>

                <div className="flex justify-center items-center">
                    <div className="block max-w-sm relative animate-bounce p-2 bg-white rounded-full shadow-md shadow-orange-500">
                        <ChevronsDown />
                    </div>
                </div>
            </div>

            {/* message list */}
            <MessageList messages={messages} isLoading={isLoading} />

            <form
                onSubmit={handleSubmit}
                className="sticky bottom-0 inset-x-0 px-2 mt-1 py-2 bg-slate-800
                "
            >
                <div className="flex">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Questions to literature 📖"
                        className="w-full bg-slate-300"
                    ></Input>

                    <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 ml-2">
                        <Send color="#2c2b2b" className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ChatComponent
