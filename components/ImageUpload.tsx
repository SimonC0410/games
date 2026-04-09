"use client";
import { useState } from "react";
import Image from "next/image";

type ImageUploadProps = {
    currentCover: string;
};

export default function ImageUpload({ currentCover }: ImageUploadProps) {
    const [preview, setPreview] = useState<string>(`/imgs/${currentCover}`);
    const [uploading, setUploading] = useState(false);
    const [filename, setFilename] = useState(currentCover);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setFilename(data.filename);
        setUploading(false);
    }

    return (
        <div className="flex flex-col gap-3">
            <span className="text-xs text-white/50 uppercase tracking-widest">
                Cover Image
            </span>

            <div className="relative w-full h-52 rounded-xl overflow-hidden border border-white/10 bg-base-300">
                <Image
                    src={preview}
                    alt="cover preview"
                    fill
                    className="object-cover"
                />
                {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg text-purple-400" />
                    </div>
                )}
            </div>

            <label className="flex items-center gap-3 cursor-pointer btn btn-outline btn-sm w-fit">
                <span>📁 Choose image</span>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>

            <input type="hidden" name="cover" value={filename} />

            <span className="text-xs text-white/30">{filename}</span>
        </div>
    );
}