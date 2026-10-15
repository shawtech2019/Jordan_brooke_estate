import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import { httpGet, httpPutWithToken } from '../../utils/api_utils'

type PreferenceKey =
  | 'maintenance'
  | 'payments'
  | 'announcements'
  | 'lease'
  | 'visitors'

interface NotificationPreferences {
  email: boolean
  sms: boolean
  maintenance: boolean
  payments: boolean
  announcements: boolean
  lease: boolean
  visitors: boolean
}

interface PreferencesResponse {
  status: string
  preferences: NotificationPreferences
}

const CHANNELS: { key: PreferenceKey; label: string; desc: string }[] = [
  { key: 'maintenance', label: 'Maintenance Updates', desc: 'Get notified when your maintenance request status changes' },
  { key: 'payments', label: 'Payment Reminders', desc: 'Receive reminders 3 days before rent is due' },
  { key: 'announcements', label: 'Announcements', desc: 'Building-wide announcements from property management' },
  { key: 'lease', label: 'Lease Alerts', desc: 'Important reminders about your lease expiration and renewals' },
  { key: 'visitors', label: 'Visitor Check-ins', desc: 'Alerts when your registered visitors check in to the building' },
]

export default function NotificationPage() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [prefs, setPrefs] = useState<NotificationPreferences | null>(null)

  /* Load current preferences */
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Please log in to manage notifications')
      navigate('/login')
      return
    }

    let active = true
    ;(async () => {
      try {
        const res = await httpGet<PreferencesResponse>('profile/notifications')
        if (active) setPrefs(res.preferences)
      } catch (error: unknown) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to load notification settings'
        )
      } finally {
        if (active) setLoading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [navigate])

  const toggle = (key: PreferenceKey) => {
    setPrefs(prev => (prev ? { ...prev, [key]: !prev[key] } : prev))
    setSaved(false)
  }

  const handleSave = async () => {
    if (!prefs) return

    try {
      setSaving(true)
      const res = await httpPutWithToken<PreferencesResponse>('profile/notifications', {
        maintenance: prefs.maintenance,
        payments: prefs.payments,
        announcements: prefs.announcements,
        lease: prefs.lease,
        visitors: prefs.visitors,
      })
      setPrefs(res.preferences)
      setSaved(true)
      toast.success('Notification settings saved')
      setTimeout(() => setSaved(false), 2000)
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = async () => {
    try {
      const res = await httpGet<PreferencesResponse>('profile/notifications')
      setPrefs(res.preferences)
      setSaved(false)
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to reset settings')
    }
  }

  if (loading || !prefs) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-2 py-24 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-sm">Loading settings...</span>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <h1 className="text-2xl font-display font-bold text-gray-900">Notification Settings</h1>

      <div className="card overflow-hidden">
        {/* Description */}
        <div className="p-6 border-b border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            Manage your notification preferences for email and SMS updates related to your tenant
            activities at Oakwood Complex.
          </p>
        </div>

        {/* Email Notifications */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-2">Email Notifications</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Receive important updates via email about check-ins, service
                requests, announcements and property agent.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
              <input
                type="checkbox"
                checked={prefs.email}
                onChange={() => {
                  setPrefs({ ...prefs, email: !prefs.email })
                  setSaved(false)
                }}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-2">SMS Notifications</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Receive critical alerts via text message about check-ins and service
                requests.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
              <input
                type="checkbox"
                checked={prefs.sms}
                onChange={() => {
                  setPrefs({ ...prefs, sms: !prefs.sms })
                  setSaved(false)
                }}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-6 bg-gray-50 border-b border-gray-100">
          <p className="text-sm text-gray-500 leading-relaxed">
            Message and data rates may apply for SMS notifications. To opt-out of SMS alerts,
            text STOP to the message.
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="btn-outline px-6 py-2.5 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60 ${saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Additional notification channels */}
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Notification Channels</h2>
        <div className="space-y-3">
          {CHANNELS.map(item => (
            <div key={item.key} className="flex items-start justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={prefs[item.key]}
                  onChange={() => toggle(item.key)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
