import { RefreshCw, Eye, Download} from 'lucide-react';

const maintenanceItems = [
  { title: 'Leaking Faucet', date: '09/05/2027', priority: 'High', status: 'In Progress' },
  { title: 'Broken Pipe', date: '05/11/2026', priority: 'Fixed', status: 'Open' },
  { title: 'Broken Light', date: '05/11/2026', priority: 'Medium', status: 'In Progress' },
]

const announcements = [
  {
    title: 'Pool Maintenance this Saturday',
    date: 'Oct 1',
    desc: 'The pool will be closed for cleaning.',
  },
  {
    title: 'Reminder: Parking rule',
    desc: 'Make sure you\'re parked in your designated spot.',
  },
]

const documents = [
  { name: 'Lease Agreement', icon: '📄' },
  { name: 'Read Receipt', icon: '📋' },
  { name: 'House Rules', icon: '🏠' },
  { name: 'Notice to Tenant', icon: '📢' },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'In Progress': 'badge badge-blue',
    'Open': 'badge badge-green',
    'Completed': 'badge badge-gray',
  }
  return <span className={map[status] || 'badge badge-gray'}>{status}</span>
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    'High': 'badge badge-red',
    'Medium': 'badge badge-yellow',
    'Fixed': 'badge badge-green',
    'Low': 'badge badge-gray',
  }
  return <span className={map[priority] || 'badge badge-gray'}>{priority}</span>
}

export default function DashboardPage() {
  return (
        <div className="max-w-5xl mx-auto space-y-5 font-dm-sans ">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-roboto font-bold text-gray-900">
          Welcome, <span className="text-[#e5383b] font-dm-sans">John</span>
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Apartment 5C Unit 12 &nbsp;·&nbsp;
          <span className="text-green-600 font-medium">Active Lease</span>
          &nbsp;Ends :&nbsp;
          <span className="text-[#e5383b] font-medium">09-01-2020</span>
          &nbsp;&nbsp;
          <button className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full hover:bg-blue-700 transition-colors">
            <RefreshCw size={11} />
            Renew Lease
          </button>
        </p>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5 bg-gray-900 text-white">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Rent Due</p>
          <p className="text-2xl font-display font-bold mt-1">$1000</p>
          <p className="text-xs text-gray-400 mt-0.5">Due — By Dec 2027</p>
          <button className="mt-4 w-full bg-[#e5383b] hover:bg-[#e5383b]/80 text-white text-sm font-medium py-2 rounded-lg transition-colors">
            Pay Now
          </button>
        </div>

        <div className="card p-5 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Lease Status</p>
          <span className="mt-2 badge badge-green text-sm px-4 py-1.5">Active</span>
        </div>

        <div className="card p-5 bg-gray-900 text-white">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Next Payment</p>
          <p className="text-sm text-gray-300 mt-0.5">Nov 5</p>
          <p className="text-2xl font-display font-bold mt-0.5">$300</p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Auto-pay ON
          </div>
        </div>
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-5 gap-4">
        {/* Rents & Payments */}
        <div className="card p-5 col-span-3 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Rents and payments</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="text-gray-500">Current Balance</span>
              <span className="font-semibold text-gray-900">: $1000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Payment</span>
              <span className="font-semibold text-gray-900">: $850 &nbsp; On Dec, 2027</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-medium text-gray-900 flex items-center gap-1.5">
                :
                <span className="inline-flex items-center gap-1 border border-gray-200 rounded px-2 py-0.5 text-xs">
                  💳 Visa ****2345
                </span>
              </span>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button className="btn-primary flex-1 text-center">Pay Rent</button>
            <button className="btn-outline flex-1 text-center">Payment History</button>
            <button className="btn-outline flex-1 text-center">Set up Auto-Pay</button>
          </div>
        </div>

        {/* Messages */}
        <div className="card p-5 col-span-2">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Messages</h2>
          <div className="grid grid-cols-2 gap-2">
            {documents.map((doc) => (
              <div key={doc.name} className="border border-gray-100 rounded-xl p-3 space-y-2">
                <div className="text-xl">{doc.icon}</div>
                <p className="text-xs font-medium text-gray-700 leading-tight">{doc.name}</p>
                <div className="flex gap-2">
                  <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                    <Eye size={11} />View
                  </button>
                  <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                    <Download size={11} />Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-5 gap-4">
        {/* Maintenance */}
        <div className="card p-5 col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Maintenance & Request</h2>
          </div>
          <div className="space-y-3">
            {maintenanceItems.map((item) => (
              <div key={item.title} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 w-32 truncate">{item.title}</span>
                <span className="text-gray-400 text-xs">{item.date}</span>
                <PriorityBadge priority={item.priority} />
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
          <button className="mt-4 w-full border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            Submit New Request
          </button>
        </div>

        {/* Announcements */}
        <div className="card p-5 col-span-2">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Announcements</h2>
          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a.title} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-800">{a.title}</p>
                  {a.date && <span className="text-xs text-gray-400">{a.date}</span>}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
