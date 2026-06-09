import { useState, useMemo } from 'react'
import {
  Plus, ChevronLeft, ChevronRight, ChevronDown, Search,
  Wrench, Clock, CheckCircle2, AlertTriangle, UserCheck,
  Save, X, Calendar, Building2, Home, FileText,
  Phone, Mail
} from 'lucide-react'
import LandlordModal from '../../modal/LandlordModal'


// ─── Data ──────────────────────────────────────────────────────────────────

type Priority = 'High' | 'Medium' | 'Low'
type Status   = 'New' | 'In Progress' | 'Resolved' | 'Pending'

interface Request {
  id: string
  type: string
  property: string
  unit: string
  tenant: string
  tenantEmail: string
  tenantPhone: string
  priority: Priority
  status: Status
  vendor: string
  created: string
  desc: string
  images?: string[]
}

const initialRequests: Request[] = [
  { id: 'MR-00123', type: 'Plumbing',    property: 'Greenwood Apartment', unit: 'Unit 3B',  tenant: 'John Smith',    tenantEmail: 'john@gmail.com',    tenantPhone: '+234 123 456 7890', priority: 'High',   status: 'New',         vendor: 'Unassigned',     created: '02/15/2027', desc: 'Kitchen faucet is leaking underneath the sink. Water pressure is also consistently low throughout the unit.' },
  { id: 'MR-00223', type: 'Electrical',  property: 'Greenwood Apartment', unit: 'Unit 3B',  tenant: 'John Smith',    tenantEmail: 'john@gmail.com',    tenantPhone: '+234 123 456 7890', priority: 'High',   status: 'In Progress', vendor: 'Bright Electric', created: '02/15/2027', desc: 'Main circuit breaker trips frequently when the air conditioning unit is running. Power goes out in half the apartment.' },
  { id: 'MR-00423', type: 'Appliance',   property: 'Lakeside Complex',    unit: 'Unit 7A',  tenant: 'Sarrah Johnson', tenantEmail: 'sarrah@gmail.com', tenantPhone: '+234 987 654 3210', priority: 'High',   status: 'New',         vendor: 'Unassigned',     created: '02/16/2027', desc: 'Refrigerator stopped cooling. All food items are spoiling. Needs urgent attention.' },
  { id: 'MR-00783', type: 'Locksmith',   property: 'Greenwood Apartment', unit: 'Unit 12C', tenant: 'Karl Earl',     tenantEmail: 'karl@gmail.com',    tenantPhone: '+234 555 000 1111', priority: 'Medium', status: 'Resolved',    vendor: 'KeyMasters',     created: '02/10/2027', desc: 'Front door lock is jammed and cannot be opened from outside. Tenant is locked out.' },
  { id: 'MR-00313', type: 'Roofing',     property: 'Lakeside Complex',    unit: 'Unit 2F',  tenant: 'Rebacca Smalls', tenantEmail: 'rebacca@gmail.com', tenantPhone: '+234 777 888 9999', priority: 'High',   status: 'In Progress', vendor: 'Top Roof Repair', created: '02/12/2027', desc: 'Roof is leaking in the master bedroom during any rainfall. Water damage visible on ceiling and walls.' },
  { id: 'MR-00445', type: 'HVAC',        property: 'Greenwood Apartment', unit: 'Unit 5D',  tenant: 'Jay Willis',    tenantEmail: 'jay@gmail.com',     tenantPhone: '+234 444 333 2222', priority: 'Medium', status: 'Pending',     vendor: 'CoolBreeze HVAC', created: '02/18/2027', desc: 'Air conditioning unit is blowing warm air. Thermostat shows correct temperature but room stays hot.' },
  { id: 'MR-00512', type: 'Painting',    property: 'Lakeside Complex',    unit: 'Unit 9B',  tenant: 'Anna Keller',   tenantEmail: 'anna@gmail.com',    tenantPhone: '+234 222 111 0000', priority: 'Low',    status: 'New',         vendor: 'Unassigned',     created: '02/19/2027', desc: 'Living room walls have significant peeling paint and water stains from previous leak that was repaired.' },
  { id: 'MR-00601', type: 'Pest Control',property: 'Greenwood Apartment', unit: 'Unit 1A',  tenant: 'John Smith',    tenantEmail: 'john@gmail.com',    tenantPhone: '+234 123 456 7890', priority: 'High',   status: 'New',         vendor: 'Unassigned',     created: '02/20/2027', desc: 'Cockroach infestation in the kitchen area. Spotted multiple insects near the sink and under cabinets.' },
]

