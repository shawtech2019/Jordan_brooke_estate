import { useState, useMemo } from 'react'
import {
  Bell, CheckCheck, Trash2, Filter,
   Wrench, FileText, Settings2, CreditCard,
  Eye, Clock, CheckCircle2
} from 'lucide-react'
import LandlordModal from '../../modal/LandlordModal'


// ─── Types & Data ──────────────────────────────────────────────────────────

type NotifType = 'rent' | 'maintenance' | 'lease' | 'system'

interface Notification {
  id: number
  type: NotifType
  read: boolean
  time: string
  title: string
  body: string
  meta?: Record<string, string>
  actions: string[]
}

const INITIAL: Notification[] = [
  {
    id: 1, type: 'rent', read: false, time: '3 min ago',
    title: "Rent Overdue — John Smith",
    body: "John Smith's rent for Greenwood Apartment Unit 3B is overdue by 18 days. Outstanding balance is $5,000.",
    meta: { Tenant: 'John Smith', Property: 'Greenwood Apartment', Unit: 'Unit 3B', Amount: '$5,000', 'Overdue by': '18 days' },
    actions: ['Send Notice', 'View Tenant'],
  },
  {
    id: 2, type: 'maintenance', read: false, time: '12 min ago',
    title: "New Maintenance Request — Anna Keller",
    body: "Anna Keller submitted a new maintenance request for a sink leak in Unit 5D, Lakeside Complex. Marked as High priority.",
    meta: { Tenant: 'Anna Keller', Property: 'Lakeside Complex', Unit: 'Unit 5D', Issue: 'Sink Leak', Priority: 'High' },
    actions: ['View Request'],
  },
  {
    id: 3, type: 'maintenance', read: false, time: '1 hr ago',
    title: "Maintenance Update — Bright Electric",
    body: "Vendor Bright Electric has completed the electrical repair in Greenwood Apartment Unit 3B. Request MR-00223 is now Resolved.",
    meta: { Vendor: 'Bright Electric', Property: 'Greenwood Apartment', Unit: 'Unit 3B', 'Request ID': 'MR-00223', Status: 'Resolved' },
    actions: ['View Request'],
  },
  {
    id: 4, type: 'lease', read: true, time: '2 hrs ago',
    title: "Lease Expiring Soon — Jay Willis",
    body: "Jay Willis's lease for Greenwood Apartment Unit 5D is expiring in 30 days on Dec 31, 2027. Consider sending a renewal offer.",
    meta: { Tenant: 'Jay Willis', Property: 'Greenwood Apartment', Unit: 'Unit 5D', 'Expiry Date': 'Dec 31, 2027', 'Days Left': '30' },
    actions: ['Send Renewal', 'View Lease'],
  },
  {
    id: 5, type: 'lease', read: true, time: '4 hrs ago',
    title: "New Lease Signed — Sarrah Johnson",
    body: "Sarrah Johnson has signed the lease agreement for Lakeside Complex Unit 7A. Lease period: Jan 2026 – Dec 2027.",
    meta: { Tenant: 'Sarrah Johnson', Property: 'Lakeside Complex', Unit: 'Unit 7A', 'Lease Start': 'Jan 1, 2026', 'Lease End': 'Dec 31, 2027' },
    actions: ['View Lease'],
  },
  {
    id: 6, type: 'rent', read: true, time: 'Yesterday',
    title: "Payment Received — Karl Earl",
    body: "Karl Earl has successfully paid $1,050 for Greenwood Apartment Unit B-201 via Bank Transfer on Feb 15, 2027.",
    meta: { Tenant: 'Karl Earl', Property: 'Greenwood Apartment', Unit: 'Unit B-201', Amount: '$1,050', Method: 'Bank Transfer' },
    actions: ['View Payment'],
  },
  {
    id: 7, type: 'system', read: true, time: 'Yesterday',
    title: "System Update — New Features Available",
    body: "The platform has been updated with new features including: Tenant management improvements, Document upload functionality, Enhanced reporting dashboard, and Real-time notification system.",
    meta: {},
    actions: ['Learn More'],
  },
  {
    id: 8, type: 'maintenance', read: true, time: '2 days ago',
    title: "Vendor Assigned — Top Roof Repair",
    body: "Top Roof Repair has been assigned to handle the roofing issue in Lakeside Complex Unit 2F (Request MR-00313).",
    meta: { Vendor: 'Top Roof Repair', Property: 'Lakeside Complex', Unit: 'Unit 2F', 'Request ID': 'MR-00313' },
    actions: ['View Request'],
  },
  {
    id: 9, type: 'rent', read: true, time: '3 days ago',
    title: "Payment Due Reminder — Rebacca Smalls",
    body: "Rebacca Smalls's rent of $5,000 for Greenwood Apartment Unit 3B is due in 3 days on Feb 20, 2027.",
    meta: { Tenant: 'Rebacca Smalls', Property: 'Greenwood Apartment', Unit: 'Unit 3B', Amount: '$5,000', 'Due Date': 'Feb 20, 2027' },
    actions: ['Send Reminder', 'View Tenant'],
  },
]

