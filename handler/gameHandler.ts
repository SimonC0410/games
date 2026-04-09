"use server"

import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { redirect } from "next/navigation"
import { gameSchema, gameEditSchema } from "@/lib/validations"  // 👈 agregar gameEditSchema
import path from "path"
import fs from "fs/promises"

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
})

export async function addGame(_prevState: unknown, formData: FormData) {

    // Validar con Zod
    const result = gameSchema.safeParse({
        title: formData.get("title"),
        developer: formData.get("developer"),
        releasedate: formData.get("releasedate"),
        price: formData.get("price"),
        genre: formData.get("genre"),
        description: formData.get("description"),
        console_id: formData.get("console_id"),
    })

    // Si hay errores, retornarlos
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    // Manejar imagen
    const file = formData.get("cover") as File
    let filename = "no-cover.png"

    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        filename = Date.now() + "-" + file.name
        const filepath = path.join(process.cwd(), "public/img", filename)
        await fs.writeFile(filepath, buffer)
    }

    // Guardar en BD
    await prisma.game.create({
        data: {
            ...result.data,
            releasedate: new Date(result.data.releasedate),
            cover: filename,
        },
    })

    redirect("/games?created=1")
}

export async function updateGame(_prevState: unknown, formData: FormData) {

    const result = gameEditSchema.safeParse({
        id: formData.get("id"),
        title: formData.get("title"),
        developer: formData.get("developer"),
        releasedate: formData.get("releasedate"),
        price: formData.get("price"),
        genre: formData.get("genre"),
        description: formData.get("description"),
        console_id: formData.get("console_id"),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const { id, ...data } = result.data

    const game = await prisma.game.findUnique({ where: { id } })
    if (!game) return { errors: { id: ["Juego no encontrado"] } }

    // Manejar imagen
    const file = formData.get("cover") as File
    let filename = game.cover

    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        filename = Date.now() + "-" + file.name
        const filepath = path.join(process.cwd(), "public/img", filename)
        await fs.writeFile(filepath, buffer)
    }

    await prisma.game.update({
        where: { id },
        data: {
            ...data,
            releasedate: new Date(data.releasedate),
            cover: filename,
        },
    })

    redirect("/games")
}