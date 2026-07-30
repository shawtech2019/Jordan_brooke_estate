import { Fragment, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { permissionGroups as basePermissionGroups, roleColumns as baseRoleColumns } from '../data/permissions'
import type { AccessLevel, RoleColumn } from '../data/types'
import PageShell from '../layout/system_admin/PageShell'
import StatusBadge from '../layout/system_admin/StatusBadge'
import AddRoleModal from '../layout/system_admin/AddRoleModal'

export default function RolePermissions() {
  const [conflictView, setConflictView] = useState(false)
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [customRoles, setCustomRoles] = useState<RoleColumn[]>([])
  const [banner, setBanner] = useState('')
  const [activeRole, setActiveRole] = useState(0);

  const roleColumns = useMemo(() => [...baseRoleColumns, ...customRoles], [customRoles])

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return basePermissionGroups
    return basePermissionGroups
      .map((group) => ({
        ...group,
        rows: group.rows.filter(
          (row) =>
            row.label.toLowerCase().includes(q) || group.title.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.rows.length > 0)
  }, [query])

  const handleCreateRole = (roleName: string) => {
    const key = `custom-${roleName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
    setCustomRoles((prev) => [...prev, { key, label: roleName }])
    setBanner(`"${roleName}" was added. New roles start with every permission denied — adjust them below.`)
  }

  const valueFor = (values: Record<string, AccessLevel>, key: string): AccessLevel =>
    values[key] ?? 'Denied'

  return (
    <PageShell
      breadcrumb="RBAC"
      subtitle="Role & Permissions"
      actions={
        <>
          <div className="relative font-display">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search permissions"
              className="w-56 rounded-md border border-slate-200 py-2 pl-9 pr-8 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-accent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="whitespace-nowrap rounded-md border border-slate-300 cursor-pointer bg-[#B62931] px-5 py-2 text-sm font-semibold text-[#ffffff] shadow-sm hover:bg-[#B62932]/90"
          >
            Add New Role
          </button>
        </>
      }
    >
      {banner && (
        <div className="mb-4 flex items-start justify-between gap-3 rounded-md border border-brand-accent/40 bg-brand-accentSoft px-4 py-3 text-sm text-slate-800">
          <p>{banner}</p>
          <button
            onClick={() => setBanner('')}
            aria-label="Dismiss"
            className="text-slate-500 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-[900px] w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-56 border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">
                Permissions
              </th>
              {roleColumns.map((col, idx) => (
                <th
                  key={col.key}
                  onClick={() => setActiveRole(idx)}
                //   className={`border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-700 ${
                //     idx === 0 ? 'bg-brand-accent/70' : ''
                //   }`}
                className={`px-4 py-3 font-medium cursor-pointer text-center font-sans ${
                    idx === activeRole ? "bg-[#e5e5e5] text-[#302E2E]" : "text-ink/80"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredGroups.length === 0 ? (
              <tr>
                <td
                  colSpan={roleColumns.length + 1}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No permissions match "{query}".
                </td>
              </tr>
            ) : (
              filteredGroups.map((group) => (
                <Fragment key={group.title}>
                  <tr>
                    <td
                      colSpan={roleColumns.length + 1}
                      className="border-b border-slate-100 bg-slate-50 px-4 py-2 font-semibold text-slate-800"
                    >
                      {group.title}
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-b border-slate-100 last:border-b-0">
                      <td className="px-4 py-3 text-slate-700">{row.label}</td>
                      {roleColumns.map((col, idx) => (
                        <td
                          key={col.key}
                        //   className={`px-4 py-3 ${idx === 0 ? 'bg-brand-accent/20' : ''}`}
                        className={`px-4 py-3 text-center ${idx === activeRole ? "bg-[#e5e5e5]" : ""}`}
                        >
                          <StatusBadge level={valueFor(row.values, col.key)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        <span className="text-sm font-medium text-slate-700">Conflict View</span>
        <button
          role="switch"
          aria-checked={conflictView}
          onClick={() => setConflictView((v) => !v)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
            conflictView ? 'bg-brand-accent' : 'bg-slate-900'
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              conflictView ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <section className="mt-6 rounded-lg border border-slate-200 px-5 py-4">
        <h3 className="mb-4 text-base font-semibold text-slate-900">User Details &amp; Audit</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Admin (Global)</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Status</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-900">
              <span className="h-2 w-2 rounded-full bg-status-open" /> Active
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">User</p>
            <p className="mt-1 text-sm font-medium text-slate-900">4</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Created By</p>
            <p className="mt-1 text-sm font-medium text-slate-900">SuperAdmin (Oct 5, 2027)</p>
          </div>
          <div className="col-span-2 sm:col-span-4">
            <p className="text-xs text-slate-500">Audit</p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              Last Updated by John D. (Oct 10, 2027)
            </p>
          </div>
        </div>
      </section>

      <AddRoleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateRole}
      />
    </PageShell>
  )
}
