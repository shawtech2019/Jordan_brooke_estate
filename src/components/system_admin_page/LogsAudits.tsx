import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { auditLogs } from '../data/auditLogs'
import type { AuditSeverity } from '../data/types'
import PageShell from '../layout/system_admin/PageShell'

const ALL = 'All'

const severityStyles: Record<AuditSeverity, string> = {
  info: 'bg-slate-100 text-slate-700',
  warning: 'bg-amber-100 text-amber-800',
  critical: 'bg-red-100 text-red-700',
}

const severityDot: Record<AuditSeverity, string> = {
  info: 'bg-slate-400',
  warning: 'bg-status-limited',
  critical: 'bg-status-denied',
}

export default function LogsAudits() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL)
  const [severity, setSeverity] = useState<'All' | AuditSeverity>(ALL)

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(auditLogs.map((l) => l.category)))],
    []
  )

  const filteredLogs = useMemo(() => {
    const q = query.trim().toLowerCase()
    return auditLogs.filter((log) => {
      const matchesQuery =
        !q ||
        log.actor.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.target.toLowerCase().includes(q)
      const matchesCategory = category === ALL || log.category === category
      const matchesSeverity = severity === ALL || log.severity === severity
      return matchesQuery && matchesCategory && matchesSeverity
    })
  }, [query, category, severity])

  const criticalCount = auditLogs.filter((l) => l.severity === 'critical').length

  return (
    <PageShell
      breadcrumb="System Admin"
      subtitle="Logs & Audits"
      actions={
        <>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search actor, action, or target"
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
          <button className="whitespace-nowrap rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50">
            Export CSV
          </button>
        </>
      }
    >
      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryCard label="Total Events" value={String(auditLogs.length)} />
        <SummaryCard label="Critical Events" value={String(criticalCount)} tone="critical" />
        <SummaryCard label="Retention Window" value="24 months" />
        <SummaryCard label="Last Event" value={auditLogs[0].timestamp.split(' \u00b7 ')[1]} />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500">Category</span>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              category === c
                ? 'border-brand-accent bg-brand-accentSoft text-slate-900'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {c}
          </button>
        ))}
        <span className="ml-4 text-xs font-medium text-slate-500">Severity</span>
        {(['All', 'info', 'warning', 'critical'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSeverity(s)}
            className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
              severity === s
                ? 'border-brand-accent bg-brand-accentSoft text-slate-900'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-[900px] w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-slate-700">
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">Timestamp</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">Actor</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">Action</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">Target</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">Category</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">IP Address</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">Severity</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                  No log entries match your search or filters.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-slate-100 last:border-b-0">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">{log.timestamp}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{log.actor}</td>
                  <td className="px-4 py-3 text-slate-700">{log.action}</td>
                  <td className="px-4 py-3 text-slate-600">{log.target}</td>
                  <td className="px-4 py-3 text-slate-600">{log.category}</td>
                  <td className="px-4 py-3 text-slate-600">{log.ipAddress}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${severityStyles[log.severity]}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${severityDot[log.severity]}`} />
                      {log.severity}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </PageShell>
  )
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: 'critical'
}) {
  return (
    <div className="rounded-lg border border-slate-200 px-4 py-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 text-xl font-bold ${tone === 'critical' ? 'text-status-denied' : 'text-slate-900'}`}>
        {value}
      </p>
    </div>
  )
}
