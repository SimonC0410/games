export const runtime = "nodejs"

import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import EditConsoleForm from "@/components/EditConsoleForm"
import { redirect } from "next/navigation"

const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
})

export default async function EditConsolePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const consoleFound = await prisma.console.findUnique({
        where: { id: Number(id) }
    })

    if (!consoleFound) redirect("/consoles")

    return <EditConsoleForm console={consoleFound} />
}