import { Download, ChevronLeft, ChevronRight, Search, ChevronDown } from 'lucide-react'

const payments = [
  { tenant: 'John Smith', property: 'Greenwood Apartment', unit: 'Unit 3B', amount: '$50,000', due: 'Jan 2026 - Dec 2027', paid: 'Jan 2026 - Dec 2027', method: 'Bank Transfer', status: 'Paid' },
  { tenant: 'John Smith', property: 'Greenwood Apartment', unit: 'Unit 3B', amount: '$50,000', due: 'Jan 2026 - Dec 2027', paid: '–', method: 'Cash', status: 'Overdue' },
  { tenant: 'John Smith', property: 'Greenwood Apartment', unit: 'Unit 3B', amount: '$50,000', due: 'Jan 2026 - Dec 2027', paid: '–', method: 'Credit Card', status: 'Due' },
  { tenant: 'John Smith', property: 'Greenwood Apartment', unit: 'Unit 3B', amount: '$50,000', due: 'Jan 2026 - Dec 2027', paid: 'Jan 2026 - Dec 2027', method: 'Bank Transfer', status: 'Paid' },
  { tenant: 'John Smith', property: 'Greenwood Apartment', unit: 'Unit 3B', amount: '$50,000', due: 'Jan 2026 - Dec 2027', paid: '–', method: 'Cash', status: 'Overdue' },
]

const statusStyle: Record<string, string> = {
  Paid: 'badge badge-green',
  Overdue: 'badge bg-red-500 text-white',
  Due: 'badge badge-dark',
}

const avatarColors = ['bg-orange-300', 'bg-blue-400', 'bg-teal-400', 'bg-purple-400', 'bg-pink-400']

export default function PaymentsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Rent & Payment</h1>
        <button className="btn-outline flex items-center gap-1.5">
          <Download size={14} className="text-green-600" />Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <button className="btn-outline flex items-center gap-1.5 py-2 text-xs">
          Select Property: Greenwood Apartment <ChevronDown size={12}/>
        </button>
        <button className="btn-outline flex items-center gap-1.5 py-2 text-xs">
          📅 Jan 01, 2026 – Jan 01, 2027 <ChevronDown size={12}/>
        </button>
      </div>

      {/* Summary banner */}
      <div className="bg-red-600 text-white rounded-2xl p-5 grid grid-cols-4 gap-4">
        {[
          { label: 'Total Rent Collected', value: '$2,500,000' },
          { label: 'Outstanding Amount', value: '$2,500,000' },
          { label: 'Overdue Payments', value: '$2,500,000', badge: '4' },
          { label: 'Payments This Month', value: '$2,500,000', badge: '2' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-xs font-medium text-red-200 mb-1">{s.label}</p>
            <div className="flex items-center justify-center gap-2">
              {s.badge && <span className="w-5 h-5 rounded-full bg-red-800 text-white text-xs flex items-center justify-center font-bold">{s.badge}</span>}
              <span className="text-base font-bold">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Rent Payment</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search" className="input pl-9 w-52" />
            </div>
            <button className="btn-outline flex items-center gap-1.5 text-xs py-2">All Status <ChevronDown size={12}/></button>
            <button className="btn-outline flex items-center gap-1.5 text-xs py-2">All Dates <ChevronDown size={12}/></button>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              {['Tenant', 'Property / Unit', 'Rent Amount', 'Due Date', 'Paid Date', 'Payment Method', 'Status'].map(h => (
                <th key={h} className="th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {payments.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="td">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold`}>J</div>
                    <span className="text-xs text-gray-700">{p.tenant}</span>
                  </div>
                </td>
                <td className="td">
                  <p className="text-xs font-medium text-gray-800">{p.property}</p>
                  <p className="text-xs text-gray-500">{p.unit}</p>
                </td>
                <td className="td font-semibold">{p.amount}</td>
                <td className="td text-xs text-gray-600">{p.due}</td>
                <td className="td text-xs text-gray-600">{p.paid}</td>
                <td className="td">
                  <div className="flex items-center gap-1.5 text-xs text-gray-700">
                    {p.method === 'Bank Transfer' && <span className="text-sm">🏦</span>}
                    {p.method === 'Cash' && <span className="text-sm">💵</span>}
                    {p.method === 'Credit Card' && <span className="text-sm">💳</span>}
                    {p.method}
                  </div>
                </td>
                <td className="td">
                  <span className={statusStyle[p.status] || 'badge badge-gray'}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-5 py-4 flex items-center justify-center gap-2 border-t border-gray-100">
          <button className="flex items-center gap-1 btn-outline text-xs py-2 px-4">
            <ChevronLeft size={13}/>Previous
          </button>
          <button className="flex items-center gap-1 btn-outline text-xs py-2 px-4">
            Next<ChevronRight size={13}/>
          </button>
        </div>
      </div>
    </div>
  )
}
