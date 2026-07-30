import { useState, type ReactNode } from 'react'
import PageShell from '../layout/system_admin/PageShell';

type SettingsTab = 'security' | 'api' | 'financial' | 'customization'

const tabs: { key: SettingsTab; label: string }[] = [
  { key: 'security', label: 'Security & Authentication' },
  { key: 'api', label: 'API & Integrations' },
  { key: 'financial', label: 'Financial Rules' },
  { key: 'customization', label: 'Customization' },
]

const localizationFields = [
  { label: 'Default Currency', value: 'NGN  (Nigeria Naira)' },
  { label: 'Time Zone', value: 'WAT - West Africa Time (Lagos)' },
  { label: 'Date Format', value: 'DD/MM/YYYY' },
  { label: 'Language', value: 'English (UK)' },
]

interface ToggleRowState {
  requireMfa: boolean
  ipWhitelisting: boolean
  passwordComplexity: boolean
}

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('security')
  const [toggles, setToggles] = useState<ToggleRowState>({
    requireMfa: true,
    ipWhitelisting: true,
    passwordComplexity: false,
  })

  const toggle = (key: keyof ToggleRowState) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <PageShell
      breadcrumb="System Settings"
      subtitle="Jordan Brookes System"
      actions={
        <>
          <button className="rounded-md border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button className="rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50">
            Save Changes
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Localization */}
          <section className="overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
              <div className="border-b border-slate-200 bg-white px-5 py-4 sm:border-b-0 sm:border-r">
                <h3 className="mb-3 text-base font-semibold text-slate-900">Localization</h3>
                <nav className="flex flex-col overflow-hidden rounded-md">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-3 py-2.5 text-left text-sm transition-colors ${
                        activeTab === tab.key
                          ? 'bg-brand-accent/70 font-medium text-slate-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="divide-y divide-slate-100 px-5 py-4">
                {localizationFields.map((field) => (
                  <div
                    key={field.label}
                    className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm text-slate-500">{field.label}</span>
                    <div className="flex w-full max-w-xs items-center overflow-hidden rounded-md border border-slate-200 sm:w-64">
                      <span className="flex-1 truncate px-3 py-2 text-sm text-slate-800">
                        {field.value}
                      </span>
                      <button className="border-l border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Change
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Security & Authentication */}
          <section className="rounded-lg border border-slate-200 px-5 py-4">
            <h3 className="mb-4 text-base font-semibold text-slate-900">
              Security &amp; Authentication
            </h3>
            <div className="divide-y divide-slate-100">
              <ToggleRow
                label="Require MFA for all Admin Roles"
                checked={toggles.requireMfa}
                onChange={() => toggle('requireMfa')}
              />
              <ToggleRow
                label="Enable IP Whitelisting (Office IP: 192.168.1.1)"
                checked={toggles.ipWhitelisting}
                onChange={() => toggle('ipWhitelisting')}
              />
              <ToggleRow
                label="Password Complexity (Upper, Lower, Number, Special)"
                checked={toggles.passwordComplexity}
                onChange={() => toggle('passwordComplexity')}
              />
            </div>
          </section>

          {/* API & Integrations */}
          <section className="rounded-lg border border-slate-200 px-5 py-4">
            <h3 className="mb-4 text-base font-semibold text-slate-900">API &amp; Integrations</h3>
            <div className="space-y-4">
              <IntegrationRow label="Access Control API Key">
                <span className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-500">
                  Hidden
                </span>
                <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                  Regenerate
                </button>
              </IntegrationRow>

              <IntegrationRow label="Payment Gateway: Stripe">
                <span className="flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-status-open">
                  <span className="h-2 w-2 rounded-full bg-status-open" />
                  Connected
                </span>
                <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                  Configure
                </button>
              </IntegrationRow>

              <IntegrationRow label="Venco Utility Link">
                <span className="flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-status-denied">
                  <span className="h-2 w-2 rounded-full bg-status-denied" />
                  Disconnected
                </span>
                <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                  Setup
                </button>
              </IntegrationRow>
            </div>
          </section>
        </div>

        {/* Live Audit Trail & Status */}
        <aside className="h-fit rounded-lg border border-slate-200 px-5 py-4">
          <h3 className="mb-4 text-base font-semibold text-slate-900">
            Live Audit Trail &amp; Status
          </h3>
          <dl className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Active Sessions:</dt>
              <dd className="font-semibold text-slate-900">14</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Give Access Latency:</dt>
              <dd className="font-semibold text-slate-900">
                480ms <span className="font-normal text-status-open">(NFR: 500ms)</span>
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Last Confg Change by Admin (Global):</dt>
              <dd className="mt-1 font-medium text-slate-900">2 Hrs Ago</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Data Residency :</dt>
              <dd className="font-semibold text-slate-900">Lagos (NG-01)</dd>
            </div>
          </dl>
        </aside>
      </div>
    </PageShell>
  )
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <span className="h-4 w-4 rounded border border-slate-300" aria-hidden />
        <span className="text-sm text-slate-800">{label}</span>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-brand-accent' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

function IntegrationRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}
