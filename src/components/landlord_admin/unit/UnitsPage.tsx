import { useState, useMemo } from 'react'
import {
  Eye, Pencil, MoreHorizontal, ChevronRight, Plus, Save,
  Calendar, Search, ChevronDown, Home, User, DollarSign,
  CheckCircle2, XCircle, Building2, Layers, BedDouble,
  Phone, Mail,
} from 'lucide-react'
import LandlordModal from '../../modal/LandlordModal'


// ─── Data ──────────────────────────────────────────────────────────────────

interface Unit {
  id: number
  no: string
  rent: string
  rentNum: number
  tenant: string
  tenantEmail: string
  tenantPhone: string
  status: 'Available' | 'Rented'
  floor: string
  type: string
  freq: string
  leaseStart: string
  leaseEnd: string
  property: string
  size: string
  notes: string
}

const INITIAL_UNITS: Unit[] = [
  { id: 1, no: 'A-101', rent: '$3,000', rentNum: 3000, tenant: '-', tenantEmail: '', tenantPhone: '', status: 'Available', floor: '1st Floor', type: '1 Bedroom', freq: 'Monthly', leaseStart: '', leaseEnd: '', property: 'Greenfield Apartments', size: '650 sqft', notes: 'Freshly painted, new appliances.' },
  { id: 2, no: 'C-101', rent: '$5,500', rentNum: 5500, tenant: '-', tenantEmail: '', tenantPhone: '', status: 'Available', floor: '1st Floor', type: '2 Bedroom', freq: 'Monthly', leaseStart: '', leaseEnd: '', property: 'Greenfield Apartments', size: '900 sqft', notes: 'Corner unit with city view.' },
  { id: 3, no: 'A-102', rent: '$7,500', rentNum: 7500, tenant: 'John Smith', tenantEmail: 'john@gmail.com', tenantPhone: '+234 123 456 7890', status: 'Rented', floor: '1st Floor', type: '3 Bedroom', freq: 'Yearly', leaseStart: '01/01/2026', leaseEnd: '01/01/2027', property: 'Greenfield Apartments', size: '1,200 sqft', notes: 'Long-term tenant.' },
  { id: 4, no: 'B-201', rent: '$1,050', rentNum: 1050, tenant: 'Karl Earl', tenantEmail: 'karl@gmail.com', tenantPhone: '+234 555 000 1111', status: 'Rented', floor: '2nd Floor', type: '1 Bedroom', freq: 'Monthly', leaseStart: '03/01/2026', leaseEnd: '03/01/2027', property: 'Greenfield Apartments', size: '620 sqft', notes: '' },
  { id: 5, no: 'B-202', rent: '$4,200', rentNum: 4200, tenant: 'Sarrah Johnson', tenantEmail: 'sarrah@gmail.com', tenantPhone: '+234 987 654 3210', status: 'Rented', floor: '2nd Floor', type: '2 Bedroom', freq: 'Monthly', leaseStart: '06/01/2026', leaseEnd: '06/01/2027', property: 'Lakeside Complex', size: '850 sqft', notes: '' },
  { id: 6, no: 'D-301', rent: '$6,000', rentNum: 6000, tenant: '-', tenantEmail: '', tenantPhone: '', status: 'Available', floor: '3rd Floor', type: '3 Bedroom', freq: 'Yearly', leaseStart: '', leaseEnd: '', property: 'Lakeside Complex', size: '1,100 sqft', notes: 'Penthouse level, great views.' },
]

const FLOORS    = ['1st Floor','2nd Floor','3rd Floor','4th Floor','5th Floor']
const UNIT_TYPES = ['Studio','1 Bedroom','2 Bedroom','3 Bedroom','4 Bedroom','Penthouse']
const PROPERTIES = ['Greenfield Apartments','Lakeside Complex','Oakwood Heights','Pinecrest Villas']
const TENANTS    = ['John Smith','Sarrah Johnson','Karl Earl','Rebacca Smalls','Jay Willis','Anna Keller']

