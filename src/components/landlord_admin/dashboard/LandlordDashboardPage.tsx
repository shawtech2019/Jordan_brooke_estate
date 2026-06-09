import { Building2, Users, Home, DollarSign, AlertCircle, Bell, FilePlus, PlusSquare, CreditCard } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'


const stats = [
  { label: 'Total Properties', value: '24', icon: <Building2 size={18} />, dark: true },
  { label: 'Occupied Unit', value: '55', icon: <Users size={18} />, dark: true },
  { label: 'Vacant Units', value: '8', icon: <Home size={18} />, light: true },
  { label: 'Monthly Rental Income', value: '$56,000', icon: <DollarSign size={18} />, dark: true },
  { label: 'Outstanding Payment', value: '$5,500', icon: <AlertCircle size={18} />, dark: true },
]

const rentPayments = [
  { name: 'John Cage', unit: 'Apartment 2A', amount: '$1,200', due: 'Jun 05 - 2026', status: 'Upcoming' },
  { name: 'David Carmell', unit: 'Flat 12', amount: '$3,000', due: 'Jun 05 - 2026', status: 'Pending' },
  { name: 'Samuel Indigo', unit: 'Plot 13C', amount: '$7,965', due: 'Jun 05 - 2026', status: 'Overdue' },
]

const chartData = [
  { month: 'Jan', income: 12000, prev: 8000 },
  { month: 'Feb', income: 28000, prev: 18000 },
  { month: 'Mar', income: 22000, prev: 20000 },
  { month: 'Apr', income: 18000, prev: 15000 },
  { month: 'May', income: 38000, prev: 30000 },
  { month: 'Jun', income: 40000, prev: 35000 },
  { month: 'Jul', income: 30000, prev: 28000 },
  { month: 'Aug', income: 35000, prev: 32000 },
]

const quickActions = [
  { label: 'Send Payment Reminders', icon: <Bell size={15} /> },
  { label: 'Create lease', icon: <FilePlus size={15} /> },
  { label: 'Add New Property', icon: <PlusSquare size={15} /> },
  { label: 'View Rent Payments', icon: <CreditCard size={15} /> },
]

