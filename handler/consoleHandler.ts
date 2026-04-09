"use server"

import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { redirect } from "next/navigation"
import { consoleSchema, consoleEditSchema } from "@/lib/validations"
import path from "path"
import fs from "fs/promises"

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
})

export async function addConsole(_prevState: unknown, formData: FormData) {

    const result = consoleSchema.safeParse({
        name:         formData.get("name"),
        manuFacturer: formData.get("manufacturer"),
        releaseDate:  formData.get("releasedate"),
        description:  formData.get("description"),
    })

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors }
    }

    // Manejar imagen
    const file = formData.get("image") as File
    let filename = "no-image.png"

    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        filename = Date.now() + "-" + file.name
        const filepath = path.join(process.cwd(), "public/img", filename)
        await fs.writeFile(filepath, buffer)
    }

    await prisma.console.create({
        data: {
            ...result.data,
            releaseDate: new Date(result.data.releaseDate),
            image: filename,
        },
    })

    redirect("/consoles?created=1")
}

export async function updateConsole(_prevState: unknown, formData: FormData) {

    const result = consoleEditSchema.safeParse({
        id:           formData.get("id"),
        name:         formData.get("name"),
        manuFacturer: formData.get("manufacturer"),
        releaseDate:  formData.get("releasedate"),
        description:  formData.get("description"),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const { id, ...data } = result.data

    const consoleFound = await prisma.console.findUnique({ where: { id } })
    if (!consoleFound) return { errors: { id: ["Consola no encontrada"] } }

    // Manejar imagen
    const file = formData.get("image") as File
    let filename = consoleFound.image

    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        filename = Date.now() + "-" + file.name
        const filepath = path.join(process.cwd(), "public/img", filename)
        await fs.writeFile(filepath, buffer)
    }

    await prisma.console.update({
        where: { id },
        data: {
            ...data,
            releaseDate: new Date(data.releaseDate),
            image: filename,
        },
    })

    redirect("/consoles")
}