const VENDORS = [
  'Bright Electric', 'KeyMasters', 'Top Roof Repair', 'ProPlumb Co.',
  'CoolBreeze HVAC', 'FixIt All', 'QuickFix Services', 'PestAway Ltd',
  'FreshCoat Painters', 'RoofShield Pro',
]

const ISSUE_TYPES = ['Plumbing', 'Electrical', 'Appliance', 'Locksmith', 'Roofing', 'HVAC', 'Painting', 'Pest Control', 'Carpentry', 'Other']
const PROPERTIES  = ['Greenwood Apartment', 'Lakeside Complex', 'Oakwood Heights', 'Pinecrest Villas']
const UNITS       = ['Unit 1A','Unit 2B','Unit 3B','Unit 5D','Unit 7A','Unit 9B','Unit 12C']
const TENANTS     = ['John Smith','Sarrah Johnson','Karl Earl','Rebacca Smalls','Jay Willis','Anna Keller']

// ─── Helpers ───────────────────────────────────────────────────────────────

const priorityBadge: Record<Priority, string> = {
  High:   'badge bg-red-500 text-white',
  Medium: 'badge bg-yellow-400 text-yellow-900',
  Low:    'badge bg-blue-100 text-blue-700',
}

const statusBadge: Record<Status, string> = {
  New:          'badge bg-gray-900 text-white',
  'In Progress':'badge bg-orange-500 text-white',
  Resolved:     'badge bg-green-500 text-white',
  Pending:      'badge bg-yellow-400 text-yellow-900',
}

const statusIcon: Record<Status, React.ReactNode> = {
  New:           <AlertTriangle size={12} />,
  'In Progress': <Clock size={12} />,
  Resolved:      <CheckCircle2 size={12} />,
  Pending:       <Clock size={12} />,
}

const avatarColor = (name: string) => {
  const colors = ['bg-orange-400','bg-blue-500','bg-green-500','bg-purple-500','bg-pink-500','bg-teal-500']
  return colors[name.charCodeAt(0) % colors.length]
}

// ─── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="card p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} text-white shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </div>
    </div>
  )
}

// ─── View Modal ────────────────────────────────────────────────────────────

