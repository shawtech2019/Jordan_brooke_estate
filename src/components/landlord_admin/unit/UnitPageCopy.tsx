import { useState } from 'react'
import { Eye, Pencil, MoreHorizontal, ChevronRight, Plus, Save, Calendar } from 'lucide-react'
import LandlordModal from '../../modal/LandlordModal';
import { Link } from 'react-router-dom';


const units = [
  { id: 1, no: 'A-101', rent: '$3,000', tenant: '-', status: 'Available', floor: '1st', type: '1 Bedroom', freq: 'Monthly', leaseStart: '', leaseEnd: '' },
  { id: 2, no: 'C-101', rent: '$5,500', tenant: '-', status: 'Available', floor: '1st', type: '2 Bedroom', freq: 'Monthly', leaseStart: '', leaseEnd: '' },
  { id: 3, no: 'A-102', rent: '$7,500', tenant: 'John Smith', status: 'Rented', floor: '1st', type: '3 Bedroom', freq: 'Yearly', leaseStart: '01/01/2026', leaseEnd: '01/01/2027' },
  { id: 4, no: 'B-201', rent: '$1,050', tenant: 'Karl Earl', status: 'Rented', floor: '2nd', type: '1 Bedroom', freq: 'Monthly', leaseStart: '03/01/2026', leaseEnd: '03/01/2027' },
]
type Unit = typeof units[0]

