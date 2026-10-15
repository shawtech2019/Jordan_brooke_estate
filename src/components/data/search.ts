import { permissionGroups, roleColumns } from './permissions'
import { systemUsers } from './users'
import type { SearchResult } from './types'

const pageResults: SearchResult[] = [
  {
    id: 'page-settings',
    type: 'page',
    title: 'System Settings',
    subtitle: 'Localization, security, integrations',
    path: '/admin/system-settings',
  },
  {
    id: 'page-roles',
    type: 'page',
    title: 'Role & Permission (RBAC)',
    subtitle: 'Manage role access across the system',
    path: '/admin/roles',
  },
  {
    id: 'page-users',
    type: 'page',
    title: 'User Management',
    subtitle: 'Invite, suspend, and audit users',
    path: '/admin/users',
  },
  {
    id: 'page-logs',
    type: 'page',
    title: 'Logs & Audits',
    subtitle: 'System-wide activity trail',
    path: '/admin/logs',
  },
  {
    id: 'page-support',
    type: 'page',
    title: 'Support',
    subtitle: 'FAQs and open tickets',
    path: '/admin/support',
  },
]

const userResults: SearchResult[] = systemUsers.map((user) => ({
  id: `user-${user.id}`,
  type: 'user',
  title: user.name,
  subtitle: `${user.role} \u00b7 ${user.email}`,
  path: '/admin/users',
}))

const permissionResults: SearchResult[] = permissionGroups.flatMap((group) =>
  group.rows.map((row) => ({
    id: `perm-${group.title}-${row.label}`,
    type: 'role-permission' as const,
    title: row.label,
    subtitle: `${group.title} \u00b7 ${roleColumns.length} roles`,
    path: '/admin/roles',
  }))
)

export const searchIndex: SearchResult[] = [...pageResults, ...userResults, ...permissionResults]

export function searchAll(query: string, limit = 8): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return searchIndex
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
    )
    .slice(0, limit)
}