function ViewRequestModal({ req, onClose, onAssign }: { req: Request; onClose: () => void; onAssign: () => void }) {
  return (
    <LandlordModal title="Maintenance Request Details" onClose={onClose} size="lg">
      <div className="space-y-5">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-sm">{req.id}</span>
          <div className="flex items-center gap-2">
            <span className={`${priorityBadge[req.priority]} flex items-center gap-1`}>{req.priority} Priority</span>
            <span className={`${statusBadge[req.status]} flex items-center gap-1.5`}>{statusIcon[req.status]}{req.status}</span>
          </div>
        </div>

        {/* Issue type banner */}
        <div className="bg-gray-900 text-white rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
            <Wrench size={22} />
          </div>
          <div>
            <p className="text-lg font-bold">{req.type}</p>
            <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-0.5">
              <Building2 size={13}/>{req.property} &nbsp;·&nbsp;<Home size={13}/>{req.unit}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Left: tenant + vendor */}
          <div className="space-y-3">
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Tenant Info</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${avatarColor(req.tenant)} flex items-center justify-center text-white font-bold shrink-0`}>
                  {req.tenant[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{req.tenant}</p>
                  <p className="flex items-center gap-1 text-xs text-gray-500"><Mail size={10}/>{req.tenantEmail}</p>
                  <p className="flex items-center gap-1 text-xs text-gray-500"><Phone size={10}/>{req.tenantPhone}</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Assigned Vendor</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                  {req.vendor === 'Unassigned' ? '?' : req.vendor[0]}
                </div>
                <span className={`text-sm font-medium ${req.vendor === 'Unassigned' ? 'text-gray-400 italic' : 'text-gray-900'}`}>
                  {req.vendor}
                </span>
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Date Created</p>
              <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5"><Calendar size={13} className="text-gray-400"/>{req.created}</p>
            </div>
          </div>

          {/* Right: description */}
          <div className="border border-amber-100 bg-amber-50 rounded-xl p-4 flex flex-col">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">Issue Description</p>
            <p className="text-sm text-gray-700 leading-relaxed flex-1">{req.desc}</p>
          </div>
        </div>

        {/* Status timeline */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Request Timeline</p>
          <div className="flex items-center gap-0">
            {(['New','In Progress','Resolved'] as Status[]).map((s, i, arr) => {
              const idx = ['New','In Progress','Resolved'].indexOf(req.status)
              const active = i <= idx
              return (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${active ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {i + 1}
                    </div>
                    <span className={`text-xs font-medium ${active ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < idx ? 'bg-gray-900' : 'bg-gray-200'}`}/>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="btn-outline flex-1 py-2.5">Close</button>
          {req.vendor === 'Unassigned' && (
            <button onClick={onAssign} className="flex-1 py-2.5 btn-primary flex items-center justify-center gap-2">
              <UserCheck size={15}/> Assign Vendor
            </button>
          )}
          {req.status !== 'Resolved' && (
            <button onClick={onClose} className="flex-1 py-2.5 btn-green flex items-center justify-center gap-2">
              <CheckCircle2 size={15}/> Mark Resolved
            </button>
          )}
        </div>
      </div>
    </LandlordModal>
  )
}

// ─── Assign Modal ──────────────────────────────────────────────────────────

function AssignVendorModal({ req, onClose }: { req: Request; onClose: () => void }) {
  const [selected, setSelected] = useState(req.vendor === 'Unassigned' ? '' : req.vendor)
  const [note, setNote]         = useState('')
  const [priority, setPriority] = useState<Priority>(req.priority)

  return (
    <LandlordModal title="Assign Vendor" onClose={onClose} size="md">
      <div className="space-y-5">

        {/* Request summary */}
        <div className="bg-gray-900 text-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-sm text-blue-300">{req.id}</span>
            <span className={statusBadge[req.status]}>{req.status}</span>
          </div>
          <p className="font-bold text-base">{req.type}</p>
          <p className="text-sm text-gray-400">{req.property} · {req.unit} · {req.tenant}</p>
        </div>

        {/* Priority override */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Priority Level</label>
          <div className="flex gap-2">
            {(['High','Medium','Low'] as Priority[]).map(p => (
              <button key={p} onClick={() => setPriority(p)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${priority === p ? (p === 'High' ? 'bg-red-500 text-white border-red-500' : p === 'Medium' ? 'bg-yellow-400 text-yellow-900 border-yellow-400' : 'bg-blue-500 text-white border-blue-500') : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Vendor list */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
            Select Vendor <span className="text-red-400">*</span>
          </label>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {VENDORS.map(v => (
              <label key={v}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all ${selected === v ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-300'}`}>
                <input type="radio" name="vendor" checked={selected === v} onChange={() => setSelected(v)} className="accent-gray-900 shrink-0"/>
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">{v[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{v}</p>
                  <p className="text-xs text-gray-400">Available · Rated 4.8★</p>
                </div>
                {selected === v && <CheckCircle2 size={16} className="text-gray-900 shrink-0"/>}
              </label>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Instructions for Vendor <span className="text-gray-400 font-normal">(optional)</span></label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
            placeholder="e.g. Please call tenant 30 min before arrival. Access code is 4521."
            className="input resize-none text-sm"/>
        </div>

        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="btn-outline flex-1 py-2.5">Cancel</button>
          <button onClick={onClose} disabled={!selected}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${selected ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            <UserCheck size={15}/> Assign Vendor
          </button>
        </div>
      </div>
    </LandlordModal>
  )
}

// ─── New Request Modal ─────────────────────────────────────────────────────

function NewRequestModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (r: Request) => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({
    type: '',
    property: '',
    unit: '',
    tenant: '',
    tenantEmail: '',
    tenantPhone: '',
    priority: 'High' as Priority,
    desc: '',
    vendor: 'Unassigned',
    assignNow: false,
  })

  const f = (k: keyof typeof form, v: string | boolean) => setForm(prev => ({ ...prev, [k]: v }))

  const step1Valid = form.type && form.property && form.unit && form.tenant && form.desc

  const handleSubmit = () => {
    const id = `MR-00${Math.floor(Math.random() * 900 + 100)}`
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    onSubmit({
      id,
      type: form.type,
      property: form.property,
      unit: form.unit,
      tenant: form.tenant,
      tenantEmail: form.tenantEmail || 'tenant@gmail.com',
      tenantPhone: form.tenantPhone || '+234 000 000 0000',
      priority: form.priority,
      status: 'New',
      vendor: form.vendor,
      created: today,
      desc: form.desc,
    })
    onClose()
  }

  return (
    <LandlordModal title="New Maintenance Request" onClose={onClose} size="lg">
      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-6">
        {[{n:1,label:'Request Details'},{n:2,label:'Assignment'}].map(({n,label},i)=>(
          <div key={n} className="flex items-center flex-1">
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${step >= n ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>{n}</div>
              <span className={`text-sm font-medium ${step >= n ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
            </div>
            {i === 0 && <div className={`w-8 h-0.5 mx-2 transition-colors ${step >= 2 ? 'bg-gray-900' : 'bg-gray-200'}`}/>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          {/* Issue type */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Issue Type <span className="text-red-400">*</span></label>
            <div className="grid grid-cols-4 gap-2">
              {ISSUE_TYPES.map(t => (
                <button key={t} onClick={() => f('type', t)}
                  className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all ${form.type === t ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Unit <span className="text-red-400">*</span></label>
              <div className="relative">
                <select className="input appearance-none pr-8" value={form.unit} onChange={e => f('unit', e.target.value)}>
                  <option value="">Select unit…</option>
                  {UNITS.map(u => <option key={u}>{u}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Tenant <span className="text-red-400">*</span></label>
              <div className="relative">
                <select className="input appearance-none pr-8" value={form.tenant} onChange={e => f('tenant', e.target.value)}>
                  <option value="">Select tenant…</option>
                  {TENANTS.map(t => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Priority <span className="text-red-400">*</span></label>
              <div className="flex gap-2 h-[38px]">
                {(['High','Medium','Low'] as Priority[]).map(p => (
                  <button key={p} onClick={() => f('priority', p)}
                    className={`flex-1 rounded-lg text-xs font-bold border transition-all ${form.priority === p ? (p==='High'?'bg-red-500 text-white border-red-500':p==='Medium'?'bg-yellow-400 text-yellow-900 border-yellow-400':'bg-blue-500 text-white border-blue-500') : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Tenant Email</label>
              <input className="input" type="email" placeholder="tenant@email.com" value={form.tenantEmail} onChange={e => f('tenantEmail', e.target.value)}/>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Tenant Phone</label>
              <input className="input" type="tel" placeholder="+234 000 000 0000" value={form.tenantPhone} onChange={e => f('tenantPhone', e.target.value)}/>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Issue Description <span className="text-red-400">*</span></label>
            <textarea rows={4} className="input resize-none text-sm" placeholder="Describe the issue in detail — what's broken, when it started, how severe it is…"
              value={form.desc} onChange={e => f('desc', e.target.value)}/>
            <p className="text-xs text-gray-400 mt-1 text-right">{form.desc.length} / 500</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="btn-outline flex-1 py-2.5">Cancel</button>
            <button onClick={() => setStep(2)} disabled={!step1Valid}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${step1Valid ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
              Next: Assignment →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center shrink-0">
              <Wrench size={18} className="text-gray-600"/>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{form.type} · {form.unit}</p>
              <p className="text-xs text-gray-500">{form.property} · {form.tenant}</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{form.desc}</p>
            </div>
            <span className={`ml-auto shrink-0 ${priorityBadge[form.priority]}`}>{form.priority}</span>
          </div>

          {/* Assign now toggle */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">Vendor Assignment</label>
            <div className="flex gap-3">
              {[{v:false,label:'Assign Later',sub:'Save as unassigned'},{v:true,label:'Assign Now',sub:'Select a vendor below'}].map(opt=>(
                <button key={String(opt.v)} onClick={() => f('assignNow', opt.v)}
                  className={`flex-1 p-3 rounded-xl border text-left transition-all ${form.assignNow === opt.v ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                  <p className="text-xs text-gray-500">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {form.assignNow && (
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Select Vendor</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {VENDORS.map(v => (
                  <label key={v}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all ${form.vendor === v ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input type="radio" name="nv" checked={form.vendor === v} onChange={() => f('vendor', v)} className="accent-gray-900 shrink-0"/>
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">{v[0]}</div>
                    <span className="text-sm font-medium text-gray-900">{v}</span>
                    {form.vendor === v && <CheckCircle2 size={15} className="ml-auto text-gray-900 shrink-0"/>}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button onClick={() => setStep(1)} className="btn-outline flex-1 py-2.5">← Back</button>
            <button onClick={handleSubmit}
              className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
              <Save size={15}/> Submit Request
            </button>
          </div>
        </div>
      )}
    </LandlordModal>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────

const PAGE_SIZE = 5

export default function MaintenancePage() {
  const [data, setData]                   = useState<Request[]>(initialRequests)
  const [viewReq, setViewReq]             = useState<Request | null>(null)
  const [assignReq, setAssignReq]         = useState<Request | null>(null)
  const [showNew, setShowNew]             = useState(false)
  const [page, setPage]                   = useState(1)
  const [search, setSearch]               = useState('')
  const [filterStatus, setFilterStatus]   = useState('All')
  const [filterPriority, setFilterPriority] = useState('All')
  const [filterProperty, setFilterProperty] = useState('All')

  // Stats
  const stats = useMemo(() => ({
    total:      data.length,
    newCount:   data.filter(r => r.status === 'New').length,
    inProgress: data.filter(r => r.status === 'In Progress').length,
    resolved:   data.filter(r => r.status === 'Resolved').length,
    pending:    data.filter(r => r.status === 'Pending').length,
  }), [data])

  // Filtered list
  const filtered = useMemo(() => data.filter(r => {
    const q = search.toLowerCase()
    const matchSearch = !q || r.id.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.tenant.toLowerCase().includes(q) || r.unit.toLowerCase().includes(q)
    const matchStatus   = filterStatus   === 'All' || r.status   === filterStatus
    const matchPriority = filterPriority === 'All' || r.priority === filterPriority
    const matchProperty = filterProperty === 'All' || r.property === filterProperty
    return matchSearch && matchStatus && matchPriority && matchProperty
  }), [data, search, filterStatus, filterPriority, filterProperty])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const addRequest = (r: Request) => { setData(prev => [r, ...prev]); setPage(1) }

  return (
    <div className="max-w-6xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track and manage all property maintenance issues</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-green flex items-center gap-2 px-5 py-2.5 text-sm font-semibold">
          <Plus size={16}/> New Request
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard label="Total Requests"  value={stats.total}      icon={<FileText size={20}/>}       color="bg-gray-800"/>
        <StatCard label="New"             value={stats.newCount}   icon={<AlertTriangle size={20}/>}  color="bg-red-500"/>
        <StatCard label="In Progress"     value={stats.inProgress} icon={<Clock size={20}/>}          color="bg-orange-500"/>
        <StatCard label="Pending"         value={stats.pending}    icon={<Clock size={20}/>}          color="bg-yellow-500"/>
        <StatCard label="Resolved"        value={stats.resolved}   icon={<CheckCircle2 size={20}/>}   color="bg-green-600"/>
      </div>

      {/* Filters */}
      <div className="card p-4 flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
            type="text" placeholder="Search ID, type, tenant…"
            className="input pl-9 w-56 text-sm"/>
        </div>

        {/* Status filter */}
        <div className="relative">
          <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
            className="input appearance-none pr-8 text-sm w-40">
            <option value="All">All Status</option>
            {['New','In Progress','Pending','Resolved'].map(s => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
        </div>

        {/* Priority filter */}
        <div className="relative">
          <select value={filterPriority} onChange={e => { setFilterPriority(e.target.value); setPage(1) }}
            className="input appearance-none pr-8 text-sm w-40">
            <option value="All">All Priority</option>
            {['High','Medium','Low'].map(p => <option key={p}>{p}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
        </div>

        {/* Property filter */}
        <div className="relative">
          <select value={filterProperty} onChange={e => { setFilterProperty(e.target.value); setPage(1) }}
            className="input appearance-none pr-8 text-sm w-48">
            <option value="All">All Properties</option>
            {PROPERTIES.map(p => <option key={p}>{p}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
        </div>

        {/* Reset */}
        {(search || filterStatus !== 'All' || filterPriority !== 'All' || filterProperty !== 'All') && (
          <button onClick={() => { setSearch(''); setFilterStatus('All'); setFilterPriority('All'); setFilterProperty('All'); setPage(1) }}
            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium px-2 py-2">
            <X size={13}/> Clear filters
          </button>
        )}

        <span className="ml-auto text-xs text-gray-400 font-medium">{filtered.length} request{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              {['Request ID','Issue Type','Property / Unit','Tenant','Priority','Status','Assigned Vendor','Created','Actions'].map(h => (
                <th key={h} className="th text-xs whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={9} className="td text-center text-gray-400 py-12">
                  <Wrench size={32} className="mx-auto mb-2 text-gray-300"/>
                  <p className="font-medium">No requests found</p>
                  <p className="text-xs mt-0.5">Try adjusting your filters</p>
                </td>
              </tr>
            ) : paged.map(r => (
              <tr key={r.id} className="hover:bg-gray-50/60 transition-colors group">
                <td className="td">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{r.id}</span>
                </td>
                <td className="td">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <Wrench size={13} className="text-gray-500"/>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{r.type}</span>
                  </div>
                </td>
                <td className="td">
                  <p className="text-xs font-semibold text-gray-800">{r.property}</p>
                  <p className="text-xs text-gray-400">{r.unit}</p>
                </td>
                <td className="td">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${avatarColor(r.tenant)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {r.tenant[0]}
                    </div>
                    <span className="text-xs text-gray-700 font-medium whitespace-nowrap">{r.tenant}</span>
                  </div>
                </td>
                <td className="td">
                  <span className={`${priorityBadge[r.priority]} whitespace-nowrap`}>{r.priority}</span>
                </td>
                <td className="td">
                  <span className={`${statusBadge[r.status]} flex items-center gap-1 whitespace-nowrap w-fit`}>
                    {statusIcon[r.status]}{r.status}
                  </span>
                </td>
                <td className="td">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold shrink-0 ${r.vendor === 'Unassigned' ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-700'}`}>
                      {r.vendor === 'Unassigned' ? '?' : r.vendor[0]}
                    </div>
                    <span className={`text-xs ${r.vendor === 'Unassigned' ? 'text-gray-400 italic' : 'text-gray-700 font-medium'} whitespace-nowrap`}>
                      {r.vendor}
                    </span>
                  </div>
                </td>
                <td className="td">
                  <span className="text-xs text-gray-500 whitespace-nowrap">{r.created}</span>
                </td>
                <td className="td">
                  <div className="flex gap-1.5">
                    <button onClick={() => setViewReq(r)}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all">
                      View
                    </button>
                    <button onClick={() => setAssignReq(r)}
                      className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-700 transition-all">
                      Assign
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-5 py-3.5 flex items-center justify-between border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-500">
            Showing <span className="font-semibold text-gray-700">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</span> of <span className="font-semibold text-gray-700">{filtered.length}</span> requests
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium disabled:opacity-40 hover:bg-white transition-colors">
              <ChevronLeft size={13}/> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${page === n ? 'bg-gray-900 text-white' : 'border border-gray-200 hover:bg-white text-gray-600'}`}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium disabled:opacity-40 hover:bg-white transition-colors">
              Next <ChevronRight size={13}/>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {viewReq  && <ViewRequestModal  req={viewReq}  onClose={() => setViewReq(null)}  onAssign={() => { setAssignReq(viewReq); setViewReq(null) }}/>}
      {assignReq && <AssignVendorModal req={assignReq} onClose={() => setAssignReq(null)}/>}
      {showNew  && <NewRequestModal   onClose={() => setShowNew(false)} onSubmit={addRequest}/>}
    </div>
  )
}
