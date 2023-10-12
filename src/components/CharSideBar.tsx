"use client"
import { DrizzleChat } from "@/lib/db/schema"
import Link from "next/link"
import React from "react"
import { Button } from "./ui/button"
import { BookMarked, BookOpen, PlusCircle } from "lucide-react"
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
            className="lg:w-[260px] h-[98vh] sm:w-[100px] p-2 text-gray-200 bg-slate-800 rounded-xl mt-2 mb-1.5 ml-1.5 relative overflow-scroll"
            id="chat-container"
        >
            <Link href="/">
                <Button className="w-full py-2 border-dashed border-white border bg-slate-700 text-[12px] sticky top-0">
                    <PlusCircle className="mr-2 w-4 h-4" /> New Literature
                </Button>
            </Link>

            <div className="flex flex-col gap-1 mt-4">
                {chats.map((chat) => (
                    <Link key={chat.id} href={`/chat/${chat.id}`}>
                        <div
                            className={cn(
                                "p-1 gap-1 my-1 text-slate-300 flex items-center text-[12px]",
                                {
                                    "bg-gradient-to-r rounded-r-full from-teal-200 via-lime-200 to-orange-200 text-black shadow-inner  shadow-white ":
                                        chat.id === chatId,
                                    "hover:text-white ": chat.id !== chatId,
                                }
                            )}
                        >
                            <BookOpen className="mr-2" />
                            <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                                {chat.pdfName}
                            </p>
                        </div>
                    </Link>
                ))}
                <div className="sticky bottom-2 left-4 mt-2 sm:mt-2">
                    <div className="flex items-center text-sm text-slate-500 flex-wrap ">
                        <Link
                            href="/"
                            className="text-[12px] py-1 px-4 rounded-lg bg-gradient-to-r from-teal-200 to-lime-200  text-black font-semibold shadow-inner shadow-white"
                        >
                            Home
                        </Link>
                        <p className="flex text-white font-extralight text-[12px]">
                            | Create with ❤️ by WoT Team
                        </p>
                        {/* Stripe Button */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharSideBar
