import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import Image from 'next/image';
import { redirect } from "next/navigation"
import SearchInput from "./SearchInput"
import ConsoleFilter from "./ConsoleFilter"
import fs from "fs/promises"
import path from "path"

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!
    }),
})

async function deleteGame(formData: FormData) {
    "use server"
    const id = Number(formData.get("id"))
    const game = await prisma.game.findUnique({ where: { id } })
    if (!game) return

    if (game.cover && game.cover !== "no-cover.png") {
        const imagePath = path.join(process.cwd(), "public", "img", game.cover)
        try {
            await fs.unlink(imagePath)
        } catch (err) {
            console.error("No se pudo eliminar la imagen:", err)
        }
    }

    await prisma.game.delete({ where: { id } })
    redirect("/games")
}
const GAMES_PER_PAGE = 10

export default async function GamesInfo({
    searchParams,
}: {
    searchParams: { search?: string; page?: string; console?: string }
}) {
    const search = searchParams?.search ?? ""
    const consoleId = searchParams?.console ? Number(searchParams.console) : undefined
    const currentPage = Math.max(1, Number(searchParams?.page ?? "1"))
    const skip = (currentPage - 1) * GAMES_PER_PAGE

    const where: any = {}
    if (search) where.title = { contains: search, mode: "insensitive" }
    if (consoleId) where.console_id = consoleId  // ✅ nombre correcto del campo

    const [games, totalGames, consoles] = await Promise.all([
        prisma.game.findMany({
            where,
            include: { console: true },
            skip,
            take: GAMES_PER_PAGE,
            orderBy: { id: "asc" }
        }),
        prisma.game.count({ where }),
        prisma.console.findMany({ orderBy: { name: "asc" } })
    ])

    const totalPages = Math.ceil(totalGames / GAMES_PER_PAGE)

    const buildUrl = (page: number) => {
        const params = new URLSearchParams()
        if (search) params.set("search", search)
        if (consoleId) params.set("console", String(consoleId))
        params.set("page", String(page))
        return `/games?${params.toString()}`
    }

    return (
        <div>
            <h1 className='text-4xl text-purple-400 border-b-2 pb-2 mb-8'>Games</h1>
            <div className="flex justify-center items-center mb-10 gap-4 flex-wrap">
                <SearchInput />
                <ConsoleFilter consoles={consoles} />
                <Link href={"/games/add"}>
                    <button className="btn btn-outline btn-success">Add</button>
                </Link>
            </div>

            {games.length === 0 && (
                <p className="text-center text-white/60 mt-10">
                    No se encontraron juegos
                    {search && <> para <span className="text-purple-400">"{search}"</span></>}
                </p>
            )}

            <div className="flex flex-wrap gap-4 justify-center items-center">
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="card bg-black-100 w-96 h-[420px] shadow-sm flex flex-col border-2 border-purple-400"
                    >
                        <figure className="w-full h-60 relative">
                            <Image
                                src={`/img/${game.cover}`}
                                alt={game.cover}
                                fill
                                className="object-cover"
                            />
                        </figure>
                        <div className="card-body flex flex-col justify-between bg-black/40 text-white h-150px">
                            <h4 className="text-purple-400">US$ {game.price}</h4>
                            <h2 className="card-title">{game.title}</h2>
                            <h4 className="text-white/60">Disponible para {game.console.name}</h4>
                            <h4 className="text-white/60">Genre: {game.genre}</h4>
                            <div className="card-actions flex items-center justify-end gap-2">
                                <Link href={`/games/edit/${game.id}`}>
                                    <div className="btn btn-outline btn-warning">Edit</div>
                                </Link>
                                <Link href={`/games/show/${game.id}`}>
                                    <div className="btn btn-outline btn-info">View</div>
                                </Link>
                                <label htmlFor={`delete_modal_${game.id}`} className="btn btn-outline btn-error">
                                    Delete
                                </label>
                                <input type="checkbox" id={`delete_modal_${game.id}`} className="modal-toggle" />
                                <div className="modal" role="dialog">
                                    <div className="modal-box bg-black border-2 border-purple-400">
                                        <h3 className="text-lg font-bold text-error">Delete Game</h3>
                                        <p className="py-4">
                                            Are you sure you want to delete
                                            <span className="font-bold"> {game.title}</span>?
                                        </p>
                                        <div className="modal-action">
                                            <label htmlFor={`delete_modal_${game.id}`} className="btn">Cancel</label>
                                            <form action={deleteGame}>
                                                <input type="hidden" name="id" value={game.id} />
                                                <button type="submit" className="btn btn-error">Delete Game</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                    <Link
                        href={buildUrl(currentPage - 1)}
                        className={`btn btn-outline btn-purple-400 ${currentPage === 1 ? "btn-disabled" : ""}`}
                    >
                        «
                    </Link>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Link key={page} href={buildUrl(page)}>
                            <button
                                className={`btn ${currentPage === page
                                    ? "btn-primary border-purple-400 bg-purple-400 text-black"
                                    : "btn-outline border-purple-400 text-purple-400"
                                    }`}
                            >
                                {page}
                            </button>
                        </Link>
                    ))}
                    <Link
                        href={buildUrl(currentPage + 1)}
                        className={`btn btn-outline ${currentPage === totalPages ? "btn-disabled" : ""}`}
                    >
                        »
                    </Link>
                </div>
            )}

            <p className="text-center text-white/40 text-sm mt-4">
                Mostrando {skip + 1}–{Math.min(skip + GAMES_PER_PAGE, totalGames)} de {totalGames} juegos
            </p>
        </div>
    )
}