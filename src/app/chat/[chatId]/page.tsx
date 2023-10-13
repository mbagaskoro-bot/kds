import CharSideBar from "@/components/CharSideBar"
import ChatAI from "@/components/ChatAI"
import ChatComponent from "@/components/ChatComponent"
import PDFViewer from "@/components/PDFViewer"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import React from "react"

type Props = {
    params: {
        chatId: string
    }
}

const ChatPage = async ({ params: { chatId } }: Props) => {
    const { userId } = await auth()
    if (!userId) {
        return redirect("/sign-in")
    }
    const _chats = await db.select().from(chats).where(eq(chats.userId, userId))
    if (!_chats) {
        return redirect("/")
    }
    if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
        return redirect("/")
    }

    const currentChat = _chats.find((chat) => chat.id === parseInt(chatId))

    return (
        <div className="flex max-h-screen overflow-scroll">
            <div className="flex w-full max-h-screen overflow-scroll ">
                {/* chat sidebar */}
                <div className="flex-[1] max-w-xs">
                    <CharSideBar chats={_chats} chatId={parseInt(chatId)} />
                </div>
                {/* pdf viewer */}
                <div className="h-screen p-2 overflow-scroll flex-[6]">
                    <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
                </div>
                {/* chat component */}
                <div className="flex-[3] justify-center">
                    <div className=" border-1-4 border-orange-300 border-2 mt-2 mr-2 rounded-xl h-[48vh] overflow-hidden ">
                        <ChatComponent chatId={parseInt(chatId)} />
                    </div>
                    <div className=" border-1-4 border-teal-300 border-2 mt-2 mr-2 rounded-xl h-[49vh] overflow-hidden ">
                        <ChatAI />
                    </div>
                </div>

                {/* chatbox */}
                {/* <div></div> */}
            </div>
        </div>
    )
}

export default ChatPage
