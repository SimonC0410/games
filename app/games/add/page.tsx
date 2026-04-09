
export const runtime = "nodejs"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import AddGameForm from "@/components/AddGameForm"

const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
})

export default async function AddGamePage() {
    const consoles = await prisma.console.findMany()
    return <AddGameForm consoles={consoles} />
}