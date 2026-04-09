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

    return (
        <div>
            {/* Header */}
            <div className="border-b-2 pb-2 mb-6">
                <h1 className="text-4xl">Dashboard</h1>
                <p className="text-white/40 text-sm mt-1">General</p>
            </div>

            {/* Tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-base-200 border border-white/10 rounded-2xl p-6 flex items-center gap-4 shadow-xl">
                    <div className="bg-purple-600/20 p-4 rounded-xl text-3xl">
                        🎮
                    </div>
                    <div>
                        <p className="text-white/50 text-sm">Total Games</p>
                        <p className="text-4xl font-bold text-white">{totalGames}</p>
                    </div>
                </div>

                <div className="bg-base-200 border border-white/10 rounded-2xl p-6 flex items-center gap-4 shadow-xl">
                    <div className="bg-blue-600/20 p-4 rounded-xl text-3xl">
                        🖥️
                    </div>
                    <div>
                        <p className="text-white/50 text-sm">Total Consoles</p>
                        <p className="text-4xl font-bold text-white">{totalConsoles}</p>
                    </div>
                </div>
            </div>

            {/* Gráficas */}
            <DashboardCharts data={chartData} />
        </div>
    );
}