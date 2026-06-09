import { Download, ChevronDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
];

const incomeData = months.map((m, i) => ({
  month: m,
  collected: [
    30000, 55000, 40000, 20000, 65000, 85000, 48000, 52000, 42000, 38000,
  ][i],
  other: [8000, 12000, 10000, 6000, 15000, 14000, 11000, 13000, 9000, 10000][i],
}));

const occupancyData = months.map((m, i) => ({
  month: m,
  occupancy: [68, 72, 75, 70, 74, 78, 73, 76, 72, 70][i],
  vacancy: [32, 28, 25, 30, 26, 22, 27, 24, 28, 30][i],
  total: 100,
}));

const vacancyData = months.map((m, i) => ({
  month: m,
  loss: [4200, 5100, 4800, 3200, 4500, 6100, 5800, 7200, 6300, 5600][i],
}));

export default function ReportsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-1.5 text-xs py-2">
            <Download size={13} className="text-green-600" />
            Export PDF
          </button>
          <button className="btn-outline flex items-center gap-1.5 text-xs py-2">
            <Download size={13} className="text-green-600" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3">
        {["All Properties", "Month", "Customize", "Date"].map((f) => (
          <button
            key={f}
            className="btn-outline flex items-center gap-1.5 text-xs py-2"
          >
            {f} <ChevronDown size={11} />
          </button>
        ))}
      </div>

      {/* Top row charts */}
      <div className="grid grid-cols-2 gap-5">
        {/* Monthly Income */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Monthly Income Report
            </h2>
            <span className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600">
              Income per Month
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={incomeData}
              barGap={2}
              margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                }}
                formatter={(value: unknown) =>
                  `$${Number(value).toLocaleString()}`
                }
              />
              <Bar
                dataKey="other"
                fill="#fca5a5"
                radius={[3, 3, 0, 0]}
                stackId="a"
              />
              <Bar
                dataKey="collected"
                fill="#ef4444"
                radius={[3, 3, 0, 0]}
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="bg-gray-900 text-white rounded-xl p-3 mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              ["$90,500", "Total Income"],
              ["$90,500", "Collected Rent"],
              ["$90,500", "Other Income"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-sm font-bold">{v}</p>
                <p className="text-xs text-gray-400">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Occupancy Trend */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Occupancy Trend
            </h2>
            <span className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600">
              Income per Year
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={occupancyData}
              margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                }}
              />
              <Line
                type="monotone"
                dataKey="occupancy"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: "#22c55e", r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="vacancy"
                stroke="#d1d5db"
                strokeWidth={2}
                dot={{ fill: "#d1d5db", r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="bg-gray-900 text-white rounded-xl p-3 mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              ["250", "Occupied Units"],
              ["60", "Vacant Units"],
              ["90%", "Occupancy Rate"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-sm font-bold">{v}</p>
                <p className="text-xs text-gray-400">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-5">
        {/* Vacancy Loss */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Vacancy Loss
          </h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={vacancyData}
              margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                }}
                formatter={(value: unknown) =>
                  `$${Number(value).toLocaleString()}`
                }
              />
              <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="bg-gray-900 text-white rounded-xl p-3 mt-3 grid grid-cols-2 gap-2 text-center">
            {[
              ["$7,800", "Vacancy Loss This Month"],
              ["$7,900 / Month", "Last Year"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-sm font-bold">{v}</p>
                <p className="text-xs text-gray-400">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tenant Turnover */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Tenant Turnover
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32">
              <PieChart width={128} height={128}>
                <Pie
                  data={[{ v: 38.5 }, { v: 61.5 }]}
                  cx={60}
                  cy={60}
                  innerRadius={38}
                  outerRadius={55}
                  dataKey="v"
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="#ef4444" />
                  <Cell fill="#86efac" />
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-gray-900">38.5%</span>
                <span className="text-xs text-gray-500">Turnover Rate</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
                  45 Tenants
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                  15 Moved Out
                </span>
              </div>
              <div className="bg-gray-900 text-white rounded-xl p-3 space-y-2">
                {[
                  ["60", "Total Leases Last 12 Months"],
                  ["43", "Renew Tenants"],
                  ["18", "Moved Out Tenants"],
                  ["70", "Total Lease Last 12 Months"],
                ].map(([v, l]) => (
                  <div key={l} className="flex items-center gap-2">
                    <span className="text-sm font-bold text-red-400 w-8">
                      {v}
                    </span>
                    <span className="text-xs text-gray-300">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
