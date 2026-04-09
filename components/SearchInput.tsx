"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

export default function SearchInput() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        startTransition(() => {
            if (value.trim() === "") {
                router.push("/games")
            } else {
                router.push(`/games?search=${encodeURIComponent(value)}`)
            }
        })
    }

    return (
        <input
            type="text"
            placeholder="Buscar juego..."
            defaultValue={searchParams.get("search") ?? ""}
            onChange={handleSearch}
            className={`input input-primary transition-opacity ${isPending ? "opacity-50" : "opacity-100"}`}
        />
    )
}