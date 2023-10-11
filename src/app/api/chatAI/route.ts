import { Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"

export const runtime = "edge"

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        // Example of adding a system message
        const formattedMessages = [
            {
                role: "system",
                content: "You are Knowledge Explorer, create by WoT team Binus",
            },
            ...messages, // Add user and assistant messages here
        ]

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: formattedMessages,
            stream: true,
        })

        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)
    } catch (error) {
        // Handle errors here
    }
}
