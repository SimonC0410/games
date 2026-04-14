"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
} from "recharts";

const COLORS = [
    "#38bdf8", "#22c55e", "#f59e0b", "#f97316",
    "#8b5cf6", "#fb7185", "#0ea5e9", "#facc15",
];

type ChartData = {
    name: string;
    games: number;
};

export default function DashboardCharts({ data }: { data: ChartData[] }) {
    const pieData = data.filter((c) => c.games > 0);
    const maxGames = Math.max(...data.map((item) => item.games), 1);

    const barData = data.map((c) => ({
        ...c,
        name: c.name.length > 10 ? c.name.slice(0, 10) + "…" : c.name,
    }));

    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2.2fr_1fr]">
            <div className="space-y-6">
                <div className="rounded-[32px] border border-slate-800/80 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/30">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Tendencias</p>
                            <h2 className="text-2xl font-semibold text-white">Juegos por consola</h2>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
                            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                            Vista general actualizada
                        </div>
                    </div>

                    <div className="mt-6 h-[420px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 10, right: 0, left: -18, bottom: 0 }}>
                                <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: "#cbd5e1", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: "#cbd5e1", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }}
                                    labelStyle={{ color: "#fff" }}
                                />
                                <Bar dataKey="games" radius={[18, 18, 0, 0]} barSize={24}>
                                    {barData.map((_, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-[32px] border border-slate-800/80 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/30">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Analítica</p>
                            <h2 className="text-2xl font-semibold text-white">Resumen de consolas</h2>
                        </div>
                        <span className="text-sm text-slate-400">{data.length} elementos</span>
                    </div>

                    <div className="space-y-4">
                        {data.map((item, index) => (
                            <div key={item.name} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-white">{item.name}</p>
                                        <p className="text-xs text-slate-500">{item.games} juegos</p>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-200">{item.games}</span>
                                </div>
                                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-800">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-sky-400"
                                        style={{ width: `${(item.games / maxGames) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-[32px] border border-amber-500/20 bg-slate-950/95 p-6 shadow-2xl shadow-amber-500/10">
                    <div className="mb-5">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Distribución</p>
                        <h2 className="text-2xl font-semibold text-amber-200">Consolas activas</h2>
                    </div>
                    <div className="h-[360px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={110}
                                    innerRadius={60}
                                    dataKey="games"
                                    label={({ name, percent }) => `${name} ${Math.round((percent ?? 0) * 100)}%`}
                                    labelLine={false}
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }}
                                    labelStyle={{ color: "#fff" }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    formatter={(value) => (
                                        <span style={{ color: "#cbd5e1", fontSize: 12 }}>{value}</span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-[32px] border border-slate-800/80 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/30">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Detalles</p>
                    <h2 className="text-2xl font-semibold text-white">Comparación rápida</h2>
                    <p className="mt-3 text-sm text-slate-400">Esta vista te ayuda a contrastar la presencia de juegos por consola con un diseño más claro y jerárquico.</p>
                    <div className="mt-6 grid gap-4">
                        <div className="rounded-3xl border border-cyan-500/10 bg-slate-900/90 p-4">
                            <p className="text-sm text-slate-400">Consola con más juegos</p>
                            <p className="mt-2 text-lg font-semibold text-white">{pieData[0]?.name ?? "N/A"}</p>
                        </div>
                        <div className="rounded-3xl border border-amber-500/10 bg-slate-900/90 p-4">
                            <p className="text-sm text-slate-400">Consola con menos juegos</p>
                            <p className="mt-2 text-lg font-semibold text-white">{pieData[pieData.length - 1]?.name ?? "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}