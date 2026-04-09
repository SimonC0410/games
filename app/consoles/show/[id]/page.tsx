export const runtime = "nodejs"

import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import Image from "next/image"
import Link from "next/link"

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!
    }),
})

export default async function ShowConsole({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    const console = await prisma.console.findUnique(
        {
            where: { id: Number(id) }
        }
    )

    if (!console) {
        return <div>Console not found</div>
    }

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: "url(/img/ae.jpg)" }}>

            <div className="hero-content flex-col lg:flex-row gap-10 bg-black p-10 rounded-lg border-2 border-purple-400">

                <div className="relative w-96 h-[400px]">

                    <Image
                        src={`/img/${console.image}`}
                        alt={console.name}
                        fill
                        className="object-cover rounded-lg border border-purple-400"
                    />

                </div>

                <div className="max-w-xl space-y-4 text-white/70">

                    <h1 className="text-4xl text-purple-400">
                        {console.name}
                    </h1>

                    <p className="text-lg text-white">
                        Developed by {console.manuFacturer}
                    </p>


                    <p>
                        <span className="font-bold">Release Date:</span>{" "}
                        {new Date(console.releaseDate).toLocaleDateString()}
                    </p>


                    <div>

                        <p className="font-bold mb-2">
                            Description
                        </p>

                        <p className="text-gray-300">
                            {console.description}
                        </p>

                    </div>

                    <Link href={"/consoles"} className="bg-black/10 h-7 border-2 border-purple-400 text-white pl-5 pr-5 pb-2 pt-1 rounded-sm cursor-pinter hover:scale-105 transition hover:bg-purple-400 hover:text-black">
                        <button >
                            Atrás
                        </button>
                    </Link>

                </div>

            </div>

        </div>
    )
}