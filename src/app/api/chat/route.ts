import { Configuration, OpenAIApi } from "openai-edge"
import { Message, OpenAIStream, StreamingTextResponse } from "ai"
import { db } from "@/lib/db"
import { chats, messages as _messages } from "@/lib/db/schema"
import { getContext } from "@/lib/context"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export const runtime = "edge"

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export async function POST(req: Request) {
    try {
        const { messages, chatId } = await req.json()
        const _chats = await db.select().from(chats).where(eq(chats.id, chatId))

        if (_chats.length != 1) {
            return NextResponse.json(
                { error: "chat no found" },
                { status: 404 }
            )
        }
        const fileKey = _chats[0].fileKey

        const lastMessage = messages[messages.length - 1]
        const context = await getContext(lastMessage.content, fileKey)

        const prompt = {
            role: "system",
            content: `You are Chat AI. User can asking with any language. When user asking to you, first you need to analysis the context pdf if the user ask dont have answer in the context pdf ,u have to tell the user "I dont have answer within literature".
            Dont answer user questions if without the context pdf, if user still want to u have to recomended  chatAI name Knowledge Explorer, create by WoT team Binus below u.
            Remember u can not answer if user asking outsite of context is pdf. Also dont re-answer something if not really relate between questions from user and answer from u.
            AI assistant is a brand new, powerful, human-like artificial intelligence.
            The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
            AI is a well-behaved and well-mannered individual.
            AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
            START CONTEXT BLOCK
            ${context}
            END OF CONTEXT BLOCK
            You will not invent anything that is not drawn directly from the context.
            `,
        }

        const response = await openai.createChatCompletion({
            model: "gpt-4",
            //this for chatbox -> messages,
            messages: [
                prompt,
                ...messages.filter(
                    (message: Message) => message.role === "user"
                ),
            ],
            stream: true,
        })

        const stream = OpenAIStream(response, {
            onStart: async () => {
                //save user message into db
                await db.insert(_messages).values({
                    chatId,
                    content: lastMessage.content,
                    role: "user",
                })
            },
            onCompletion: async (completion) => {
                //save ai message into db
                await db.insert(_messages).values({
                    chatId,
                    content: completion,
                    role: "system",
                })
            },
        })
        return new StreamingTextResponse(stream)
    } catch (error) {
        console.log("eror di sini ha", error)
    }
}
