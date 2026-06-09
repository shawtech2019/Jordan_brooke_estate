import { useState } from 'react'
import { Eye, Pencil, MoreHorizontal, ChevronDown, ChevronRight, Mail, Phone, Save, Download, RefreshCw, X } from 'lucide-react'
import LandlordModal from '../../modal/LandlordModal'

const leases = [
  { id: 1, name: 'Sarrah Johnson', email: 'Sarrah@gmail.com', phone: '(155) 2678 9830', property: 'Greenwood Apartment', unit: 'Unit 3B', amount: '$5,000 / year', period: 'Jan 2026 - Dec 2027', status: 'Active', avatar: 'S', deposit: '$2,500', payHistory: [{ date: 'Jan 2026', amount: '$5,000', st: 'Paid' }, { date: 'Feb 2026', amount: '$5,000', st: 'Paid' }] },
  { id: 2, name: 'Rebacca Smalls', email: 'Rebacca@gmail.com', phone: '(155) 2678 9830', property: 'Greenwood Apartment', unit: 'Unit 3B', amount: '$5,000 / year', period: 'Jan 2026 - Dec 2027', status: 'Overdue', avatar: 'R', deposit: '$2,500', payHistory: [{ date: 'Jan 2026', amount: '$5,000', st: 'Paid' }, { date: 'Feb 2026', amount: '$5,000', st: 'Overdue' }] },
  { id: 3, name: 'Jay Willis', email: 'Jay@gmail.com', phone: '(155) 2678 9830', property: 'Greenwood Apartment', unit: 'Unit 3B', amount: '$5,000 / year', period: 'Jan 2026 - Dec 2027', status: 'Due', avatar: 'J', deposit: '$2,500', payHistory: [{ date: 'Jan 2026', amount: '$5,000', st: 'Paid' }] },
  { id: 4, name: 'John Smith', email: 'John@gmail.com', phone: '(155) 2678 9830', property: 'Greenwood Apartment', unit: 'Unit 3B', amount: '$5,000 / year', period: 'Draft Lease', status: 'pending', avatar: 'J', deposit: '$2,500', payHistory: [] },
]
type Lease = typeof leases[0]

const statusStyle: Record<string, string> = {
  Active: 'badge badge-green',
  Overdue: 'badge bg-red-500 text-white',
  Due: 'badge bg-yellow-400 text-yellow-900',
  pending: 'badge badge-blue',
}
const avatarColors = ['bg-orange-300','bg-blue-400','bg-green-400','bg-purple-400']

