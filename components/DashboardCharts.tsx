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
} from "recharts";

const COLORS = [
    "#9333ea", "#3b82f6", "#22c55e", "#f59e0b",
    "#ef4444", "#06b6d4", "#ec4899", "#84cc16",
];

type ChartData = {
    name: string;
    games: number;
};

export default function DashboardCharts({ data }: { data: ChartData[] }) {
    const pieData = data.filter((c) => c.games > 0);

    const barData = data.map((c) => ({
        ...c,
        name: c.name.length > 10 ? c.name.slice(0, 10) + "…" : c.name,
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="bg-base-200 border border-white/10 rounded-2xl p-6 shadow-xl">
                <h2 className="text-lg font-semibold mb-4 text-white/80">
                    Juegos por Consola
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <XAxis dataKey="name" tick={{ fill: "#ffffff80", fontSize: 11 }} />
                        <YAxis tick={{ fill: "#ffffff80", fontSize: 11 }} allowDecimals={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#1d1d1d", border: "none" }}
                            labelStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="games" radius={[6, 6, 0, 0]}>
                            {barData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-base-200 border border-white/10 rounded-2xl p-6 shadow-xl">
                <h2 className="text-lg font-semibold mb-4 text-white/80">
                    Distribucion Consola
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="games"
                            label={({ value }) => `${value}`}
                        >
                            {pieData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: "#1d1d1d", border: "none" }}
                            labelStyle={{ color: "#fff" }}
                        />
                        <Legend
                            formatter={(value) => (
                                <span style={{ color: "#ffffff80", fontSize: 12 }}>{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}