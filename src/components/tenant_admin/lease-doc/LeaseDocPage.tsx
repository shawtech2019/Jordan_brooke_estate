import { Download, Eye, ArrowRight } from 'lucide-react'

const docs = [
  { name: 'Lease Agreement', date: '09/05/2027' },
  { name: 'House Rules', date: '05/11/2026' },
  { name: 'Notice to Tenant', date: '05/11/2026' },
]

const announcements = [
  {
    title: 'Pool Maintenance this Saturday',
    subtitle: 'Status Report',
    date: 'Dec 1',
    detail: 'Closed from Sep 30 - oct 30 at 13:00',
  },
  {
    title: 'House rule',
    subtitle: 'Updated Sep 04, 2027',
    date: 'Sep 06, 2027',
  },
]

export default function LeaseDocPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <h1 className="text-2xl font-display font-bold text-gray-900">My Lease</h1>

      <div className="grid grid-cols-3 gap-5">
        {/* Main lease card */}
        <div className="col-span-2 space-y-4">
          <div className="card p-6">
            {/* Header */}
            <div className="mb-5">
              <p className="text-sm text-gray-500">Lakeside Apartments - Unit 13c</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="badge badge-green px-3 py-1 text-xs">Active Lease</span>
                <span className="text-sm text-gray-600">Ends : Dec 31, 2027</span>
              </div>
            </div>

            {/* Lease Details */}
            <div className="bg-gray-900 text-white rounded-xl p-4 mb-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Lease Details</h3>
                <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  View All <ArrowRight size={12} />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  ['Lease Dates', 'On Dec, 2027  →  On Dec, 2027'],
                  ['Monthly Rent', '$3,400 per month'],
                  ['Security Deposit', '$2,100'],
                  ['Payment Method', 'Visa  ****2345'],
                  ['Auto-pay', 'On   Next Payment :  On Dec, 2027'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400">{label} :</span>
                    <span className="text-gray-100 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full btn-primary py-2.5 flex items-center justify-center gap-2 rounded-xl">
              <Download size={15} />
              Download Lease Agreement (PDF)
            </button>
          </div>

          {/* Lease Documents */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Lease Documents</h3>
              <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                View All <ArrowRight size={12} />
              </button>
            </div>
            <div className="space-y-2">
              {docs.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-400">{doc.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-outline text-xs py-1.5 flex items-center gap-1">
                      <Eye size={12} /> View
                    </button>
                    <button className="btn-primary text-xs py-1.5 flex items-center gap-1">
                      <Download size={12} /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Property Manager */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Property Manager</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white font-bold text-lg">
                J
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">John Smith</p>
                <p className="text-xs text-gray-500">Property Manager</p>
              </div>
            </div>
            <div className="space-y-1 text-xs text-gray-600 mb-4">
              <p>(234) 1234 675 1256</p>
              <p>Johnsmith.01@email.com</p>
            </div>
            <button className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
              Send Message
            </button>
          </div>

          {/* Announcements */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Announcements</h3>
              <button className="text-xs text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.title} className="border-b border-gray-50 pb-3 last:border-0">
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold text-gray-800">{a.title}</p>
                    {a.date && <span className="text-xs text-gray-400 ml-2 shrink-0">{a.date}</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{a.subtitle}</p>
                  {a.detail && <p className="text-xs text-gray-400">{a.detail}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
