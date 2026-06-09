import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const transactions = [
  { month: 'Mar 2026', desc: 'Paid on 05 Mar Via bank transfer', status: 'Paid' },
  { month: 'Feb 2026', desc: 'Paid', status: 'Paid' },
]

const pieData = [
  { name: 'Paid', value: 65 },
  { name: 'Remaining', value: 35 },
]

export default function RentPaymentPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900">Financial Wellness Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Rent and Payment</p>
      </div>

      <div className="card p-8">
        {/* Donut chart */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-56 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  <Cell fill="#e5383b" />
                  <Cell fill="#e5e7eb" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-display font-bold text-gray-900">65%</span>
              <span className="text-xs text-gray-500 text-center leading-tight">of<br/>Current Lease<br/>Paid</span>
            </div>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3>
          {transactions.map((t) => (
            <div key={t.month} className="flex items-center justify-between py-3 border-b border-gray-50">
              <div>
                <span className="text-sm text-gray-700 font-medium">{t.month} rent</span>
                {t.desc !== 'Paid' && (
                  <span className="text-sm text-gray-500"> - {t.desc}</span>
                )}
              </div>
              <span className="badge badge-green px-3 py-1">{t.status}</span>
            </div>
          ))}
        </div>

        {/* Pay Now */}
        <button className="w-full bg-[#e5383b] hover:bg-[#e5383b]/70 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
          Pay Now
        </button>

        {/* Quick Actions */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            <button className="btn-outline text-center py-2.5">View Payment History</button>
            <button className="btn-outline text-center py-2.5">Set Up Auto-Pay</button>
            <button className="btn-outline text-center py-2.5">Download</button>
          </div>
        </div>
      </div>
    </div>
  )
}
