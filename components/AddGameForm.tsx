"use client"

import { useActionState } from "react"
import Link from "next/link"
import ImagePreview from "@/app/games/add/ImagePreview"
import { addGame } from "../handler/gameHandler"

type Console = { id: number; name: string }

type FormState = {
    errors?: Partial<Record<string, string[]>>
    success?: boolean
}

export default function AddGameForm({ consoles }: { consoles: Console[] }) {
    const [state, formAction, isPending] = useActionState<FormState, FormData>(
        addGame,
        { errors: {} }
    )

    return (
        <div className="hero min-h-screen text-white" style={{ backgroundImage: "url(/img/ae.jpg)" }}>
            <div className="hero-content flex-col">
                <div className="card bg-black text-white w-full max-w-3xl shadow-2xl border-2 border-purple-400">
                    <div className="card-body">

                        <div className="flex">
                            <Link href="/games" className="bg-black/10 h-7 border-2 border-purple-400 text-white pl-5 pr-5 rounded-sm cursor-pointer hover:scale-105 transition hover:bg-purple-400 hover:text-black">
                                <button>Atrás</button>
                            </Link>
                            <h1 className="text-3xl text-purple-400 mb-6 ml-10">Add Game</h1>
                        </div>

                        <form action={formAction} className="flex flex-col gap-4">
                            <fieldset className="grid grid-cols-2 gap-4">

                                <ImagePreview />

                                {/* Title */}
                                <div className="flex flex-col gap-1">
                                    <input
                                        name="title"
                                        placeholder="Title"
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
                                        placeholder="Developer"
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
                                        placeholder="Price"
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
                                        placeholder="Genre"
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
                                        className={`select select-bordered ${state.errors?.console_id ? "select-error" : ""}`}
                                    >
                                        <option value="">Select Console</option>
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
                                        placeholder="Description"
                                        className={`textarea textarea-bordered ${state.errors?.description ? "textarea-error" : ""}`}
                                    />
                                    {state.errors?.description && (
                                        <span className="text-error text-xs">{state.errors.description[0]}</span>
                                    )}
                                </div>

                            </fieldset>

                            <button
                                className="btn btn-outline btn-success"
                                disabled={isPending}
                            >
                                {isPending ? "Guardando..." : "Add Game"}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}