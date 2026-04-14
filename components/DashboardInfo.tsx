import { prisma } from "@/lib/prisma";
import DashboardCharts from "@/components/DashboardCharts";

export default async function DashboardInfo() {
    const totalGames = await prisma.game.count();
    const totalConsoles = await prisma.console.count();

    const consolesWithGames = await prisma.console.findMany({
        include: { _count: { select: { games: true } } },
        orderBy: { id: "asc" },
    });

    const chartData = consolesWithGames.map((c) => ({
        name: c.name,
        games: c._count.games,
    }));

    const averageGames = totalConsoles > 0 ? Math.round(totalGames / totalConsoles) : 0;

    return (
        <div className="space-y-8">
            <div className="rounded-[32px] border border-slate-800/80 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/30">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Panel de control</p>
                        <h1 className="text-4xl font-semibold text-white">Dashboard</h1>
                        <p className="text-slate-400 mt-2">Resumen de juegos y consolas con un diseño actualizado.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                        Actualizado en tiempo real
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-5 shadow-xl shadow-cyan-500/10">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Games</p>
                        <p className="mt-4 text-4xl font-bold text-white">{totalGames}</p>
                        <p className="mt-2 text-sm text-slate-400">Juegos disponibles en todas las consolas.</p>
                    </div>
                    <div className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-5 shadow-xl shadow-amber-500/10">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Consoles</p>
                        <p className="mt-4 text-4xl font-bold text-white">{totalConsoles}</p>
                        <p className="mt-2 text-sm text-slate-400">Consolas registradas en el inventario.</p>
                    </div>
                    <div className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-5 shadow-xl shadow-violet-500/10">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Promedio</p>
                        <p className="mt-4 text-4xl font-bold text-white">{averageGames}</p>
                        <p className="mt-2 text-sm text-slate-400">Juegos por consola en promedio.</p>
                    </div>
                </div>
            </div>

            <DashboardCharts data={chartData} />
        </div>
    );
}