const statusStyle: Record<string, string> = {
  Upcoming: 'badge badge-blue',
  Pending: 'badge badge-yellow',
  Overdue: 'badge badge-red',
}

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome Back! Here is your property review</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-5 gap-3">
        {stats.map((s, i) => (
          <div key={i} className={`rounded-2xl p-4 ${s.light ? 'bg-white border border-gray-100 shadow-sm' : 'bg-gray-900 text-white'}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${s.light ? 'bg-gray-100 text-gray-600' : 'bg-gray-700 text-gray-300'}`}>
              {s.icon}
            </div>
            <p className={`text-xs font-medium mb-1 ${s.light ? 'text-gray-500' : 'text-gray-400'}`}>{s.label}</p>
            <p className={`text-xl font-bold ${s.light ? 'text-gray-900' : 'text-white'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-5">
        {/* Upcoming payments */}
        <div className="col-span-3 card p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Upcoming Rent Payment</h2>
          <div className="space-y-3">
            {rentPayments.map((r) => (
              <div key={r.name} className="border border-gray-100 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-900">{r.name}</span>
                  <span className="text-sm font-bold text-gray-900">{r.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{r.unit}</p>
                    <p className="text-xs text-gray-400">Due: {r.due}</p>
                  </div> 
                  <span className={statusStyle[r.status]}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions + Chart */}
        <div className="col-span-2 space-y-4">
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((a) => (
                <button key={a.label} onClick={() => a.label === 'View Rent Payments'}
                  className="w-full flex items-center gap-3 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <span className="text-gray-500">{a.icon}</span>{a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card p-5">
  <h2 className="text-sm font-semibold text-gray-900 mb-4">
    Rental Income (Monthly Trend)
  </h2>

  <ResponsiveContainer width="100%" height={200}>
    <BarChart
      data={chartData}
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
        tickFormatter={(v: number) => `$${v / 1000}k`}
      />

      <Tooltip
        formatter={(value: unknown) =>
          `$${Number(value).toLocaleString()}`
        }
        contentStyle={{
          fontSize: 12,
          borderRadius: 8,
          border: "1px solid #e5e7eb",
        }}
      />

      <Bar dataKey="prev" fill="#fca5a5" radius={[4, 4, 0, 0]} />
      <Bar dataKey="income" fill="#ef4444" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>
    </div>
  )
}


// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Building2,
//   Users,
//   Home,
//   DollarSign,
//   AlertCircle,
//   Bell,
//   FilePlus,
//   PlusSquare,
//   CreditCard,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// type Stats = {
//   totalProperties: number;
//   occupiedUnits: number;
//   vacantUnits: number;
//   totalIncome: number;
//   outstanding: number;
// };

// type Payment = {
//   name: string;
//   unit: string;
//   amount: number;
//   due_date: string;
//   status: string;
// };

// type ChartData = {
//   month: string;
//   income: number;
// };

// export default function DashboardPage() {
//   const [stats, setStats] = useState<Stats | null>(null);
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [chartData, setChartData] = useState<ChartData[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* ===========================
//      FETCH DASHBOARD DATA
//   ============================ */
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get("/api/dashboard", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = res.data.data;

//         setStats(data.stats);
//         setPayments(data.payments);
//         setChartData(data.chart);
//       } catch (error: any) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) {
//     return <div className="p-10">Loading dashboard...</div>;
//   }

//   const statsUI = [
//     {
//       label: "Total Properties",
//       value: stats?.totalProperties,
//       icon: <Building2 size={18} />,
//       dark: true,
//     },
//     {
//       label: "Occupied Unit",
//       value: stats?.occupiedUnits,
//       icon: <Users size={18} />,
//       dark: true,
//     },
//     {
//       label: "Vacant Units",
//       value: stats?.vacantUnits,
//       icon: <Home size={18} />,
//       light: true,
//     },
//     {
//       label: "Monthly Rental Income",
//       value: `$${Number(stats?.totalIncome).toLocaleString()}`,
//       icon: <DollarSign size={18} />,
//       dark: true,
//     },
//     {
//       label: "Outstanding Payment",
//       value: `$${Number(stats?.outstanding).toLocaleString()}`,
//       icon: <AlertCircle size={18} />,
//       dark: true,
//     },
//   ];

//   const quickActions = [
//     { label: "Send Payment Reminders", icon: <Bell size={15} /> },
//     { label: "Create lease", icon: <FilePlus size={15} /> },
//     { label: "Add New Property", icon: <PlusSquare size={15} /> },
//     { label: "View Rent Payments", icon: <CreditCard size={15} /> },
//   ];

//   const statusStyle: Record<string, string> = {
//     Upcoming: "badge badge-blue",
//     Pending: "badge badge-yellow",
//     Overdue: "badge badge-red",
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-5">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-sm text-gray-500 mt-0.5">
//           Welcome Back! Here is your property review
//         </p>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-5 gap-3">
//         {statsUI.map((s, i) => (
//           <div
//             key={i}
//             className={`rounded-2xl p-4 ${
//               s.light
//                 ? "bg-white border border-gray-100 shadow-sm"
//                 : "bg-gray-900 text-white"
//             }`}
//           >
//             <div
//               className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
//                 s.light
//                   ? "bg-gray-100 text-gray-600"
//                   : "bg-gray-700 text-gray-300"
//               }`}
//             >
//               {s.icon}
//             </div>
//             <p
//               className={`text-xs font-medium mb-1 ${
//                 s.light ? "text-gray-500" : "text-gray-400"
//               }`}
//             >
//               {s.label}
//             </p>
//             <p className="text-xl font-bold">{s.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-5 gap-5">
//         {/* PAYMENTS */}
//         <div className="col-span-3 card p-5">
//           <h2 className="text-sm font-semibold text-gray-900 mb-4">
//             Upcoming Rent Payment
//           </h2>

//           <div className="space-y-3">
//             {payments.map((r, i) => {
//               const status =
//                 r.status.charAt(0).toUpperCase() + r.status.slice(1);

//               return (
//                 <div key={i} className="border rounded-xl p-3">
//                   <div className="flex justify-between mb-1">
//                     <span className="font-semibold">{r.name}</span>
//                     <span className="font-bold">
//                       ${Number(r.amount).toLocaleString()}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <div>
//                       <p className="text-xs text-gray-500">{r.unit}</p>
//                       <p className="text-xs text-gray-400">
//                         Due: {r.due_date}
//                       </p>
//                     </div>

//                     <span className={statusStyle[status]}>
//                       {status}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* QUICK ACTIONS */}
//         <div className="col-span-2 space-y-4">
//           <div className="card p-5">
//             <h2 className="text-sm font-semibold mb-3">
//               Quick Actions
//             </h2>

//             {quickActions.map((a) => (
//               <button
//                 key={a.label}
//                 className="w-full flex items-center gap-3 px-3 py-2.5 border rounded-xl text-sm hover:bg-gray-50"
//               >
//                 {a.icon}
//                 {a.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CHART */}
//       <div className="card p-5">
//         <h2 className="text-sm font-semibold mb-4">
//           Rental Income (Monthly Trend)
//         </h2>

//         <ResponsiveContainer width="100%" height={200}>
//           <BarChart data={chartData}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />

//             <Bar dataKey="income" fill="#ef4444" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }
