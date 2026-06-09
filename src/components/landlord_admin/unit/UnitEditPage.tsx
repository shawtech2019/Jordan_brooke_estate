import { Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UnitEditPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Add / Edit Unit</h1>
      <div className="card p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Basic Information</h2>
          <div className="space-y-4">
            {[['Unit Number','A - 201'],['Floor','Select a Floor'],['Unit Type','1 Bedroom']].map(([l,p])=>(
              <div key={l} className="flex items-center gap-4">
                <label className="text-sm text-gray-600 w-36 shrink-0">{l}</label>
                <input type="text" defaultValue={p} className="input flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Basic Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-36 shrink-0">Rent Amount</label>
              <input type="text" defaultValue="$7,500" className="input flex-1" />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-36 shrink-0">Payment Frequency</label>
              <div className="flex gap-4">
                {['Monthly','Yearly'].map((o,i)=>(
                  <label key={o} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="freq" defaultChecked={i===1}
                      className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm text-gray-700">{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-36 shrink-0">Status</label>
              <div className="flex gap-3">
                {['Available','Rented'].map((s,i)=>(
                  <label key={s} className="flex items-center gap-2 cursor-pointer border border-gray-200 rounded-lg px-3 py-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${i===0?'bg-green-500':'bg-red-500'}`}/>
                    <span className="text-sm text-gray-700">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tenant */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Tenant</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-36 shrink-0">Tenant Name</label>
              <input type="text" defaultValue="John Smith" className="input flex-1" />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-36 shrink-0">Lease Start Date</label>
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1">
                  <input type="text" defaultValue="01/01/2026" className="input pr-9" />
                  <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <span className="text-gray-400">—</span>
                <div className="relative flex-1">
                  <input type="text" defaultValue="01/01/2027" className="input pr-9" />
                  <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
         <Link to={"units"}>
         <button className="btn-outline flex-1 py-2.5">Cancel</button>
         </Link>
          <button className="btn-blue flex-1 py-2.5">Save Unit</button>
        </div>
      </div>
    </div>
  )
}
