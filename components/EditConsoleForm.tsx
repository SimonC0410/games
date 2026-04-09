"use client"

import { useActionState } from "react"
import Link from "next/link"
import ImagePreview from "@/app/consoles/add/ImagePreview"
import { updateConsole } from "@/handler/consoleHandler"
import { Console } from "@prisma/client"

type FormState = {
    errors?: Partial<Record<string, string[]>>
}

export default function EditConsoleForm({ console }: { console: Console }) {
    const [state, formAction, isPending] = useActionState<FormState, FormData>(
        updateConsole,
        { errors: {} }
    )

    return (
        <div className="hero min-h-screen text-white" style={{ backgroundImage: "url(/img/ae.jpg)" }}>
            <div className="hero-content flex-col">
                <div className="card bg-black text-white w-full max-w-3xl border-2 border-purple-400">
                    <div className="card-body">

                        <div className="flex">
                            <Link href="/consoles" className="bg-black/10 h-7 border-2 border-purple-400 text-white pl-5 pr-5 rounded-sm hover:scale-105 transition hover:bg-purple-400 hover:text-black">
                                <button>Atrás</button>
                            </Link>
                            <h1 className="text-3xl text-purple-400 mb-6 ml-10">Edit Console</h1>
                        </div>

                        <form action={formAction} className="flex flex-col gap-4">

                            <input type="hidden" name="id" value={console.id} />

                            <ImagePreview currentImage={console.image} />

                            <fieldset className="grid grid-cols-2 gap-4">

                                {/* Name */}
                                <div className="flex flex-col gap-1">
                                    <input
                                        name="name"
                                        defaultValue={console.name}
                                        placeholder="Name"
                                        className={`input input-bordered ${state.errors?.name ? "input-error" : ""}`}
                                    />
                                    {state.errors?.name && (
                                        <span className="text-error text-xs">{state.errors.name[0]}</span>
                                    )}
                                </div>

                                {/* Manufacturer */}
                                <div className="flex flex-col gap-1">
                                    <input
                                        name="manufacturer"
                                        defaultValue={console.manuFacturer}
                                        placeholder="Manufacturer"
                                        className={`input input-bordered ${state.errors?.manuFacturer ? "input-error" : ""}`}
                                    />
                                    {state.errors?.manuFacturer && (
                                        <span className="text-error text-xs">{state.errors.manuFacturer[0]}</span>
                                    )}
                                </div>

                                {/* Release Date */}
                                <div className="flex flex-col gap-1">
                                    <input
                                        type="date"
                                        name="releasedate"
                                        defaultValue={console.releaseDate.toISOString().split("T")[0]}
                                        className={`input input-bordered ${state.errors?.releaseDate ? "input-error" : ""}`}
                                    />
                                    {state.errors?.releaseDate && (
                                        <span className="text-error text-xs">{state.errors.releaseDate[0]}</span>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-1 col-span-2">
                                    <textarea
                                        name="description"
                                        defaultValue={console.description}
                                        placeholder="Description"
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
                                {isPending ? "Guardando..." : "Update Console"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}