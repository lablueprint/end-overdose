'use client';

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    LegendProps,
} from 'recharts';
type LegendPayload = {
    color: string;
    value: string;
};

type PieChartProps = {
    failPercent: number;
    inProgressPercent: number;
    passPercent: number;
};

const COLORS = [
    'rgba(225, 122, 122, 0.4)', // Red (Fail)
    'rgba(198, 141, 26, 0.4)', // Yellow (In Progress)
    'rgba(2, 181, 107, 0.4)', // Green (Pass)
];

const CustomLegend = ({ payload }: LegendProps) => {
    if (!payload) return null;

    return (
        <ul className="flex justify-center gap-6 mt-6 flex-wrap">
            {[...payload].reverse().map((entry, index) => {
                if (!entry) return null;

                const { color, value } = entry as LegendPayload;

                return (
                    <li
                        key={`item-${index}`}
                        className="flex items-center gap-2"
                    >
                        <span
                            className="inline-block w-10 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                        ></span>
                        <span className="text-base text-gray-600">{value}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default function CustomPieChart({
    failPercent,
    inProgressPercent,
    passPercent,
}: PieChartProps) {
    const chartData = [
        { name: 'Fail', value: failPercent },
        { name: 'In Progress', value: inProgressPercent },
        { name: 'Pass', value: passPercent },
    ];

    return (
        <div className="w-full h-48 sm:h-60 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="100%"
                        innerRadius={0}
                        stroke="none"
                        isAnimationActive={false}
                    >
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Legend content={<CustomLegend />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
