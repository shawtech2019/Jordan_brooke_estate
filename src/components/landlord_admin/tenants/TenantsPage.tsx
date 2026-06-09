import { useState } from 'react'
import { Eye, Pencil, MoreHorizontal, ChevronDown, Mail, Phone, Save } from 'lucide-react'
import LandlordModal from '../../modal/LandlordModal'


const tenants = [
  { id: 1, name: 'Sarrah Johnson', email: 'Sarrah@gmail.com', phone: '(155) 2678 9830', property: 'Greenwood Apartment', unit: 'Unit 3B', lease: 'Jan 2026 - Dec 2027', status: 'Paid', avatar: 'S', joined: 'Jan 2024', balance: '$0' },
  { id: 2, name: 'Rebacca Smalls', email: 'Rebacca@gmail.com', phone: '(155) 2678 9830', property: 'Greenwood Apartment', unit: 'Unit 3B', lease: 'Jan 2026 - Dec 2027', status: 'Overdue', avatar: 'R', joined: 'Mar 2024', balance: '$5,000' },
  { id: 3, name: 'Jay Willis', email: 'Jay@gmail.com', phone: '(155) 2678 9830', property: 'Greenwood Apartment', unit: 'Unit 3B', lease: 'Jan 2026 - Dec 2027', status: 'Due soon', avatar: 'J', joined: 'Jun 2024', balance: '$2,500' },
  { id: 4, name: 'John Smith', email: 'John@gmail.com', phone: '(155) 2678 9830', property: 'Greenwood Apartment', unit: 'Unit 3B', lease: 'Jan 2026 - Dec 2027', status: 'Paid', avatar: 'J', joined: 'Aug 2023', balance: '$0' },
]
type Tenant = typeof tenants[0]

const statusStyle: Record<string, string> = {
  Paid: 'badge badge-green',
  Overdue: 'badge bg-red-500 text-white',
  'Due soon': 'badge bg-yellow-500 text-white',
}
const avatarColors = ['bg-orange-300','bg-blue-400','bg-green-400','bg-purple-400']

function ViewTenantModal({ tenant, onClose }: { tenant: Tenant; onClose: () => void }) {
  return (
    <LandlordModal title="Tenant Details" onClose={onClose} size="md">
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className={`w-16 h-16 rounded-2xl ${avatarColors[tenant.id % avatarColors.length]} flex items-center justify-center text-white font-bold text-2xl shrink-0`}>{tenant.avatar}</div>
          <div>
            <h3 className="text-base font-bold text-gray-900">{tenant.name}</h3>
            <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5"><Mail size={13}/>{tenant.email}</p>
            <p className="flex items-center gap-1.5 text-sm text-gray-500"><Phone size={13}/>{tenant.phone}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[['Property', tenant.property],['Unit', tenant.unit],['Lease Period', tenant.lease],['Member Since', tenant.joined],['Rent Status', tenant.status],['Outstanding', tenant.balance]].map(([l,v])=>(
            <div key={String(l)} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 font-medium mb-0.5">{l}</p>
              <p className="text-sm font-bold text-gray-900">{v}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="btn-outline flex-1 py-2.5">Close</button>
          <button onClick={onClose} className="btn-primary flex-1 py-2.5">Send Message</button>
        </div>
      </div>
    </LandlordModal>
  )
}

function EditTenantModal({ tenant, onClose }: { tenant: Tenant; onClose: () => void }) {
  const [form, setForm] = useState({ name: tenant.name, email: tenant.email, phone: tenant.phone, property: tenant.property, unit: tenant.unit })
  return (
    <LandlordModal title="Edit Tenant" onClose={onClose} size="md">
      <div className="space-y-4">
        {([['Full Name','name'],['Email Address','email'],['Phone Number','phone'],['Property','property'],['Unit','unit']] as [string, keyof typeof form][]).map(([label,key])=>(
          <div key={key}>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{label}</label>
            <input className="input" value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/>
          </div>
        ))}
        <div className="flex gap-2 pt-2">
          <button onClick={onClose} className="btn-outline flex-1 py-2.5">Cancel</button>
          <button onClick={onClose} className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2"><Save size={14}/>Save Changes</button>
        </div>
      </div>
    </LandlordModal>
  )
}

export default function TenantsPage() {
  const [viewTenant, setViewTenant] = useState<Tenant | null>(null)
  const [editTenant, setEditTenant] = useState<Tenant | null>(null)

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
      <div className="flex items-center gap-3 flex-wrap">
        {['All Tenants','Property','Unit','Rent Status','Lease Expiry'].map(f=>(
          <button key={f} className="btn-outline flex items-center gap-1.5 py-2 text-xs">{f}<ChevronDown size={12}/></button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {[{label:'Paid',cls:'bg-green-100 text-green-700',dot:'bg-green-500'},{label:'Due soon',cls:'bg-yellow-100 text-yellow-700',dot:'bg-yellow-500'},{label:'Overdue',cls:'bg-red-100 text-red-700',dot:'bg-red-500'},{label:'Lease Expiring',cls:'bg-orange-100 text-orange-700',dot:'bg-orange-500'}].map(l=>(
          <span key={l.label} className={`badge gap-1.5 ${l.cls}`}><span className={`w-2 h-2 rounded-full ${l.dot}`}/>{l.label}</span>
        ))}
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>{['Tenant','Property & Unit','Lease','Rent Status','Actions'].map(h=><th key={h} className="th">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tenants.map((t,i)=>(
              <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                <td className="td">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${avatarColors[i%avatarColors.length]} flex items-center justify-center text-white font-bold text-lg shrink-0`}>{t.avatar}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5"><Mail size={10}/>{t.email}</p>
                      <p className="flex items-center gap-1 text-xs text-gray-500"><Phone size={10}/>{t.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="td">
                  <p className="text-sm font-medium text-gray-800">{t.property}</p>
                  <p className="text-xs text-gray-500">{t.unit}</p>
                </td>
                <td className="td text-sm text-gray-600">{t.lease}</td>
                <td className="td"><span className={statusStyle[t.status]||'badge badge-gray'}>{t.status==='Paid'?'✓ ':'⚠ '}{t.status}</span></td>
                <td className="td">
                  <div className="flex items-center gap-1">
                    <button onClick={()=>setViewTenant(t)} className="flex items-center gap-1 px-2 py-1.5 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"><Eye size={11}/>View</button>
                    <button onClick={()=>setEditTenant(t)} className="flex items-center gap-1 px-2 py-1.5 border border-gray-200 rounded text-xs hover:bg-gray-50 transition-colors"><Pencil size={11}/>Edit</button>
                    <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50"><MoreHorizontal size={13} className="text-gray-400"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewTenant && <ViewTenantModal tenant={viewTenant} onClose={()=>setViewTenant(null)}/>}
      {editTenant && <EditTenantModal tenant={editTenant} onClose={()=>setEditTenant(null)}/>}
    </div>
  )
}