function ViewUnitModal({ unit, onClose }: { unit: Unit; onClose: () => void }) {
  return (
    <LandlordModal title="Unit Details" onClose={onClose} size="md">
      <div className="space-y-4">
        <div className="bg-gray-900 text-white rounded-xl p-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold">{unit.no}</span>
            <span className={`badge ${unit.status==='Available'?'badge-green':'badge-red'}`}>{unit.status}</span>
          </div>
          <p className="text-xl font-bold">{unit.rent} <span className="text-sm font-normal text-gray-400">/ {unit.freq==='Yearly'?'Year':'Month'}</span></p>
          <p className="text-xs text-gray-400 mt-1">Greenfield Apartments</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[['Floor', unit.floor],['Unit Type', unit.type],['Payment', unit.freq],['Rent Amount', unit.rent]].map(([l,v])=>(
            <div key={String(l)} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 font-medium mb-0.5">{l}</p>
              <p className="text-sm font-bold text-gray-900">{v}</p>
            </div>
          ))}
        </div>
        {unit.tenant !== '-' && (
          <div className="border border-gray-100 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant & Lease</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-300 flex items-center justify-center text-white font-bold">{unit.tenant[0]}</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{unit.tenant}</p>
                <p className="text-xs text-gray-400">{unit.leaseStart} → {unit.leaseEnd}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="btn-outline flex-1 py-2.5">Close</button>
          <button onClick={onClose} className="btn-primary flex-1 py-2.5">View Lease</button>
        </div>
      </div>
    </LandlordModal>
  )
}

function EditUnitModal({ unit, onClose }: { unit: Unit; onClose: () => void }) {
  const [form, setForm] = useState({ no: unit.no, floor: unit.floor, type: unit.type, rent: unit.rent, freq: unit.freq, status: unit.status, tenant: unit.tenant === '-' ? '' : unit.tenant, leaseStart: unit.leaseStart, leaseEnd: unit.leaseEnd })
  return (
    <LandlordModal title="Edit Unit" onClose={onClose} size="md">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {([['Unit Number','no'],['Floor','floor'],['Unit Type','type'],['Rent Amount','rent']] as [string, keyof typeof form][]).map(([label,key])=>(
            <div key={key}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{label}</label>
              <input className="input" value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/>
            </div>
          ))}
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Payment Frequency</label>
          <div className="flex gap-4">
            {['Monthly','Yearly'].map(o=>(
              <label key={o} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="freq" checked={form.freq===o} onChange={()=>setForm({...form,freq:o})} className="accent-blue-600"/>
                <span className="text-sm text-gray-700">{o}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Status</label>
          <div className="flex gap-3">
            {['Available','Rented'].map((s,i)=>(
              <label key={s} className={`flex items-center gap-2 cursor-pointer border rounded-lg px-3 py-2 transition-colors ${form.status===s?'border-gray-900 bg-gray-50':'border-gray-200'}`}>
                <span className={`w-2.5 h-2.5 rounded-full ${i===0?'bg-green-500':'bg-red-500'}`}/>
                <span className="text-sm text-gray-700">{s}</span>
                <input type="radio" name="status" checked={form.status===s} onChange={()=>setForm({...form,status:s})} className="sr-only"/>
              </label>
            ))}
          </div>
        </div>
        {form.status==='Rented' && (
          <div className="space-y-3 border-t border-gray-100 pt-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant Info</p>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Tenant Name</label>
              <input className="input" value={form.tenant} onChange={e=>setForm({...form,tenant:e.target.value})} placeholder="Tenant name"/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {([['leaseStart','Lease Start'],['leaseEnd','Lease End']] as [keyof typeof form, string][]).map(([key,label])=>(
                <div key={key}>
                  <label className="text-xs text-gray-500 block mb-1">{label}</label>
                  <div className="relative">
                    <input className="input pr-8" value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder="MM/DD/YYYY"/>
                    <Calendar size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2 pt-2">
          <button onClick={onClose} className="btn-outline flex-1 py-2.5">Cancel</button>
          <button onClick={onClose} className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2"><Save size={14}/>Save Unit</button>
        </div>
      </div>
    </LandlordModal>
  )
}

export default function UnitsPage() {
  const [viewUnit, setViewUnit] = useState<Unit | null>(null)
  const [editUnit, setEditUnit] = useState<Unit | null>(null)

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Unit Management</h1>
        <Link to={"unit-edit"}>
        <button className="btn-green flex items-center gap-1.5"><Plus size={15}/>Add Unit</button>
        </Link>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        {['Properties','Greenfield Apartment','Units'].map((b,i,arr)=>(
          <span key={b} className="flex items-center gap-1.5">
            <span className={i===arr.length-1?'text-gray-900 font-medium':'hover:text-gray-700 cursor-pointer'}>{b}</span>
            {i<arr.length-1&&<ChevronRight size={13}/>}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        {['All','Available','Rented'].map((t,i)=>(
          <button key={t} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${i===0?'bg-green-600 text-white':'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{t}</button>
        ))}
        <input type="text" placeholder="Search by Units Number / Tenant Name" className="input max-w-xs"/>
        <select className="input w-44"><option>Sort by : Unit Number</option></select>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>{['Unit No.','Rent Amount','Tenant Name','Status','Actions'].map(h=><th key={h} className="th">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {units.map(u=>(
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="td font-medium">{u.no}</td>
                <td className="td">{u.rent}</td>
                <td className="td text-gray-500">{u.tenant}</td>
                <td className="td"><span className={`badge ${u.status==='Available'?'badge-green':'badge-red'}`}>{u.status}</span></td>
                <td className="td">
                  <div className="flex items-center gap-1">
                    <button onClick={()=>setViewUnit(u)} className="flex items-center gap-1 px-2 py-1.5 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"><Eye size={11}/>View</button>
                    <button onClick={()=>setEditUnit(u)} className="flex items-center gap-1 px-2 py-1.5 border border-gray-200 rounded text-xs hover:bg-gray-50 transition-colors"><Pencil size={11}/>Edit</button>
                    <button className="p-1.5 border border-gray-200 rounded"><MoreHorizontal size={13} className="text-gray-400"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="card p-5 bg-gray-900 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">A-201</span>
            <span className="badge badge-red">Rented</span>
          </div>
          <p className="text-lg font-bold">$7,500 / <span className="text-sm font-normal text-gray-400">Year</span></p>
          <p className="text-xs text-gray-400 mt-1">Greenfield Apartments</p>
          <div className="mt-4 border-t border-gray-700 pt-4">
            <p className="text-xs font-semibold text-gray-300 mb-3">Tenants & Lease Info</p>
            {['Tenant :','Lease Period :','Rent Due :'].map(l=><p key={l} className="text-xs text-gray-400 mb-1">{l}</p>)}
           <Link to={"lease-detail"}>
           <button className="mt-3 btn-blue text-xs w-full py-2 text-center">View Lease</button>
           </Link>
          </div>
        </div>
        <div className="card p-5 flex items-center justify-center text-gray-400 text-sm">Unit Details</div>
      </div>
      {viewUnit && <ViewUnitModal unit={viewUnit} onClose={()=>setViewUnit(null)}/>}
      {editUnit && <EditUnitModal unit={editUnit} onClose={()=>setEditUnit(null)}/>}
    </div>
  )
}
