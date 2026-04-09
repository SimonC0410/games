
import { stackServerApp } from "@/stack/server"
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import ConsolesInfo from "@/components/ConsolesInfo";

export default async function ConsolesPage({Children, }: {Children: React.ReactNode;}) {
    const user = await stackServerApp.getUser();
    if (!user) {
        redirect("/");
    }


    return (
        <SideBar currentPath={'/consoles'}>
            <ConsolesInfo/>
        </SideBar>
    )
}