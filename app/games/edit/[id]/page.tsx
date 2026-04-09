export const runtime = "nodejs"

import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import EditGameForm from "@/components/EditGameForm"
import { redirect } from "next/navigation"

const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
})

export default async function EditGamePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const [game, consoles] = await Promise.all([
        prisma.game.findUnique({ where: { id: Number(id) } }),
        prisma.console.findMany(),
    ])

    if (!game) redirect("/games")

    return <EditGameForm game={game} consoles={consoles} />
}