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
            content: `Your name is RAG Systems. You do Question Answering or chat to user. You have several abilities such as summarizing PDF paper context files, analyzing and understanding PDF paper context files in any language, being able to answer in multiple languages, and you can do conversation with user with any language. User can asking with any language and first you have to translate what the user asking and try to find the similarity what user ask within the context. 
            Use the provided context START CONTEXT BLOCK ${context} END OF CONTEXT BLOCK to answer questions. If the answer cannot be found in the context, write "I could not find an answer."
            Analysis and understanding the context pdf and you should know what title and all about inside context.
            Before you answer user question, you need to think and understand clearly what user mean and want.
            User can asking with any language. When user asking to you, first you need to analysis the context pdf if the user ask dont have answer in the context pdf ,u have to tell the user "I could not find the answer in the PDF.".
            You have ability to generate a concise summary of the provided context, highlighting the key points and main ideas. Your summary should capture the essence of the text while being clear and coherent.
            Remember you can't answer if user asking outsite of context is pdf. Also you can't make your assumption.
            You have to make sure that the user asks using the correct words, if the user asks using symbols or emoji that cannot be understood, write "I could not find an answer.
            AI assistant is a brand new, powerful, human-like artificial intelligence.
            The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
            AI is a well-behaved and well-mannered individual.
            AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
            You will not invent anything that is not drawn directly from the context.
            `,
        }

        const response = await openai.createChatCompletion({
            model: "gpt-4-1106-preview",
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
