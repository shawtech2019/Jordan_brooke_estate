import type { ReactNode } from 'react'

interface PageShellProps {
  breadcrumb: string
  subtitle: string
  actions?: ReactNode
  children: ReactNode
}

export default function PageShell({ breadcrumb, subtitle, actions, children }: PageShellProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden  rounded-xl border border-slate-200 bg-white shadow-card">
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <span className="absolute left-0 top-0 h-full w-1 bg-brand-rail" />
        <div className="border-b border-slate-100 px-6 pb-2 pt-3 text-sm font-medium text-slate-400">
          {breadcrumb}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
          <h2 className="text-2xl font-bold text-[#B62931] font-display tracking-normal font-bold">{subtitle}</h2>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
        <div className="flex-1 overflow-auto px-6 py-6">{children}</div>
      </div>
    </div>
  )
}
