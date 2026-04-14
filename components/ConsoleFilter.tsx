"use client"

import { useRouter, useSearchParams } from "next/navigation"

type Console = {
    id: number
    name: string
}

export default function ConsoleFilter({ consoles }: { consoles: Console[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentConsole = searchParams.get("console") ?? ""
    const currentSearch = searchParams.get("search") ?? ""

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams()
        if (currentSearch) params.set("search", currentSearch)
        if (e.target.value) params.set("console", e.target.value)
        params.set("page", "1")
        router.push(`/games?${params.toString()}`)
    }

    return (
        <select
            className="select select-bordered border-purple-400 text-purple-400 bg-black"
            value={currentConsole}
            onChange={handleChange}
        >
            <option value="">All Consoles</option>
            {consoles.map((c) => (
                <option key={c.id} value={String(c.id)}>
                    {c.name}
                </option>
            ))}
        </select>
    )
}