// ─── Helpers ───────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<NotifType, { label: string; icon: React.ReactNode; color: string; bg: string; dot: string }> = {
  rent:        { label: 'Rent',        icon: <CreditCard size={15}/>, color: 'text-blue-600',   bg: 'bg-blue-100',   dot: 'bg-blue-500' },
  maintenance: { label: 'Maintenance', icon: <Wrench size={15}/>,    color: 'text-orange-600', bg: 'bg-orange-100', dot: 'bg-orange-500' },
  lease:       { label: 'Lease',       icon: <FileText size={15}/>,  color: 'text-purple-600', bg: 'bg-purple-100', dot: 'bg-purple-500' },
  system:      { label: 'System',      icon: <Settings2 size={15}/>, color: 'text-gray-600',   bg: 'bg-gray-100',   dot: 'bg-gray-500' },
}

// ─── Detail Modal ──────────────────────────────────────────────────────────

function NotifDetailModal({ notif, onClose }: { notif: Notification; onClose: () => void }) {
  const cfg = TYPE_CONFIG[notif.type]

  return (
    <LandlordModal title="Notification Details" onClose={onClose} size="md">
      <div className="space-y-5">
        {/* Type badge + time */}
        <div className="flex items-center justify-between">
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
            {cfg.icon} {cfg.label}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock size={12}/> {notif.time}
          </span>
        </div>

        {/* Title + body */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <h3 className="text-base font-bold text-gray-900 mb-2">{notif.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{notif.body}</p>
        </div>

        {/* Meta grid */}
        {notif.meta && Object.keys(notif.meta).length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Details</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(notif.meta).map(([k, v]) => (
                <div key={k} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 font-medium mb-0.5">{k}</p>
                  <p className="text-sm font-bold text-gray-900">{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="btn-outline flex-1 py-2.5">Close</button>
          {notif.actions.map((a) => (
            <button key={a} onClick={onClose} className="btn-primary flex-1 py-2.5">{a}</button>
          ))}
        </div>
      </div>
    </LandlordModal>
  )
}

// ─── Single Notification Card ──────────────────────────────────────────────

function NotifCard({
  notif,
  onRead,
  onDelete,
  onView,
}: {
  notif: Notification
  onRead: (id: number) => void
  onDelete: (id: number) => void
  onView: (n: Notification) => void
}) {
  const cfg = TYPE_CONFIG[notif.type]

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-200 overflow-hidden group
        ${notif.read
          ? 'bg-white border-gray-100 shadow-sm'
          : 'bg-white border-l-4 shadow-md'
        }
        ${!notif.read && notif.type === 'rent'        ? 'border-l-blue-500'   : ''}
        ${!notif.read && notif.type === 'maintenance' ? 'border-l-orange-500' : ''}
        ${!notif.read && notif.type === 'lease'       ? 'border-l-purple-500' : ''}
        ${!notif.read && notif.type === 'system'      ? 'border-l-gray-400'   : ''}
      `}
    >
      {/* Unread dot */}
      {!notif.read && (
        <span className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
      )}

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.color}`}>
            {cfg.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <p className={`text-sm font-bold truncate ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                {notif.title}
              </p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{notif.body}</p>

            {/* Quick meta pills */}
            {notif.meta && Object.keys(notif.meta).length > 0 && (
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {Object.entries(notif.meta).slice(0, 3).map(([k, v]) => (
                  <span key={k} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {k}: <span className="font-semibold">{v}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Time + actions row */}
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={11}/>{notif.time}
              </span>
              <div className="flex items-center gap-3">
                {notif.actions.map((a) => (
                  <button key={a} onClick={() => onView(notif)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1">
                    {a === 'View Request' || a === 'View Lease' || a === 'View Tenant' || a === 'View Payment'
                      ? <><Eye size={11}/>{a}</>
                      : a
                    }
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover action strip */}
      <div className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1 bg-white border border-gray-100 rounded-xl shadow-sm px-1.5 py-1">
        {!notif.read && (
          <button onClick={() => onRead(notif.id)} title="Mark as read"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-green-600 transition-colors">
            <CheckCircle2 size={14}/>
          </button>
        )}
        <button onClick={() => onView(notif)} title="View details"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors">
          <Eye size={14}/>
        </button>
        <button onClick={() => onDelete(notif.id)} title="Delete"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors">
          <Trash2 size={14}/>
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────

const TABS = [
  { key: 'All',         label: 'All',         icon: <Bell size={13}/> },
  { key: 'rent',        label: 'Rent',        icon: <CreditCard size={13}/> },
  { key: 'maintenance', label: 'Maintenance', icon: <Wrench size={13}/> },
  { key: 'lease',       label: 'Lease',       icon: <FileText size={13}/> },
  { key: 'system',      label: 'System',      icon: <Settings2 size={13}/> },
]

export default function NotificationsPage() {
  const [items, setItems]         = useState<Notification[]>(INITIAL)
  const [activeTab, setActiveTab] = useState('All')
  const [showUnread, setShowUnread] = useState(false)
  const [viewNotif, setViewNotif] = useState<Notification | null>(null)

  // Counts
  const unreadCount = useMemo(() => items.filter(n => !n.read).length, [items])
  const tabCounts   = useMemo(() => {
    const c: Record<string, number> = { All: items.filter(n => !n.read).length }
    for (const t of ['rent','maintenance','lease','system'] as NotifType[]) {
      c[t] = items.filter(n => n.type === t && !n.read).length
    }
    return c
  }, [items])

  // Filtered
  const filtered = useMemo(() => {
    let list = activeTab === 'All' ? items : items.filter(n => n.type === activeTab)
    if (showUnread) list = list.filter(n => !n.read)
    return list
  }, [items, activeTab, showUnread])

  const markRead   = (id: number) => setItems(p => p.map(n => n.id === id ? { ...n, read: true } : n))
  const deleteNotif = (id: number) => setItems(p => p.filter(n => n.id !== id))
  const markAllRead = () => setItems(p => p.map(n => ({ ...n, read: true })))

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {unreadCount > 0
              ? <><span className="font-semibold text-gray-800">{unreadCount}</span> unread notification{unreadCount !== 1 ? 's' : ''}</>
              : 'You\'re all caught up!'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUnread(p => !p)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${showUnread ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            <Filter size={12}/> {showUnread ? 'All' : 'Unread only'}
          </button>
          {unreadCount > 0 && (
            <button onClick={markAllRead}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
              <CheckCheck size={12}/> Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Summary pills */}
      <div className="grid grid-cols-4 gap-3">
        {(['rent','maintenance','lease','system'] as NotifType[]).map(type => {
          const cfg = TYPE_CONFIG[type]
          const unread = items.filter(n => n.type === type && !n.read).length
          const total  = items.filter(n => n.type === type).length
          return (
            <button key={type} onClick={() => { setActiveTab(type); setShowUnread(false) }}
              className={`card p-3 text-left hover:shadow-md transition-all ${activeTab === type ? 'ring-2 ring-gray-900' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${cfg.bg} ${cfg.color}`}>
                {cfg.icon}
              </div>
              <p className="text-lg font-bold text-gray-900">{total}</p>
              <p className="text-xs text-gray-500 font-medium">{cfg.label}</p>
              {unread > 0 && (
                <span className={`inline-block mt-1 text-xs font-bold px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                  {unread} new
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0 border-b border-gray-200">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === t.key ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {t.icon} {t.label}
            {tabCounts[t.key] > 0 && (
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                {tabCounts[t.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center text-gray-400">
          <Bell size={40} className="mx-auto mb-3 text-gray-200"/>
          <p className="font-semibold text-gray-500">No notifications</p>
          <p className="text-xs mt-1">
            {showUnread ? 'No unread notifications in this category.' : 'Nothing here yet.'}
          </p>
          {showUnread && (
            <button onClick={() => setShowUnread(false)} className="mt-3 text-xs text-blue-600 hover:underline">
              Show all notifications
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Unread group */}
          {filtered.some(n => !n.read) && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                Unread · {filtered.filter(n => !n.read).length}
              </p>
              <div className="space-y-2">
                {filtered.filter(n => !n.read).map(n => (
                  <NotifCard key={n.id} notif={n} onRead={markRead} onDelete={deleteNotif} onView={setViewNotif}/>
                ))}
              </div>
            </div>
          )}

          {/* Read group */}
          {filtered.some(n => n.read) && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1 mt-4">
                Earlier · {filtered.filter(n => n.read).length}
              </p>
              <div className="space-y-2">
                {filtered.filter(n => n.read).map(n => (
                  <NotifCard key={n.id} notif={n} onRead={markRead} onDelete={deleteNotif} onView={setViewNotif}/>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detail modal */}
      {viewNotif && (
        <NotifDetailModal
          notif={viewNotif}
          onClose={() => { markRead(viewNotif.id); setViewNotif(null) }}
        />
      )}
    </div>
  )
}
