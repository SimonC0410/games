"use client"

import { useActionState } from "react"
import Link from "next/link"
import ImagePreview from "@/app/consoles/add/ImagePreview"
import { addConsole } from "@/handler/consoleHandler"

type FormState = {
    errors?: Partial<Record<string, string[]>>
}

export default function AddConsoleForm() {
    const [state, formAction, isPending] = useActionState<FormState, FormData>(
        addConsole,
        { errors: {} }
    )

    return (
        <div className="hero min-h-screen text-white" style={{ backgroundImage: "url(/img/ae.jpg)" }}>
            <div className="hero-content flex-col">
                <div className="card bg-black text-white w-full max-w-3xl shadow-2xl border-2 border-purple-400">
                    <div className="card-body">

                        <div className="flex">
                            <Link href="/consoles" className="bg-black/10 h-7 border-2 border-purple-400 text-white pl-5 pr-5 rounded-sm hover:scale-105 transition hover:bg-purple-400 hover:text-black">
                                <button>Atrás</button>
                            </Link>
                            <h1 className="text-3xl text-purple-400 mb-6 ml-10">Add Console</h1>
                        </div>

                        <form action={formAction} className="flex flex-col gap-4">
                            <fieldset className="grid grid-cols-2 gap-4">

                                <ImagePreview />

                                {/* Name */}
                                <div className="flex flex-col gap-1">
                                    <input
                                        name="name"
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
                                className="btn btn-outline btn-success"
                            >
                                {isPending ? "Guardando..." : "Add Console"}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}