import { Button } from "@/components/ui/button"
import { UserButton, auth } from "@clerk/nextjs"
import Link from "next/link"
import { LogIn } from "lucide-react"
import FileUpload from "@/components/fileUpload"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export default async function Home() {
    const { userId } = await auth()
    const isAuth = !!userId
    let firstChat
    if (userId) {
        firstChat = await db
            .select()
            .from(chats)
            .where(eq(chats.userId, userId))
        if (firstChat) {
            firstChat = firstChat[0]
        }
    }
    return (
        <div className="w-screen min-h-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-neutral-300 via-cyan-100 to-orange-500">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center">
                        <h1 className="text-7xl font-bold mr-3 text-slate-900">
                            Knowledge Discovery System
                        </h1>
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid slice"
                            className="rounded-xl shadow-white shadow-[3px_5px_50px_-10px_rgba(0,0,0,0.3)]"
                        >
                            <defs>
                                <radialGradient
                                    id="Gradient1"
                                    cx="50%"
                                    cy="50%"
                                    fx="0.441602%"
                                    fy="50%"
                                    r=".5"
                                >
                                    <animate
                                        attributeName="fx"
                                        dur="54s"
                                        values="0%;3%;0%"
                                        repeatCount="indefinite"
                                    ></animate>
                                    <stop
                                        offset="0%"
                                        stop-color="rgba(255, 0, 255, 1)"
                                    ></stop>
                                    <stop
                                        offset="100%"
                                        stop-color="rgba(255, 0, 255, 0)"
                                    ></stop>
                                </radialGradient>
                                <radialGradient
                                    id="Gradient2"
                                    cx="50%"
                                    cy="50%"
                                    fx="2.68147%"
                                    fy="50%"
                                    r=".5"
                                >
                                    <animate
                                        attributeName="fx"
                                        dur="43.5s"
                                        values="0%;3%;0%"
                                        repeatCount="indefinite"
                                    ></animate>
                                    <stop
                                        offset="0%"
                                        stop-color="rgba(255, 255, 0, 1)"
                                    ></stop>
                                    <stop
                                        offset="100%"
                                        stop-color="rgba(255, 255, 0, 0)"
                                    ></stop>
                                </radialGradient>
                                <radialGradient
                                    id="Gradient3"
                                    cx="50%"
                                    cy="50%"
                                    fx="0.836536%"
                                    fy="50%"
                                    r=".5"
                                >
                                    <animate
                                        attributeName="fx"
                                        dur="41.5s"
                                        values="0%;3%;0%"
                                        repeatCount="indefinite"
                                    ></animate>
                                    <stop
                                        offset="0%"
                                        stop-color="rgba(0, 255, 255, 1)"
                                    ></stop>
                                    <stop
                                        offset="100%"
                                        stop-color="rgba(0, 255, 255, 0)"
                                    ></stop>
                                </radialGradient>
                                <radialGradient
                                    id="Gradient4"
                                    cx="50%"
                                    cy="50%"
                                    fx="4.56417%"
                                    fy="50%"
                                    r=".5"
                                >
                                    <animate
                                        attributeName="fx"
                                        dur="43s"
                                        values="0%;5%;0%"
                                        repeatCount="indefinite"
                                    ></animate>
                                    <stop
                                        offset="0%"
                                        stop-color="rgba(0, 255, 0, 1)"
                                    ></stop>
                                    <stop
                                        offset="100%"
                                        stop-color="rgba(0, 255, 0, 0)"
                                    ></stop>
                                </radialGradient>
                                <radialGradient
                                    id="Gradient5"
                                    cx="50%"
                                    cy="50%"
                                    fx="2.65405%"
                                    fy="50%"
                                    r=".5"
                                >
                                    <animate
                                        attributeName="fx"
                                        dur="44.5s"
                                        values="0%;5%;0%"
                                        repeatCount="indefinite"
                                    ></animate>
                                    <stop
                                        offset="0%"
                                        stop-color="rgba(0,0,255, 1)"
                                    ></stop>
                                    <stop
                                        offset="100%"
                                        stop-color="rgba(0,0,255, 0)"
                                    ></stop>
                                </radialGradient>
                                <radialGradient
                                    id="Gradient6"
                                    cx="50%"
                                    cy="50%"
                                    fx="0.981338%"
                                    fy="50%"
                                    r=".5"
                                >
                                    <animate
                                        attributeName="fx"
                                        dur="45.5s"
                                        values="0%;5%;0%"
                                        repeatCount="indefinite"
                                    ></animate>
                                    <stop
                                        offset="0%"
                                        stop-color="rgba(255,0,0, 1)"
                                    ></stop>
                                    <stop
                                        offset="100%"
                                        stop-color="rgba(255,0,0, 0)"
                                    ></stop>
                                </radialGradient>
                            </defs>
                            <rect
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                fill="url(#Gradient4)"
                            >
                                <animate
                                    attributeName="x"
                                    dur="40s"
                                    values="25%;0%;25%"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="y"
                                    dur="41s"
                                    values="0%;25%;0%"
                                    repeatCount="indefinite"
                                />
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 50 50"
                                    to="360 50 50"
                                    dur="37s"
                                    repeatCount="indefinite"
                                />
                            </rect>
                            <rect
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                fill="url(#Gradient5)"
                            >
                                <animate
                                    attributeName="x"
                                    dur="43s"
                                    values="0%;-25%;0%"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="y"
                                    dur="44s"
                                    values="25%;-25%;25%"
                                    repeatCount="indefinite"
                                />
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 50 50"
                                    to="360 50 50"
                                    dur="38s"
                                    repeatCount="indefinite"
                                />
                            </rect>
                            <rect
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                fill="url(#Gradient6)"
                            >
                                <animate
                                    attributeName="x"
                                    dur="45s"
                                    values="-25%;0%;-25%"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="y"
                                    dur="46s"
                                    values="0%;-25%;0%"
                                    repeatCount="indefinite"
                                />
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="360 50 50"
                                    to="0 50 50"
                                    dur="39s"
                                    repeatCount="indefinite"
                                />
                            </rect>
                            <rect
                                x="13.744%"
                                y="1.18473%"
                                width="100%"
                                height="100%"
                                fill="url(#Gradient1)"
                                transform="rotate(334.41 50 50)"
                            >
                                <animate
                                    attributeName="x"
                                    dur="40s"
                                    values="25%;0%;25%"
                                    repeatCount="indefinite"
                                ></animate>
                                <animate
                                    attributeName="y"
                                    dur="41s"
                                    values="0%;25%;0%"
                                    repeatCount="indefinite"
                                ></animate>
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 50 50"
                                    to="360 50 50"
                                    dur="27s"
                                    repeatCount="indefinite"
                                ></animateTransform>
                            </rect>
                            <rect
                                x="-2.17916%"
                                y="35.4267%"
                                width="100%"
                                height="100%"
                                fill="url(#Gradient2)"
                                transform="rotate(255.072 50 50)"
                            >
                                <animate
                                    attributeName="x"
                                    dur="43s"
                                    values="-25%;0%;-25%"
                                    repeatCount="indefinite"
                                ></animate>
                                <animate
                                    attributeName="y"
                                    dur="44s"
                                    values="0%;50%;0%"
                                    repeatCount="indefinite"
                                ></animate>
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 50 50"
                                    to="360 50 50"
                                    dur="32s"
                                    repeatCount="indefinite"
                                ></animateTransform>
                            </rect>
                            <rect
                                x="9.00483%"
                                y="14.5733%"
                                width="100%"
                                height="100%"
                                fill="url(#Gradient3)"
                                transform="rotate(139.903 50 50)"
                            >
                                <animate
                                    attributeName="x"
                                    dur="45s"
                                    values="0%;25%;0%"
                                    repeatCount="indefinite"
                                ></animate>
                                <animate
                                    attributeName="y"
                                    dur="12s"
                                    values="0%;25%;0%"
                                    repeatCount="indefinite"
                                ></animate>
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="360 50 50"
                                    to="0 50 50"
                                    dur="9s"
                                    repeatCount="indefinite"
                                ></animateTransform>
                            </rect>
                        </svg>
                    </div>
                    <p className="max-w-2xl mt-10 text-slate-800 text-xl">
                        Welcome to Space literacy Learning, where interactive
                        education leads you to a galaxy of literacy knowledge
                        waiting to be discovere
                    </p>
                    <div className="flex mt-6">
                        {isAuth && firstChat && (
                            <Link href={`/chat/${firstChat.id}`}>
                                <Button className="border border-white bg-orange-600 hover:bg-orange-400 hover:duration-500 hover:ease-in-out">
                                    Go to Your Space
                                </Button>
                            </Link>
                        )}
                        <div>
                            {isAuth ? (
                                <div className="flex border-2 rounded-xl ml-5 pr-2 items-center border-orange-600 ">
                                    <div className="p-0.5 items-center ">
                                        <UserButton afterSignOutUrl="/" />
                                    </div>
                                    <div className="flex flex-col space-y-0">
                                        <div className="text-[10px] text-slate-800">
                                            Your
                                        </div>
                                        <div className="text-[10px] -mt-1 text-slate-800">
                                            Account
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/sign-in"></Link>
                            )}
                        </div>
                    </div>
                    <div className="w-[80vh] mt-4">
                        {isAuth ? (
                            <FileUpload />
                        ) : (
                            <Link href="/sign-in">
                                <Button className="p-8 border border-white bg-orange-600 hover:bg-orange-400 hover:duration-500 rounded-2xl shadow-xl">
                                    Start | Your Learning Space
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
