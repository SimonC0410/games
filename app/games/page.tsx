import { stackServerApp } from "@/stack/server"
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import GamesInfo from "@/components/GamesInfo";

export default async function GamesPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;  // 👈 Promise
}) {
    const user = await stackServerApp.getUser();
    if (!user) redirect("/");

    const resolvedSearchParams = await searchParams;  // 👈 await

    return (
        <SideBar currentPath={'/games'}>
            <GamesInfo searchParams={resolvedSearchParams} />
        </SideBar>
    )
}