function ViewLeaseModal({ lease, onClose }: { lease: Lease; onClose: () => void }) {
  return (
    <LandlordModal title="Lease Details" onClose={onClose} size="lg">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <div className={`w-12 h-12 rounded-xl ${avatarColors[lease.id % avatarColors.length]} flex items-center justify-center text-white font-bold text-lg shrink-0`}>{lease.avatar}</div>
          <div>
            <p className="font-bold text-gray-900">{lease.name}</p>
            <p className="flex items-center gap-1.5 text-xs text-gray-500"><Mail size={11}/>{lease.email}</p>
            <p className="flex items-center gap-1.5 text-xs text-gray-500"><Phone size={11}/>{lease.phone}</p>
          </div>
          <span className={`ml-auto ${statusStyle[lease.status]}`}>{lease.status}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[['Property', lease.property],['Unit', lease.unit],['Rent Amount', lease.amount],['Security Deposit', lease.deposit],['Lease Period', lease.period],['Payment Status', lease.status]].map(([l,v])=>(
            <div key={String(l)} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 font-medium mb-0.5">{l}</p>
              <p className="text-sm font-bold text-gray-900">{v}</p>
            </div>
          ))}
        </div>
        {lease.payHistory.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Payment History</p>
            <table className="w-full text-sm border border-gray-100 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>{['Date','Amount','Status'].map(h=><th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-500">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lease.payHistory.map((p,i)=>(
                  <tr key={i}>
                    <td className="px-3 py-2 text-xs text-gray-600">{p.date}</td>
                    <td className="px-3 py-2 text-xs font-medium">{p.amount}</td>
                    <td className="px-3 py-2"><span className={`badge text-xs ${p.st==='Paid'?'badge-green':'badge-red'}`}>{p.st}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="btn-blue flex-1 py-2 flex items-center justify-center gap-1.5 text-sm"><Download size={13}/>PDF</button>
          <button onClick={onClose} className="btn-green flex-1 py-2 flex items-center justify-center gap-1.5 text-sm"><RefreshCw size={13}/>Renew</button>
          <button onClick={onClose} className="btn-red flex-1 py-2 flex items-center justify-center gap-1.5 text-sm"><X size={13}/>End Lease</button>
        </div>
      </div>
    </LandlordModal >
  )
}

function EditLeaseModal({ lease, onClose }: { lease: Lease; onClose: () => void }) {
  const [form, setForm] = useState({ name: lease.name, property: lease.property, unit: lease.unit, amount: lease.amount, period: lease.period, status: lease.status, deposit: lease.deposit })
  return (
    <LandlordModal title="Edit Lease" onClose={onClose} size="md">
      <div className="space-y-4">
        {([['Tenant Name','name'],['Property','property'],['Unit','unit'],['Rent Amount','amount'],['Security Deposit','deposit'],['Lease Period','period']] as [string, keyof typeof form][]).map(([label,key])=>(
          <div key={key}>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{label}</label>
            <input className="input" value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/>
          </div>
        ))}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Status</label>
          <select className="input" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
            {['Active','Overdue','Due','pending'].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={onClose} className="btn-outline flex-1 py-2.5">Cancel</button>
          <button onClick={onClose} className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2"><Save size={14}/>Save Changes</button>
        </div>
      </div>
    </LandlordModal >
  )
}

export default function LeasePage() {
  const [viewLease, setViewLease] = useState<Lease | null>(null)
  const [editLease, setEditLease] = useState<Lease | null>(null)

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Lease</h1>
      <div className="flex items-center gap-3 flex-wrap">
        {['Active Leases','Expiring soon','Draft leases','Sort'].map(f=>(
          <button key={f} className="btn-outline flex items-center gap-1.5 py-2 text-xs">{f}<ChevronDown size={12}/></button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium">Active Leases</span>
            <span className="badge badge-green px-2 py-0.5">20</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button className="btn-outline text-xs py-1 px-2 flex items-center gap-1">All Properties<ChevronDown size={11}/></button>
            <button className="btn-outline text-xs py-1 px-2 flex items-center gap-1">Tenant<ChevronDown size={11}/></button>
          </div>
        </div>
        <div className="card p-4 border-l-4 border-yellow-400">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium">Expiring soon</span>
            <div className="flex items-center gap-1">
              <span className="badge badge-yellow px-2 py-0.5">5</span>
              <ChevronRight size={13} className="text-gray-400"/>
            </div>
          </div>
          <p className="text-xs text-gray-500">🕐 3 leases expire within 60 days</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium">Draft Lease</span>
            <div className="flex items-center gap-1">
              <span className="badge badge-gray px-2 py-0.5">2</span>
              <ChevronRight size={13} className="text-gray-400"/>
            </div>
          </div>
        </div>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>{['Tenant','Property & Unit','Rent Amount','Lease Period','Rent Status','Actions'].map(h=><th key={h} className="th">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leases.map((l,i)=>(
              <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                <td className="td">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${avatarColors[i%avatarColors.length]} flex items-center justify-center text-white font-bold shrink-0`}>{l.avatar}</div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{l.name}</p>
                      <p className="flex items-center gap-1 text-xs text-gray-500"><Mail size={10}/>{l.email}</p>
                      <p className="flex items-center gap-1 text-xs text-gray-500"><Phone size={10}/>{l.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="td">
                  <p className="text-sm font-medium text-gray-800">{l.property}</p>
                  <p className="text-xs text-gray-500">{l.unit}</p>
                </td>
                <td className="td text-sm font-medium">{l.amount}</td>
                <td className="td text-sm text-gray-600">{l.period}</td>
                <td className="td"><span className={statusStyle[l.status]||'badge badge-gray'}>{['Active','pending'].includes(l.status)&&'✓ '}{l.status}</span></td>
                <td className="td">
                  <div className="flex items-center gap-1">
                    <button onClick={()=>setViewLease(l)} className="flex items-center gap-1 px-2 py-1.5 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"><Eye size={11}/>View</button>
                    <button onClick={()=>setEditLease(l)} className="flex items-center gap-1 px-2 py-1.5 border border-gray-200 rounded text-xs hover:bg-gray-50 transition-colors"><Pencil size={11}/>Edit</button>
                    <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50"><MoreHorizontal size={13} className="text-gray-400"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewLease && <ViewLeaseModal lease={viewLease} onClose={()=>setViewLease(null)}/>}
      {editLease && <EditLeaseModal lease={editLease} onClose={()=>setEditLease(null)}/>}
    </div>
  )
}
