import type { FaqItem, SupportTicket } from './types'

export const faqItems: FaqItem[] = [
  {
    id: '1',
    question: 'How do I reset a user\u2019s MFA device?',
    answer:
      'Go to User Management, select the user, open the row actions menu, and choose Reset MFA. The user will be asked to re-enroll a device the next time they sign in.',
  },
  {
    id: '2',
    question: 'Why is the Venco Utility Link showing as disconnected?',
    answer:
      'Utility integrations disconnect automatically if the linked credentials expire or the vendor rotates their API keys. Reconnect it from System Settings \u2192 API & Integrations \u2192 Setup.',
  },
  {
    id: '3',
    question: 'Can I give a role temporary access instead of permanent access?',
    answer:
      'Not yet from the Role & Permissions screen directly \u2014 for time-boxed access, use Impersonate from User Management, which is logged and automatically expires.',
  },
  {
    id: '4',
    question: 'What counts toward the Give Access Latency metric?',
    answer:
      'It\u2019s the average time between a permission check request and the system granting or denying it, measured over the last 24 hours across all roles.',
  },
  {
    id: '5',
    question: 'How long are audit logs retained?',
    answer:
      'Logs are retained for 24 months by default. Reach out to support if your compliance requirements need a longer retention window.',
  },
]

export const supportTickets: SupportTicket[] = [
  {
    id: '1',
    subject: 'Stripe payouts delayed for Lekki Gardens block',
    status: 'In Progress',
    updated: '2 hours ago',
    priority: 'High',
  },
  {
    id: '2',
    subject: 'Add a new "Regional Manager" role',
    status: 'Open',
    updated: '1 day ago',
    priority: 'Medium',
  },
  {
    id: '3',
    subject: 'Export audit log to CSV for Q2 review',
    status: 'Resolved',
    updated: '5 days ago',
    priority: 'Low',
  },
]
