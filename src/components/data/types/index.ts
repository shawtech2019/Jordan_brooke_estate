export type AccessLevel = 'Open' | 'Limited' | 'Denied' | 'Grant Access'

export interface RolePermissionRow {
  label: string
  values: Record<RoleKey, AccessLevel>
}

export interface PermissionGroup {
  title: string
  rows: RolePermissionRow[]
}

export type RoleKey = string

export interface RoleColumn {
  key: RoleKey
  label: string
}

export type UserStatus = 'Active' | 'Suspended'
export type MfaStatus = 'Enable' | 'Disable'

export interface SystemUser {
  id: string
  name: string
  email: string
  role: string
  status: UserStatus
  mfaStatus: MfaStatus
  lastLogin: string
  ipAddress: string
  avatarInitials: string
}

export type AuditSeverity = 'info' | 'warning' | 'critical'

export interface AuditLogEntry {
  id: string
  timestamp: string
  actor: string
  action: string
  target: string
  category: 'Security' | 'Financial' | 'User Management' | 'System' | 'Access Control'
  ipAddress: string
  severity: AuditSeverity
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface SupportTicket {
  id: string
  subject: string
  status: 'Open' | 'In Progress' | 'Resolved'
  updated: string
  priority: 'Low' | 'Medium' | 'High'
}

export type SearchResultType = 'page' | 'user' | 'role-permission'

export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  subtitle: string
  path: string
}

