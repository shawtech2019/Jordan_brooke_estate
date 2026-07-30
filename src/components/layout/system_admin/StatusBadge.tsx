import type { AccessLevel } from '../../data/types'

const dotColor: Record<AccessLevel, string> = {
  Open: 'bg-[#1FA855]',
  Limited: 'bg-[#D9A61B]',
  Denied: 'bg-[#C0392B]',
  'Grant Access': 'bg-status-open',
}

const textColor: Record<AccessLevel, string> = {
  Open: 'text-slate-700',
  Limited: 'text-slate-700',
  Denied: 'text-slate-700',
  'Grant Access': 'text-slate-900 font-medium',
}

export default function StatusBadge({ level }: { level: AccessLevel }) {
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${textColor[level]}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor[level]}`} />
      {level}
    </span>
  )
}
