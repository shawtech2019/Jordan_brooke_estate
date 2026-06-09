import { useState } from 'react'
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

const allRequests = [
  { id: 1, title: 'Leaking Faucet', desc: 'Kitchen faucet is Leaking underneath the sink', date: '09/21/2027', priority: 'High', status: 'In Progress' },
  { id: 2, title: 'Broken Light', desc: 'The light in the hallway is broken', date: '09/21/2027', priority: 'Medium', status: 'Open' },
  { id: 3, title: 'Clogged Toilet', desc: 'Toilet is clogged and not flushing', date: '09/21/2027', priority: 'High', status: 'Completed' },
  { id: 4, title: 'AC Not Cooling', desc: 'Air conditioning unit is blowing warm air', date: '09/21/2027', priority: 'Low', status: 'In Progress' },
  { id: 5, title: 'Garbage Disposal Jammed', desc: 'The garbage disposal is jammed and not working', date: '09/21/2027', priority: 'Medium', status: 'Completed' },
]

const priorityColors: Record<string, string> = {
  High: 'badge badge-red',
  Medium: 'badge badge-yellow',
  Low: 'badge badge-green',
}

const statusColors: Record<string, string> = {
  'In Progress': 'badge badge-blue',
  Open: 'badge badge-green',
  Completed: 'badge badge-gray',
}

export default function MaintenancePage() {
  const [search, setSearch] = useState('')

  const filtered = allRequests.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-gray-900">Maintenance Requests</h1>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <button className="btn-outline flex items-center gap-1.5">
          All Requests <ChevronDown size={14} />
        </button>
        <button className="btn-outline flex items-center gap-1.5">
          Priority <ChevronDown size={14} />
        </button>
        <button className="btn-outline flex items-center gap-1.5">
          Status <ChevronDown size={14} />
        </button>
        <div className="relative ml-auto">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="bg-gray-900 text-white px-5 py-3 flex items-center justify-between">
          <span className="text-sm font-semibold">Maintenance Requests</span>
          <button className="bg-white text-gray-900 text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            Submit New Request
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title + Description</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Submitted</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((req) => (
              <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-gray-900">{req.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{req.desc}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-xs text-gray-600">{req.date}</p>
                  <p className="text-xs text-gray-400">{req.date}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={priorityColors[req.priority]}>{req.priority}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={statusColors[req.status]}>{req.status}</span>
                </td>
                <td className="px-4 py-4">
                  <button className="text-xs font-semibold text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-5 py-3 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100">
          <span>Showing 1-3 of 5</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-900 text-white text-xs font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 transition-colors text-xs">2</button>
            <button className="flex items-center gap-1 px-3 h-8 rounded border border-gray-200 hover:bg-gray-50 transition-colors text-xs">
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
