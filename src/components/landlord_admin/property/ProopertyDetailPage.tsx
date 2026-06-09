import { MapPin, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'

const tabs = ['Overview', 'Unit', 'Tenants', 'Images & Media', 'Financials']
const incomeData = [
  {m:'Jan',v:5000},{m:'Feb',v:8000},{m:'Mar',v:11000},{m:'Apr',v:9000},{m:'May',v:20000}
]

export default function PropertyDetailPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="card p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Greenwood Apartments</h1>
            <p className="text-sm text-gray-500">Austin, TX</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-outline flex items-center gap-1.5"><Pencil size={14}/>Edit Property</button>
            <button className="btn-outline flex items-center gap-1.5"><Pencil size={14}/>Actions</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-5">
          {tabs.map((t, i) => (
            <button key={t} className={`px-4 py-2.5 text-sm font-medium transition-colors ${i===0 ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>{t}</button>
          ))}
        </div>

        <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Property Summary</h2>

        <div className="grid grid-cols-5 gap-5">
          {/* Left: property info */}
          <div className="col-span-3 space-y-4">
            <div className="flex gap-4">
              <div className="w-40 h-32 rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center text-4xl shrink-0">🏘️</div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Greenwood Apartments</h3>
                <p className="text-sm text-gray-500">Austin, TX</p>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <MapPin size={13} className="text-gray-400" />
                  <span>1234 W 5th Ave, Austin, TX 78703</span>
                </div>
                <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800">View on Map</button>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[['Total Units','120'],['Occupancy Rate','96%'],['Property Type','Apartment Building']].map(([l,v])=>(
                    <div key={l}>
                      <p className="text-xs text-gray-400">{l}</p>
                      <p className="text-sm font-semibold text-gray-900">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Units table shortcut */}
            <Link to={"units"}>
            <button className="w-full btn-outline py-2.5 text-center text-sm">
              → View Units
            </button>
            </Link>
          </div>

          {/* Right: occupancy + income summary */}
          <div className="col-span-2 space-y-4">
            <div className="border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-700 mb-3">Occupancy Summary</h3>
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-20">
                  <PieChart width={80} height={80}>
                    <Pie data={[{v:95},{v:5}]} cx={35} cy={35} innerRadius={25} outerRadius={35} dataKey="v" strokeWidth={0}>
                      <Cell fill="#ef4444" /><Cell fill="#e5e7eb" />
                    </Pie>
                  </PieChart>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-900">95%</span>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-gray-600"><span className="font-semibold text-gray-900">114</span> Occupied</p>
                  <p className="text-gray-600"><span className="font-semibold text-gray-900">6</span> Vacant</p>
                  <p className="text-gray-600"><span className="font-semibold text-gray-900">95%</span> Occupancy Rate</p>
                </div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-gray-700">Income Summary</h3>
                <span className="text-xs text-gray-400">Last 30 Days</span>
              </div>
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={incomeData} margin={{top:0,right:0,left:0,bottom:0}}>
                  <Area type="monotone" dataKey="v" stroke="#ef4444" fill="#fecaca" strokeWidth={2} dot={false}/>
                  <Tooltip contentStyle={{fontSize:11,borderRadius:6}} formatter={(value: unknown) => `$${Number(value).toLocaleString()}`}/>
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[['Total Income','$122,000'],['Rent Income','$82,000'],['Other Income','$30,000']].map(([l,v])=>(
                  <div key={l}>
                    <p className="text-xs text-gray-400">{l}</p>
                    <p className="text-xs font-semibold text-gray-900">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
