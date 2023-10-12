"use client"
import React from "react"
import { Input } from "./ui/input"
import { useChat } from "ai/react"
import { Button } from "./ui/button"
import { ChevronsDown, Send } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Message } from "ai"
import MassageListAI from "./MassageListAI"

type Props = {}

const ChatAI = (props: Props) => {
    const { input, handleInputChange, handleSubmit, messages } = useChat({
        api: "/api/chatAI",
    })

    React.useEffect(() => {
        const messageContainer = document.getElementById("message-container1")
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth",
            })
        }
    }, [messages])
    return (
        <div
            className="relative max-h-[50vh] overflow-scroll rounded-lg"
            id="message-container1"
        >
            {/* header */}
            <div className="sticky bottom-0 h-[31vh] inset-x-0">
                <div className="flex justify-center items-center mt-20">
                    <div className="block max-w-sm  p-6 relative">
                        <h5 className="mb-2 text-4xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-lime-400 font-bold text-center sm:text-3xl">
                            CHAT TO EXPLORE YOUR CURIOSITY
                        </h5>
                    </div>
                </div>

                <div className="flex justify-center items-center mt-4">
                    <div className="block max-w-sm relative animate-bounce p-2 rounded-full shadow-md shadow-teal-400">
                        <ChevronsDown />
                    </div>
                </div>
            </div>

            {/* message list */}
            <MassageListAI messages={messages} />

            <form
                onSubmit={handleSubmit}
                className="sticky bottom-0 inset-x-0 px-2 mt-1 py-2 bg-white"
            >
                <div className="flex">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Explore your curiosity ✨"
                        className="w-full mb-2"
                    ></Input>

                    <Button className="bg-gradient-to-r from-teal-200 to-lime-200 ml-2">
                        <Send color="#2c2b2b" className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ChatAI
