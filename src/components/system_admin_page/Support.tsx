import { useState, type FormEvent, type ReactNode } from 'react'
import { ChevronDown, Mail, MessageCircle, Phone } from 'lucide-react'
import { faqItems, supportTickets } from '../data/supports';
import type { SupportTicket } from '../data/types'
import PageShell from '../layout/system_admin/PageShell';

const ticketStatusStyles: Record<SupportTicket['status'], string> = {
  Open: 'bg-slate-100 text-slate-700',
  'In Progress': 'bg-amber-100 text-amber-800',
  Resolved: 'bg-emerald-100 text-emerald-700',
}

export default function Support() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0]?.id ?? null)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) return
    setSubmitted(true)
    setSubject('')
    setMessage('')
  }

  return (
    <PageShell breadcrumb="System Admin" subtitle="Support">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Contact options */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ContactCard
              icon={<MessageCircle className="h-5 w-5" />}
              title="Live chat"
              detail="Mon–Fri, 8am–6pm WAT"
            />
            <ContactCard
              icon={<Mail className="h-5 w-5" />}
              title="support@jordanbrk.com"
              detail="Replies within 1 business day"
            />
            <ContactCard
              icon={<Phone className="h-5 w-5" />}
              title="+234 700 555 0134"
              detail="For urgent access issues"
            />
          </section>

          {/* FAQ */}
          <section className="rounded-lg border border-slate-200 px-5 py-4">
            <h3 className="mb-3 text-base font-semibold text-slate-900">
              Frequently asked questions
            </h3>
            <div className="divide-y divide-slate-100">
              {faqItems.map((item) => {
                const isOpen = openFaqId === item.id
                return (
                  <div key={item.id} className="py-2">
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-2 text-left text-sm font-medium text-slate-800"
                    >
                      {item.question}
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-2 pr-8 text-sm text-slate-600">{item.answer}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Contact form */}
          <section className="rounded-lg border border-slate-200 px-5 py-4">
            <h3 className="mb-3 text-base font-semibold text-slate-900">Send a message</h3>
            {submitted && (
              <div className="mb-3 rounded-md border border-status-open/30 bg-status-open/10 px-3 py-2 text-sm font-medium text-status-open">
                Thanks — your message has been sent. Expect a reply within 1 business day.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Stripe payouts delayed"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-accent"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the issue, including any error messages"
                  className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-accent"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Send message
              </button>
            </form>
          </section>
        </div>

        {/* Tickets sidebar */}
        <aside className="h-fit rounded-lg border border-slate-200 px-5 py-4">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Your tickets</h3>
          <div className="space-y-4">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm font-medium text-slate-800">{ticket.subject}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${ticketStatusStyles[ticket.status]}`}
                  >
                    {ticket.status}
                  </span>
                  <span className="text-xs text-slate-500">{ticket.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </PageShell>
  )
}

function ContactCard({
  icon,
  title,
  detail,
}: {
  icon: ReactNode
  title: string
  detail: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-200 px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-accentSoft text-slate-700">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{detail}</p>
      </div>
    </div>
  )
}
