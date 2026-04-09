import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import Image from 'next/image';

import fs from "fs/promises"
import path from "path"
import { redirect } from "next/navigation"

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!
    }),
})

async function deleteConsole(formData: FormData) {
    "use server"

    const id = Number(formData.get("id"))

    const console = await prisma.console.findUnique({
        where: { id }
    })

    if (!console) return

    await prisma.console.delete({
        where: { id }
    })

    redirect("/consoles")
}

export default async function ConsolesInfo() {
    const consoles = await prisma.console.findMany()

    return (
        <div>
            <h1 className='text-4xl text-purple-400 border-b-2 pb-2 mb-8'>Consoles</h1>
            <div className="flex justify-center items-center mb-10 gap-10">

                <Link href={"/consoles/add"}>
                    <button className="btn btn-outline btn-success">
                        Add
                    </button>
                </Link>
            </div>
            <div>
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    {consoles.map((console) => (
                        <div key={console.id} className="card bg-black-100 w-96 h-[420px] shadow-sm flex flex-col border-2 border-purple-400">
                            <figure className="w-full h-60 relative">
                                <Image
                                    src={`/img/${console.image}`}
                                    alt={console.image}
                                    fill
                                    className="object-cover"
                                />
                            </figure>
                            <div className="card-body flex flex-col justify-between bg-black/40 text-white h-150px">
                                <h2 className="card-title">
                                    {console.name}
                                </h2>
                                <h4 className="text-white/60">Manufacurer {console.manuFacturer}</h4>
                                <div className="card-actions justbtn-outlineify-end flex">
                                    <Link href={`/consoles/edit/${console.id}`}>
                                        <div className="btn btn-outline btn-warning">Edit</div>
                                    </Link>

                                    <Link href={`/consoles/show/${console.id}`}>
                                        <div className="btn btn-outline btn-info">View</div>
                                    </Link>
                                    {/* Eliminar */}
                                    <label
                                        htmlFor={`delete_modal_${console.id}`}
                                        className="btn btn-outline btn-error"
                                    >
                                        Delete
                                    </label>
                                    <input
                                        type="checkbox"
                                        id={`delete_modal_${console.id}`}
                                        className="modal-toggle"
                                    />

                                    <div className="modal" role="dialog">
                                        <div className="modal-box bg-black border-2 border-purple-400">

                                            <h3 className="text-lg font-bold text-error">
                                                Delete Console
                                            </h3>

                                            <p className="py-4">
                                                Are you sure you want to delete
                                                <span className="font-bold"> {console.name}</span>?
                                            </p>

                                            <div className="modal-action">

                                                <label
                                                    htmlFor={`delete_modal_${console.id}`}
                                                    className="btn"
                                                >
                                                    Cancel
                                                </label>
                                                <form action={deleteConsole}>

                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={console.id}
                                                    />

                                                    <button
                                                        type="submit"
                                                        className="btn btn-error"
                                                    >
                                                        Delete Console
                                                    </button>

                                                </form>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

