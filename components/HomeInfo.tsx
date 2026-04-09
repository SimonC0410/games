"use client";
import Link from "next/link";
import {Fingerprint} from "@phosphor-icons/react";
import {UserPlusIcon} from "@phosphor-icons/react";
export default function HomeInfo() {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: "url(/img/bg-home.jpeg)", }}>
            <div className="hero-overlay"></div>
            <div className="bg-black/70  hero-content text-neutral-content text-center border-2 border-warning rounded-lg p-8">
                <div className="max-w-md">
                    <img src="/img/logo.png" alt="Logo" />
                    <p className="text-justify">
                        <strong>GameNext.js</strong> is a modern platform to
                        manage and organize videogames. Built with Next.js, it
                        uses Prisma, Neon database, and Stack Auth to provide
                        secure authentication, fast performance, and scalable
                        data management.
                    </p>
                    <Link href="handler/sign-in" className="btn btn-outline px-10 btn-warning mt-8" >
                        <Fingerprint size={24} className="mr-2"/>
                        Sign In
                    </Link>
                    <Link href="handler/sign-up" className="btn btn-outline px-10 btn-warning mt-8 ml-8" >
                        <UserPlusIcon />
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}