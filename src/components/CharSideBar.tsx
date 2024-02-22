"use client"
import { DrizzleChat } from "@/lib/db/schema"
import Link from "next/link"
import React from "react"
import { Button } from "./ui/button"
import { BookMarked, BookOpen, Dot, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
    chats: DrizzleChat[]
    chatId: number
}

const CharSideBar = ({ chats, chatId }: Props) => {
    React.useEffect(() => {
        const messageContainer = document.getElementById("chat-container")
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth",
            })
        }
    }, [chatId])
    return (
        <div
            className="lg:w-[200px] h-[98vh] sm:w-[100px] text-gray-200 bg-slate-800 rounded-xl mt-2 ml-1.5 relative overflow-scroll"
            id="chat-container"
        >
            <div className="flex justify-center items-center gap-2 sticky top-0 py-2 bg-slate-800">
                <Link
                    href="/"
                    className="text-[12px] rounded-lg text-slate-300 hover:text-white font-semibold"
                >
                    Home
                </Link>
                <Link href="/">
                    <Button className="w-full py-2 border-dashed border-white border bg-slate-700 text-[12px] sticky top-0 gap-3">
                        <PlusCircle /> Input File
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col gap-1 mt-4">
                {chats.map((chat) => (
                    <Link key={chat.id} href={`/chat/${chat.id}`}>
                        <div
                            className={cn(
                                "p-1 gap-1 my-1 text-slate-300 flex items-center text-[12px]",
                                {
                                    "bg-gray-500 rounded-lg mx-1":
                                        chat.id === chatId,
                                    "hover:text-white": chat.id !== chatId,
                                }
                            )}
                        >
                            <Dot />
                            <p className="w-full overflow-hidden text-xs truncate whitespace-nowrap text-ellipsis">
                                {chat.pdfName}
                            </p>
                        </div>
                    </Link>
                ))}
                <div className="sticky bottom-2 left-4 mt-2 sm:mt-2">
                    <div className="flex items-center text-sm text-slate-500 flex-wrap ">
                        {/* <p className="flex text-white font-extralight text-[12px]">
                            | Create with ❤️ by WoT Team
                        </p> */}
                        {/* Stripe Button */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharSideBar
