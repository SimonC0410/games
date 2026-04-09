"use client"

import { useActionState } from "react"
import Link from "next/link"
import ImagePreview from "@/app/games/add/ImagePreview"
import { updateGame } from "@/handler/gameHandler"
import { Game, Console } from "@prisma/client"

type FormState = {
    errors?: Partial<Record<string, string[]>>
}

export default function EditGameForm({
    game,
    consoles,
}: {
    game: Game
    consoles: Console[]
}) {
    const [state, formAction, isPending] = useActionState<FormState, FormData>(
        updateGame,
        { errors: {} }
    )

    return (
        <div className="hero min-h-screen text-white" style={{ backgroundImage: "url(/img/ae.jpg)" }}>
            <div className="hero-content flex-col">
                <div className="card bg-black text-white w-full max-w-3xl border-2 border-purple-400">
                    <div className="card-body">

                        <div className="flex">
                            <Link href="/games" className="bg-black/10 h-7 border-2 border-purple-400 text-white pl-5 pr-5 rounded-sm hover:scale-105 transition hover:bg-purple-400 hover:text-black">
                                <button>Atrás</button>
                            </Link>
                            <h1 className="text-3xl text-purple-400 mb-6 ml-10">Edit Game</h1>
                        </div>

                        <form action={formAction} className="flex flex-col gap-4">

                            <input type="hidden" name="id" value={game.id} />

                            <ImagePreview currentImage={game.cover} />

                            <fieldset className="grid grid-cols-2 gap-4">

                                {/* Title */}
                                <div className="flex flex-col gap-1">
                                    <input
                                        name="title"
                                        defaultValue={game.title}
                                        className={`input input-bordered ${state.errors?.title ? "input-error" : ""}`}
                                    />
                                    {state.errors?.title && (
                                        <span className="text-error text-xs">{state.errors.title[0]}</span>
                                    )}
                                </div>

                                {/* Developer */}
                                <div className="flex flex-col gap-1">
                                    <input
                                        name="developer"
                                        defaultValue={game.developer}
                                        className={`input input-bordered ${state.errors?.developer ? "input-error" : ""}`}
                                    />
                                    {state.errors?.developer && (
                                        <span className="text-error text-xs">{state.errors.developer[0]}</span>
                                    )}
                                </div>

                                {/* Release Date */}
                                <div className="flex flex-col gap-1">
                                    <input
                                        type="date"
                                        name="releasedate"
                                        defaultValue={game.releasedate.toISOString().split("T")[0]}
                                        className={`input input-bordered ${state.errors?.releasedate ? "input-error" : ""}`}
                                    />
                                    {state.errors?.releasedate && (
                                        <span className="text-error text-xs">{state.errors.releasedate[0]}</span>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="flex flex-col gap-1">
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        defaultValue={game.price}
                                        className={`input input-bordered ${state.errors?.price ? "input-error" : ""}`}
                                    />
                                    {state.errors?.price && (
                                        <span className="text-error text-xs">{state.errors.price[0]}</span>
                                    )}
                                </div>

                                {/* Genre */}
                                <div className="flex flex-col gap-1">
                                    <input
                                        name="genre"
                                        defaultValue={game.genre}
                                        className={`input input-bordered ${state.errors?.genre ? "input-error" : ""}`}
                                    />
                                    {state.errors?.genre && (
                                        <span className="text-error text-xs">{state.errors.genre[0]}</span>
                                    )}
                                </div>

                                {/* Console */}
                                <div className="flex flex-col gap-1">
                                    <select
                                        name="console_id"
                                        defaultValue={game.console_id}
                                        className={`select select-bordered ${state.errors?.console_id ? "select-error" : ""}`}
                                    >
                                        {consoles.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    {state.errors?.console_id && (
                                        <span className="text-error text-xs">{state.errors.console_id[0]}</span>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-1 col-span-2">
                                    <textarea
                                        name="description"
                                        defaultValue={game.description}
                                        className={`textarea textarea-bordered ${state.errors?.description ? "textarea-error" : ""}`}
                                    />
                                    {state.errors?.description && (
                                        <span className="text-error text-xs">{state.errors.description[0]}</span>
                                    )}
                                </div>

                            </fieldset>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="btn btn-outline btn-warning"
                            >
                                {isPending ? "Guardando..." : "Update Game"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}