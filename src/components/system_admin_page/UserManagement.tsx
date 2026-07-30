import { useMemo, useState } from 'react'
import { MoreHorizontal, SlidersHorizontal, Search, X } from 'lucide-react'
import { systemUsers } from '../data/users'
import type { SystemUser } from '../data/types'
import PageShell from '../layout/system_admin/PageShell'

const ALL = 'All'

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState<SystemUser>(systemUsers[0])
  const [filterOpen, setFilterOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState(ALL)
  const [statusFilter, setStatusFilter] = useState(ALL)
  const [mfaFilter, setMfaFilter] = useState(ALL)

  const roleOptions = useMemo(
    () => [ALL, ...Array.from(new Set(systemUsers.map((u) => u.role)))],
    []
  )

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return systemUsers.filter((user) => {
      const matchesQuery =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.role.toLowerCase().includes(q)
      const matchesRole = roleFilter === ALL || user.role === roleFilter
      const matchesStatus = statusFilter === ALL || user.status === statusFilter
      const matchesMfa = mfaFilter === ALL || user.mfaStatus === mfaFilter
      return matchesQuery && matchesRole && matchesStatus && matchesMfa
    })
  }, [query, roleFilter, statusFilter, mfaFilter])

  const activeFilterCount =
    (roleFilter !== ALL ? 1 : 0) + (statusFilter !== ALL ? 1 : 0) + (mfaFilter !== ALL ? 1 : 0)

  const clearFilters = () => {
    setRoleFilter(ALL)
    setStatusFilter(ALL)
    setMfaFilter(ALL)
  }

  return (
    <PageShell
      breadcrumb="Admin"
      subtitle="User Management"
      actions={
        <>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, or role"
              className="w-64 rounded-md border border-slate-200 py-2 pl-9 pr-8 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-accent"
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
            onClick={() => setFilterOpen((v) => !v)}
            className="relative flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent text-xs font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          <button className="whitespace-nowrap rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50">
            Invite New User
          </button>
        </>
      }
    >
      <div className="relative">
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-[900px] w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-slate-700">
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Name</th>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Email</th>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Role</th>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Status</th>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">MFA Status</th>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Last Login</th>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">IP Address</th>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-500">
                    No users match your search or filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`cursor-pointer border-b border-slate-100 last:border-b-0 hover:bg-slate-50 ${
                      selectedUser.id === user.id ? 'bg-brand-accentSoft/60' : ''
                    }`}
                  >
                    <td className="flex items-center gap-3 px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600">
                        {user.avatarInitials}
                      </span>
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{user.email}</td>
                    <td className="px-4 py-3 text-slate-700">{user.role}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`flex items-center gap-2 font-medium ${
                          user.status === 'Active' ? 'text-status-open' : 'text-status-denied'
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            user.status === 'Active' ? 'bg-status-open' : 'bg-status-denied'
                          }`}
                        />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{user.mfaStatus}</td>
                    <td className="px-4 py-3 text-slate-600">{user.lastLogin}</td>
                    <td className="px-4 py-3 text-slate-600">{user.ipAddress}</td>
                    <td className="px-4 py-3">
                      <button
                        aria-label="Row actions"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filterOpen && (
          <div className="absolute right-0 top-0 z-10 w-72 space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Filter</p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-brand-accent hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            <SelectField
              label="Role"
              value={roleFilter}
              onChange={setRoleFilter}
              options={roleOptions}
            />
            <SelectField
              label="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[ALL, 'Active', 'Suspended']}
            />
            <SelectField
              label="MFA Status"
              value={mfaFilter}
              onChange={setMfaFilter}
              options={[ALL, 'Enable', 'Disable']}
            />
            <div>
              <p className="mb-1 text-xs text-slate-500">Property Complex</p>
              <div className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-400">
                All complexes
              </div>
            </div>
            <button
              onClick={() => setFilterOpen(false)}
              className="w-full rounded-md bg-slate-900 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Apply filters
            </button>
          </div>
        )}
      </div>

      <section className="mt-6 rounded-lg border border-slate-200 px-5 py-4">
        <h3 className="mb-4 text-base font-semibold text-slate-900">User Details &amp; Audit</h3>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-600">
            {selectedUser.avatarInitials}
          </span>
          <p className="text-base font-semibold text-slate-900">{selectedUser.name}</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-slate-500">Primary Role</p>
            <p className="mt-1 text-sm font-medium text-slate-900">{selectedUser.role}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Created by</p>
            <p className="mt-1 text-sm font-medium text-slate-900">SuperAdmin (Oct 1, 2023)</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">MFA Method</p>
            <p className="mt-1 text-sm font-medium text-slate-900">Auth App</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Audit</p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              Last Permission Change by John D. (Oct 10, 2023)
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-slate-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand-accent"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
