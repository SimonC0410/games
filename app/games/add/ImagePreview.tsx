"use client"

import { useState } from "react"

export default function ImagePreview({ currentImage }: { currentImage?: string }) {

    const [preview, setPreview] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0]

        if (!file) return

        const url = URL.createObjectURL(file)

        setPreview(url)
    }

    return (
        <div className="col-span-2 flex flex-col items-center gap-3">   
            {/* PREVIEW */}
            {preview ? (
                <img
                src={preview}
                className="w-40 h-40 object-cover rounded-lg border"
                />
            ) : currentImage ? (
                <img
                src={`/img/${currentImage}`}
                className="w-40 h-40 object-cover rounded-lg border"
                />
            ) : null}

            {/* INPUT */}
            <input
                type="file"
                name="cover"
                accept="image/*"
                onChange={handleChange}
                className="file-input file-input-bordered w-full"
            />
        </div>
    )
}