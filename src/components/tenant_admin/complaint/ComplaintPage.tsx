import { useState } from 'react'
import { ChevronDown, ChevronRight} from 'lucide-react'

const complaints = [
  { id: 1, date: 'Apr 7 2026', category: 'Noise', subject: 'Loud Music and shouting late at night', status: 'In Progress' },
  { id: 2, date: 'Apr 7 2026', category: 'Safety', subject: 'Broken Lock in main entrance door', status: 'Open' },
  { id: 3, date: 'Apr 7 2026', category: 'Maintenance', subject: 'Leaky Faucet in the Kitchen', status: 'Resolved' },
  { id: 4, date: 'Apr 7 2026', category: 'Pest Control', subject: 'Ants and roaches in the kitchen', status: 'Resolved' },
  { id: 5, date: 'Apr 7 2026', category: 'Noise', subject: 'Loud Music and shouting late at night', status: 'Open' },
]

const tabs = ['All Complaints', 'Open', 'In Progress', 'Resolve', 'Archive']

const statusColors: Record<string, string> = {
  'In Progress': 'badge badge-blue',
  Open: 'badge badge-gray bg-gray-800 text-white',
  Resolved: 'badge badge-green',
}

const selectedComplaint = {
  name: 'John Smith',
  email: 'JohnSmith@gmail.com',
  phone: '(243) 7865 9087',
  status: 'Open',
  submittedAt: 'Apr 7, 2026 at 11:49 AM',
  subject: 'Loud music and shouting late at night',
  body: 'There have been loud music and shouting past midnight in unit 2C. It\'s becoming a serious disturbance',
}

export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState('All Complaints')
  const [selected, setSelected] = useState<number | null>(1)

  const filtered = activeTab === 'All Complaints'
    ? complaints
    : complaints.filter(c => c.status === activeTab || (activeTab === 'Resolve' && c.status === 'Resolved'))

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-gray-900">Complaints</h1>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {/* Left: Table */}
        <div className="col-span-3 card overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-gray-900 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-50">
            <button className="btn-outline text-xs py-1.5 flex items-center gap-1">Category <ChevronDown size={12} /></button>
            <button className="btn-outline text-xs py-1.5 flex items-center gap-1">Status <ChevronDown size={12} /></button>
            <button className="btn-outline text-xs py-1.5 flex items-center gap-1">Sort <ChevronDown size={12} /></button>
            <button className="btn-outline text-xs py-1.5 flex items-center gap-1">Search <ChevronDown size={12} /></button>
            <button className="btn-primary ml-auto text-xs py-1.5">New Complaint</button>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-4 gap-2 px-5 py-2.5 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Date</span>
            <span>Category</span>
            <span>Subject</span>
            <span>Status</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`w-full grid grid-cols-4 gap-2 px-5 py-3.5 text-left hover:bg-gray-50 transition-colors items-center ${selected === c.id ? 'bg-blue-50/50' : ''}`}
              >
                <span className="text-xs text-gray-600 whitespace-nowrap">{c.date}</span>
                <span className="text-xs text-gray-700 font-medium">{c.category}</span>
                <span className="text-xs text-gray-600 truncate">{c.subject}</span>
                <div className="flex items-center justify-between">
                  <span className={statusColors[c.status] || 'badge badge-gray'}>{c.status}</span>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>View 1 of 4 of 7 entries</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">Prev</button>
              <button className="w-6 h-6 flex items-center justify-center rounded bg-gray-900 text-white text-xs">1</button>
              <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">2</button>
              <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">3</button>
              <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>

        {/* Right: Detail panel */}
        <div className="col-span-2 card p-5 space-y-4 h-fit">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
              J
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{selectedComplaint.name}</p>
              <p className="text-xs text-gray-500">{selectedComplaint.email}</p>
              <p className="text-xs text-gray-500">{selectedComplaint.phone}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <span className="badge badge-gray bg-gray-800 text-white">{selectedComplaint.status}</span>
            <p className="text-xs font-semibold text-gray-700">Complaint Submitted</p>
            <p className="text-xs text-gray-500">{selectedComplaint.submittedAt}</p>
            <p className="text-sm font-semibold text-gray-900">{selectedComplaint.subject}</p>
            <p className="text-xs text-gray-600 leading-relaxed">{selectedComplaint.body}</p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Subject</p>
            <input
              type="text"
              placeholder="Type a comment"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
              In Progress
            </button>
            <button className="flex-1 bg-green-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors">
              Resolved
            </button>
          </div>

          <button className="w-full btn-outline text-xs py-2">Archive</button>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 pt-1">
            <button className="text-xs text-gray-500 px-2 py-1 hover:bg-gray-50 rounded">Prev</button>
            <button className="w-6 h-6 flex items-center justify-center rounded bg-gray-900 text-white text-xs">1</button>
            <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-xs hover:bg-gray-50">2</button>
            <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-xs hover:bg-gray-50">3</button>
            <button className="text-xs text-gray-500 px-2 py-1 hover:bg-gray-50 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