const avatarColor = (name: string) => {
  const c = ['bg-orange-400','bg-blue-500','bg-green-500','bg-purple-500','bg-pink-500','bg-teal-500']
  return c[name.charCodeAt(0) % c.length]
}

// ─── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon, color }: { label: string; value: number | string; sub?: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="card p-4 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} text-white shrink-0`}>{icon}</div>
      <div>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  )
}

// ─── View Unit Modal ────────────────────────────────────────────────────────

function ViewUnitModal({ unit, onClose, onEdit }: { unit: Unit; onClose: () => void; onEdit: () => void }) {
  return (
    <LandlordModal title="Unit Details" onClose={onClose} size="lg">
      <div className="space-y-5">
        {/* Header banner */}
        <div className="bg-gray-900 text-white rounded-2xl p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-bold">{unit.no}</span>
                <span className={`badge text-xs ${unit.status === 'Available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {unit.status}
                </span>
              </div>
              <p className="text-2xl font-bold">{unit.rent}
                <span className="text-sm font-normal text-gray-400"> / {unit.freq === 'Yearly' ? 'Year' : 'Month'}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <Building2 size={11}/>{unit.property}
              </p>
            </div>
            <div className="text-right text-xs text-gray-400 space-y-1">
              <p className="flex items-center gap-1 justify-end"><Layers size={11}/>{unit.floor}</p>
              <p className="flex items-center gap-1 justify-end"><BedDouble size={11}/>{unit.type}</p>
              <p className="flex items-center gap-1 justify-end"><Home size={11}/>{unit.size}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Unit info */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unit Information</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['Unit Number', unit.no],
                ['Floor', unit.floor],
                ['Type', unit.type],
                ['Size', unit.size],
                ['Rent', unit.rent],
                ['Frequency', unit.freq],
              ].map(([l, v]) => (
                <div key={l} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">{l}</p>
                  <p className="text-sm font-bold text-gray-900">{v}</p>
                </div>
              ))}
            </div>
            {unit.notes && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                <p className="text-xs font-semibold text-amber-700 mb-1">Notes</p>
                <p className="text-xs text-gray-700">{unit.notes}</p>
              </div>
            )}
          </div>

          {/* Tenant info */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tenant & Lease</p>
            {unit.tenant === '-' ? (
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-gray-400">
                <User size={32} className="mb-2 text-gray-200"/>
                <p className="text-sm font-semibold">No Tenant</p>
                <p className="text-xs mt-0.5">This unit is available</p>
              </div>
            ) : (
              <div className="border border-gray-100 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${avatarColor(unit.tenant)} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                    {unit.tenant[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{unit.tenant}</p>
                    {unit.tenantEmail && <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={10}/>{unit.tenantEmail}</p>}
                    {unit.tenantPhone && <p className="text-xs text-gray-500 flex items-center gap-1"><Phone size={10}/>{unit.tenantPhone}</p>}
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-2">
                  {[['Lease Start', unit.leaseStart], ['Lease End', unit.leaseEnd]].map(([l, v]) => (
                    <div key={l} className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-xs text-gray-400 mb-0.5">{l}</p>
                      <p className="text-xs font-bold text-gray-900">{v || '—'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="btn-outline flex-1 py-2.5">Close</button>
          <button onClick={onEdit} className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2">
            <Pencil size={14}/> Edit Unit
          </button>
        </div>
      </div>
    </LandlordModal>
  )
}

// ─── Edit Unit Modal ────────────────────────────────────────────────────────

function EditUnitModal({ unit, onClose, onSave }: { unit: Unit; onClose: () => void; onSave: (u: Unit) => void }) {
  const [form, setForm] = useState({
    no: unit.no, floor: unit.floor, type: unit.type, rent: unit.rent, rentNum: unit.rentNum,
    freq: unit.freq, status: unit.status, property: unit.property, size: unit.size, notes: unit.notes,
    tenant: unit.tenant === '-' ? '' : unit.tenant,
    tenantEmail: unit.tenantEmail, tenantPhone: unit.tenantPhone,
    leaseStart: unit.leaseStart, leaseEnd: unit.leaseEnd,
  })
  const f = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSave = () => {
    onSave({
      ...unit,
      ...form,
      tenant: form.tenant || '-',
      rent: form.rent.startsWith('$') ? form.rent : `$${form.rent}`,
    })
    onClose()
  }

  return (
    <LandlordModal title={`Edit Unit — ${unit.no}`} onClose={onClose} size="lg">
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Unit Number</label>
            <input className="input" value={form.no} onChange={e => f('no', e.target.value)}/>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Property</label>
            <div className="relative">
              <select className="input appearance-none pr-8" value={form.property} onChange={e => f('property', e.target.value)}>
                {PROPERTIES.map(p => <option key={p}>{p}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Floor</label>
            <div className="relative">
              <select className="input appearance-none pr-8" value={form.floor} onChange={e => f('floor', e.target.value)}>
                {FLOORS.map(f => <option key={f}>{f}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Unit Type</label>
            <div className="relative">
              <select className="input appearance-none pr-8" value={form.type} onChange={e => f('type', e.target.value)}>
                {UNIT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Rent Amount</label>
            <input className="input" value={form.rent} onChange={e => f('rent', e.target.value)}/>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Unit Size</label>
            <input className="input" value={form.size} onChange={e => f('size', e.target.value)} placeholder="e.g. 850 sqft"/>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Payment Frequency</label>
          <div className="flex gap-3">
            {['Monthly','Yearly'].map(o => (
              <label key={o} className={`flex items-center gap-2 cursor-pointer border rounded-xl px-4 py-2.5 transition-all ${form.freq === o ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="editFreq" checked={form.freq === o} onChange={() => f('freq', o)} className="accent-gray-900"/>
                <span className="text-sm font-medium">{o}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Status</label>
          <div className="flex gap-3">
            {(['Available','Rented'] as const).map((s, i) => (
              <label key={s} className={`flex items-center gap-2 cursor-pointer border rounded-xl px-4 py-2.5 transition-all ${form.status === s ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <span className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-green-500' : 'bg-red-500'}`}/>
                <span className="text-sm font-medium">{s}</span>
                <input type="radio" name="editStatus" checked={form.status === s} onChange={() => f('status', s)} className="sr-only"/>
              </label>
            ))}
          </div>
        </div>

        {form.status === 'Rented' && (
          <div className="border border-gray-100 rounded-2xl p-4 space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tenant Information</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Tenant Name</label>
                <div className="relative">
                  <select className="input appearance-none pr-8" value={form.tenant} onChange={e => f('tenant', e.target.value)}>
                    <option value="">Select tenant…</option>
                    {TENANTS.map(t => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Tenant Email</label>
                <input className="input" type="email" value={form.tenantEmail} onChange={e => f('tenantEmail', e.target.value)} placeholder="email@example.com"/>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Tenant Phone</label>
                <input className="input" type="tel" value={form.tenantPhone} onChange={e => f('tenantPhone', e.target.value)} placeholder="+234 000 000 0000"/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {([['leaseStart','Lease Start Date'],['leaseEnd','Lease End Date']] as [keyof typeof form, string][]).map(([key, label]) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 block mb-1">{label}</label>
                  <div className="relative">
                    <input className="input pr-8" value={form[key] as string} onChange={e => f(key, e.target.value)} placeholder="MM/DD/YYYY"/>
                    <Calendar size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Notes</label>
          <textarea className="input resize-none text-sm" rows={2} value={form.notes} onChange={e => f('notes', e.target.value)} placeholder="Optional notes about this unit…"/>
        </div>

        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="btn-outline flex-1 py-2.5">Cancel</button>
          <button onClick={handleSave} className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2">
            <Save size={14}/> Save Changes
          </button>
        </div>
      </div>
    </LandlordModal>
  )
}

// ─── Add Unit Modal ─────────────────────────────────────────────────────────

function AddUnitModal({ onClose, onAdd }: { onClose: () => void; onAdd: (u: Unit) => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({
    no: '', floor: '', type: '', property: '',
    rent: '', size: '', freq: 'Monthly',
    status: 'Available' as 'Available' | 'Rented',
    notes: '', tenant: '', tenantEmail: '', tenantPhone: '',
    leaseStart: '', leaseEnd: '',
  })
  const f = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const step1Valid = form.no && form.floor && form.type && form.property && form.rent

  const handleAdd = () => {
    const newUnit: Unit = {
      id: Date.now(),
      no: form.no,
      rent: form.rent.startsWith('$') ? form.rent : `$${form.rent}`,
      rentNum: parseFloat(form.rent.replace(/[^0-9.]/g, '')) || 0,
      tenant: form.tenant || '-',
      tenantEmail: form.tenantEmail,
      tenantPhone: form.tenantPhone,
      status: form.status,
      floor: form.floor,
      type: form.type,
      freq: form.freq,
      leaseStart: form.leaseStart,
      leaseEnd: form.leaseEnd,
      property: form.property,
      size: form.size || 'N/A',
      notes: form.notes,
    }
    onAdd(newUnit)
    onClose()
  }

  return (
    <LandlordModal title="Add New Unit" onClose={onClose} size="lg">
      {/* Steps */}
      <div className="flex items-center gap-1 mb-6">
        {[{ n: 1, label: 'Unit Details' }, { n: 2, label: 'Tenant & Lease' }].map(({ n, label }, i) => (
          <div key={n} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= n ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>{n}</div>
              <span className={`text-sm font-medium ${step >= n ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
            </div>
            {i === 0 && <div className={`flex-1 h-0.5 mx-3 transition-colors ${step >= 2 ? 'bg-gray-900' : 'bg-gray-200'}`}/>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Unit Number <span className="text-red-400">*</span></label>
              <input className="input" placeholder="e.g. A-201" value={form.no} onChange={e => f('no', e.target.value)}/>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Property <span className="text-red-400">*</span></label>
              <div className="relative">
                <select className="input appearance-none pr-8" value={form.property} onChange={e => f('property', e.target.value)}>
                  <option value="">Select property…</option>
                  {PROPERTIES.map(p => <option key={p}>{p}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Floor <span className="text-red-400">*</span></label>
              <div className="relative">
                <select className="input appearance-none pr-8" value={form.floor} onChange={e => f('floor', e.target.value)}>
                  <option value="">Select floor…</option>
                  {FLOORS.map(fl => <option key={fl}>{fl}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Unit Type <span className="text-red-400">*</span></label>
              <div className="relative">
                <select className="input appearance-none pr-8" value={form.type} onChange={e => f('type', e.target.value)}>
                  <option value="">Select type…</option>
                  {UNIT_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Rent Amount <span className="text-red-400">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                <input className="input pl-7" placeholder="0.00" value={form.rent.replace('$','')} onChange={e => f('rent', e.target.value)}/>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Unit Size</label>
              <input className="input" placeholder="e.g. 850 sqft" value={form.size} onChange={e => f('size', e.target.value)}/>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Payment Frequency</label>
            <div className="flex gap-3">
              {['Monthly','Yearly'].map(o => (
                <label key={o} className={`flex items-center gap-2 cursor-pointer border rounded-xl px-4 py-2.5 flex-1 justify-center transition-all ${form.freq === o ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="freq" checked={form.freq === o} onChange={() => f('freq', o)} className="accent-gray-900"/>
                  <span className="text-sm font-medium">{o}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Initial Status</label>
            <div className="flex gap-3">
              {(['Available','Rented'] as const).map((s, i) => (
                <label key={s} className={`flex items-center gap-2 cursor-pointer border rounded-xl px-4 py-2.5 flex-1 justify-center transition-all ${form.status === s ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-green-500' : 'bg-red-500'}`}/>
                  <span className="text-sm font-medium">{s}</span>
                  <input type="radio" name="status" checked={form.status === s} onChange={() => f('status', s)} className="sr-only"/>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Notes</label>
            <textarea className="input resize-none text-sm" rows={2} placeholder="Any notes about this unit…" value={form.notes} onChange={e => f('notes', e.target.value)}/>
          </div>

          <div className="flex gap-2 pt-1">
            <button onClick={onClose} className="btn-outline flex-1 py-2.5">Cancel</button>
            <button onClick={() => setStep(2)} disabled={!step1Valid}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${step1Valid ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
              Next: Tenant & Lease →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-gray-900 text-white rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center shrink-0">
              <Home size={18}/>
            </div>
            <div>
              <p className="font-bold">{form.no} · {form.type}</p>
              <p className="text-sm text-gray-400">{form.property} · {form.floor}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-bold">${form.rent}</p>
              <p className="text-xs text-gray-400">/ {form.freq}</p>
            </div>
          </div>

          {form.status === 'Available' ? (
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400">
              <User size={36} className="mx-auto mb-2 text-gray-200"/>
              <p className="font-semibold text-gray-500">No Tenant Required</p>
              <p className="text-sm mt-1">This unit is marked as Available. You can assign a tenant later.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tenant Information</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Tenant Name</label>
                  <div className="relative">
                    <select className="input appearance-none pr-8" value={form.tenant} onChange={e => f('tenant', e.target.value)}>
                      <option value="">Select tenant…</option>
                      {TENANTS.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Tenant Email</label>
                  <input className="input" type="email" placeholder="email@example.com" value={form.tenantEmail} onChange={e => f('tenantEmail', e.target.value)}/>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Tenant Phone</label>
                  <input className="input" type="tel" placeholder="+234 000 000 0000" value={form.tenantPhone} onChange={e => f('tenantPhone', e.target.value)}/>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-1">Lease Dates</p>
              <div className="grid grid-cols-2 gap-3">
                {([['leaseStart','Lease Start Date'],['leaseEnd','Lease End Date']] as [keyof typeof form, string][]).map(([key, label]) => (
                  <div key={key}>
                    <label className="text-xs text-gray-500 block mb-1">{label}</label>
                    <div className="relative">
                      <input className="input pr-8" placeholder="MM/DD/YYYY" value={form[key] as string} onChange={e => f(key, e.target.value)}/>
                      <Calendar size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button onClick={() => setStep(1)} className="btn-outline flex-1 py-2.5">← Back</button>
            <button onClick={handleAdd} className="btn-green flex-1 py-2.5 flex items-center justify-center gap-2 font-semibold">
              <Plus size={15}/> Add Unit
            </button>
          </div>
        </div>
      )}
    </LandlordModal>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function UnitsPage() {
  const [units, setUnits]         = useState<Unit[]>(INITIAL_UNITS)
  const [viewUnit, setViewUnit]   = useState<Unit | null>(null)
  const [editUnit, setEditUnit]   = useState<Unit | null>(null)
  const [showAdd, setShowAdd]     = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch]       = useState('')

  const stats = useMemo(() => ({
    total:     units.length,
    available: units.filter(u => u.status === 'Available').length,
    rented:    units.filter(u => u.status === 'Rented').length,
    avgRent:   Math.round(units.reduce((a, u) => a + u.rentNum, 0) / units.length),
  }), [units])

  const filtered = useMemo(() => units.filter(u => {
    const matchStatus = statusFilter === 'All' || u.status === statusFilter
    const q = search.toLowerCase()
    const matchSearch = !q || u.no.toLowerCase().includes(q) || u.tenant.toLowerCase().includes(q) || u.type.toLowerCase().includes(q)
    return matchStatus && matchSearch
  }), [units, statusFilter, search])

  const handleSaveEdit = (updated: Unit) => setUnits(p => p.map(u => u.id === updated.id ? updated : u))
  const handleAdd      = (newUnit: Unit) => setUnits(p => [newUnit, ...p])

  return (
    <div className="max-w-5xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Unit Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage all units across your properties</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-green flex items-center gap-2 px-5 py-2.5 text-sm font-semibold">
          <Plus size={16}/> Add Unit
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        {['Properties','Greenfield Apartment','Units'].map((b, i, arr) => (
          <span key={b} className="flex items-center gap-1.5">
            <span className={i === arr.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-gray-700 cursor-pointer'}>{b}</span>
            {i < arr.length - 1 && <ChevronRight size={13}/>}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Units"     value={stats.total}     icon={<Home size={18}/>}       color="bg-gray-800"/>
        <StatCard label="Available"       value={stats.available} icon={<CheckCircle2 size={18}/>} color="bg-green-600"/>
        <StatCard label="Rented"          value={stats.rented}    icon={<User size={18}/>}        color="bg-blue-600"/>
        <StatCard label="Avg. Rent"       value={`$${stats.avgRent.toLocaleString()}`} icon={<DollarSign size={18}/>} color="bg-purple-600"/>
      </div>

      {/* Filters */}
      <div className="card p-4 flex items-center gap-3 flex-wrap">
        <div className="flex gap-1">
          {['All','Available','Rented'].map((t, i) => (
            <button key={t} onClick={() => setStatusFilter(t)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${statusFilter === t ? (i===0?'bg-gray-900 text-white':i===1?'bg-green-600 text-white':'bg-red-500 text-white') : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)} type="text"
            placeholder="Search unit, tenant, type…" className="input pl-9 w-56 text-sm"/>
        </div>
        <div className="relative ml-auto">
          <select className="input appearance-none pr-8 text-sm w-44">
            <option>Sort by: Unit Number</option>
            <option>Sort by: Rent (High–Low)</option>
            <option>Sort by: Status</option>
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
        </div>
        <span className="text-xs text-gray-400 font-medium">{filtered.length} unit{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              {['Unit No.','Property','Floor','Type','Rent Amount','Tenant','Status','Actions'].map(h => (
                <th key={h} className="th text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="td text-center text-gray-400 py-10">
                  <Home size={32} className="mx-auto mb-2 text-gray-200"/>
                  <p className="font-medium">No units found</p>
                </td>
              </tr>
            ) : filtered.map(u => (
              <tr key={u.id} className="hover:bg-gray-50/60 transition-colors group">
                <td className="td">
                  <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-xs">{u.no}</span>
                </td>
                <td className="td text-xs text-gray-600">{u.property}</td>
                <td className="td text-xs text-gray-500">{u.floor}</td>
                <td className="td">
                  <div className="flex items-center gap-1.5">
                    <BedDouble size={13} className="text-gray-400"/>
                    <span className="text-xs font-medium text-gray-700">{u.type}</span>
                  </div>
                </td>
                <td className="td">
                  <span className="text-sm font-bold text-gray-900">{u.rent}</span>
                  <span className="text-xs text-gray-400"> /{u.freq === 'Yearly' ? 'yr' : 'mo'}</span>
                </td>
                <td className="td">
                  {u.tenant === '-' ? (
                    <span className="text-xs text-gray-400 italic">Vacant</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full ${avatarColor(u.tenant)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {u.tenant[0]}
                      </div>
                      <span className="text-xs font-medium text-gray-800">{u.tenant}</span>
                    </div>
                  )}
                </td>
                <td className="td">
                  <span className={`badge flex items-center gap-1 w-fit text-xs ${u.status === 'Available' ? 'badge-green' : 'badge-red'}`}>
                    {u.status === 'Available' ? <CheckCircle2 size={11}/> : <XCircle size={11}/>}
                    {u.status}
                  </span>
                </td>
                <td className="td">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setViewUnit(u)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors">
                      <Eye size={11}/>View
                    </button>
                    <button onClick={() => setEditUnit(u)}
                      className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                      <Pencil size={11}/>Edit
                    </button>
                    <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <MoreHorizontal size={13} className="text-gray-400"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {viewUnit  && (
        <ViewUnitModal
          unit={viewUnit}
          onClose={() => setViewUnit(null)}
          onEdit={() => { setEditUnit(viewUnit); setViewUnit(null) }}
        />
      )}
      {editUnit  && <EditUnitModal unit={editUnit} onClose={() => setEditUnit(null)} onSave={handleSaveEdit}/>}
      {showAdd   && <AddUnitModal  onClose={() => setShowAdd(false)} onAdd={handleAdd}/>}
    </div>
  )
}
