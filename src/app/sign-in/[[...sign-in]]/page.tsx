import { SignIn } from "@clerk/nextjs"

export default function Page() {
    return (
        <div className="w-screen min-h-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-neutral-300 via-cyan-100 to-orange-500">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh]">
                <div className="flex items-center text-center">
                    <h1 className="text-3xl font-bold mr-3 text-slate-900 mb-5">
                        Knowledge Discovery System (KDS)
                    </h1>
                </div>
                <div className=" items-center flex flex-wrap justify-center">
                    <div>
                        <SignIn />
                    </div>
                </div>
            </div>
        </div>
    )
}
