import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import Image from 'next/image';
import { redirect } from "next/navigation"
import SearchInput from "./SearchInput"

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
    await prisma.game.delete({ where: { id } })
    redirect("/games")
}

const GAMES_PER_PAGE = 10  // 👈 constante fácil de cambiar

export default async function GamesInfo({
    searchParams,
}: {
    searchParams: { search?: string; page?: string }
}) {
    const search = searchParams?.search ?? ""
    const currentPage = Math.max(1, Number(searchParams?.page ?? "1"))  // mínimo página 1
    const skip = (currentPage - 1) * GAMES_PER_PAGE

    const where = search
        ? { title: { contains: search, mode: "insensitive" as const } }
        : undefined

    // 👈 Dos queries en paralelo: juegos de la página actual + total
    const [games, totalGames] = await Promise.all([
        prisma.game.findMany({
            where,
            include: { console: true },
            skip,
            take: GAMES_PER_PAGE,
            orderBy: { id: "asc" }
        }),
        prisma.game.count({ where })
    ])

    const totalPages = Math.ceil(totalGames / GAMES_PER_PAGE)

    // Construir URL manteniendo el search param si existe
    const buildUrl = (page: number) => {
        const params = new URLSearchParams()
        if (search) params.set("search", search)
        params.set("page", String(page))
        return `/games?${params.toString()}`
    }

    return (
        <div>
            <h1 className='text-4xl text-purple-400 border-b-2 pb-2 mb-8'>Games</h1>
            <div className="flex justify-center items-center mb-10 gap-10">
                <SearchInput />
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

            {/* 👇 Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">

                    {/* Botón anterior */}
                    <Link
                        href={buildUrl(currentPage - 1)}
                        className={`btn btn-outline btn-purple-400 ${currentPage === 1 ? "btn-disabled" : ""}`}
                    >
                        «
                    </Link>

                    {/* Números de página */}
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

                    {/* Botón siguiente */}
                    <Link
                        href={buildUrl(currentPage + 1)}
                        className={`btn btn-outline ${currentPage === totalPages ? "btn-disabled" : ""}`}
                    >
                        »
                    </Link>

                </div>
            )}

            {/* Info de resultados */}
            <p className="text-center text-white/40 text-sm mt-4">
                Mostrando {skip + 1}–{Math.min(skip + GAMES_PER_PAGE, totalGames)} de {totalGames} juegos
            </p>
        </div>
    )
}