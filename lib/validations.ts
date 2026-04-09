import { z } from "zod"

// Game
export const gameSchema = z.object({
    title: z.string().min(2, "El título debe tener al menos 2 caracteres"),
    developer: z.string().min(2, "El desarrollador debe tener al menos 2 caracteres"),
    releasedate: z.string().min(1, "La fecha es requerida"),
    price: z.coerce.number().positive("El precio debe ser mayor a 0"),
    genre: z.string().min(2, "El género debe tener al menos 2 caracteres"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
    console_id: z.coerce.number().min(1, "Selecciona una consola"),
})

export const gameEditSchema = gameSchema.extend({
    id: z.coerce.number().min(1),
})

export type GameSchema = z.infer<typeof gameSchema>
export type GameEditSchema = z.infer<typeof gameEditSchema>

// Console
export const consoleSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    manuFacturer: z.string().min(2, "El fabricante debe tener al menos 2 caracteres"),
    releaseDate: z.string().min(1, "La fecha es requerida"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
})

export const consoleEditSchema = consoleSchema.extend({
    id: z.coerce.number().min(1),
})

export type ConsoleSchema = z.infer<typeof consoleSchema>
export type ConsoleEditSchema = z.infer<typeof consoleEditSchema>