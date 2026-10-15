import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Loader2, ShieldCheck } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import {
  httpGet,
  httpPutWithToken,
  httpUploadWithToken,
  resolveAssetUrl,
} from '../../utils/api_utils'

interface NotificationPreferences {
  email: boolean
  sms: boolean
  maintenance: boolean
  payments: boolean
  announcements: boolean
  lease: boolean
  visitors: boolean
  newRent: boolean
  paymentDue: boolean
  overdueRent: boolean
}

interface UserProfile {
  id: number
  email: string
  firstName: string
  lastName: string
  fullName: string
  phone: string | null
  jobTitle: string | null
  company: string | null
  location: string | null
  avatarUrl: string | null
  notificationPreferences: NotificationPreferences
  twoFactorEnabled: boolean
}

interface ProfileResponse {
  status: string
  user: UserProfile
}

const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/)
  const firstName = parts.shift() || ''
  return { firstName, lastName: parts.join(' ') }
}

const NOTIFICATION_ROWS = [
  { key: 'newRent' as const, label: 'New Rent Payment' },
  { key: 'paymentDue' as const, label: 'Payment Due Reminder' },
  { key: 'overdueRent' as const, label: 'Overdue Rent Alert' },
]

export default function LandlordSettingsPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [savingSecurity, setSavingSecurity] = useState(false)

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [twoFA, setTwoFA] = useState(false)
  const [notifs, setNotifs] = useState({
    newRent: true,
    paymentDue: true,
    overdueRent: true,
  })

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
  })

  const applyUser = (user: UserProfile) => {
    setForm({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
    })
    setAvatarUrl(user.avatarUrl)
    setTwoFA(Boolean(user.twoFactorEnabled))
    setNotifs({
      newRent: user.notificationPreferences?.newRent ?? true,
      paymentDue: user.notificationPreferences?.paymentDue ?? true,
      overdueRent: user.notificationPreferences?.overdueRent ?? true,
    })
  }

  /* Load the signed-in user's profile */
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Please log in to view your settings')
      navigate('/login')
      return
    }

    let active = true
    ;(async () => {
      try {
        const res = await httpGet<ProfileResponse>('profile')
        if (active) applyUser(res.user)
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Failed to load settings')
      } finally {
        if (active) setLoading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [navigate])

  const handleSave = async () => {
    if (!form.fullName.trim()) {
      toast.error('Please enter your full name')
      return
    }

    const { firstName, lastName } = splitName(form.fullName)

    try {
      setSaving(true)
      // Email is intentionally omitted — it cannot be changed.
      const res = await httpPutWithToken<ProfileResponse>('profile', {
        firstName,
        lastName,
        phone: form.phone,
      })
      applyUser(res.user)
      toast.success('Profile updated')
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const toggleNotification = async (
    key: 'newRent' | 'paymentDue' | 'overdueRent',
    value: boolean
  ) => {
    setNotifs((prev) => ({ ...prev, [key]: value })) // optimistic

    try {
      await httpPutWithToken('profile/notifications', { [key]: value })
    } catch (error: unknown) {
      setNotifs((prev) => ({ ...prev, [key]: !value })) // revert
      toast.error(
        error instanceof Error ? error.message : 'Failed to update preference'
      )
    }
  }

  const toggleTwoFA = async (value: boolean) => {
    setTwoFA(value) // optimistic
    setSavingSecurity(true)

    try {
      const res = await httpPutWithToken<ProfileResponse>('profile/security', {
        twoFactorEnabled: value,
      })
      setTwoFA(Boolean(res.user.twoFactorEnabled))
      toast.success(value ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled')
    } catch (error: unknown) {
      setTwoFA(!value) // revert
      toast.error(
        error instanceof Error ? error.message : 'Failed to update security settings'
      )
    } finally {
      setSavingSecurity(false)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      setUploading(true)
      const res = await httpUploadWithToken<ProfileResponse>('profile/avatar', formData)
      setAvatarUrl(res.user.avatarUrl)
      toast.success('Profile photo updated')
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload photo')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const initial = (form.fullName || form.email || 'U').trim().charAt(0).toUpperCase() || 'U'

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 py-24 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-sm">Loading settings...</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <h1 className="text-2xl font-bold text-gray-900">Profile &amp; Settings</h1>

      {/* Tab */}
      <div className="flex border-b border-gray-200">
        <button className="px-5 py-2.5 text-sm font-semibold text-gray-900 border-b-2 border-blue-600 -mb-px">Profile</button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Personal Details */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Personal Details</h2>
          <div className="flex items-start gap-4 mb-5">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {avatarUrl ? (
                  <img
                    src={resolveAssetUrl(avatarUrl)}
                    alt={form.fullName || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">{initial}</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 shadow disabled:opacity-60"
              >
                {uploading ? <Loader2 size={11} className="animate-spin" /> : <Camera size={11} />}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">Full Name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="input"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="btn-outline text-xs py-1.5 w-full disabled:opacity-60"
              >
                {uploading ? 'Uploading...' : '↑ Upload New Photo'}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                readOnly
                disabled
                className="input bg-gray-100 text-gray-400 cursor-not-allowed"
              />
              <p className="text-[11px] text-gray-400 mt-1">Email address cannot be changed.</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input"
                placeholder="Add a phone number"
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn-blue w-full py-2.5 mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Bank / Payout Info */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Bank / Payout Info</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Bank Name</label>
              <select className="input" defaultValue="First Bank Nigeria">
                <option>First Bank Nigeria</option>
                <option>GTBank</option>
                <option>UBA</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Account Number</label>
              <input type="text" placeholder="Enter account number" className="input" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Account Holder Name</label>
              <input type="text" placeholder="Enter account holder name" className="input" />
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Enter Your bank account details for rent payout.</p>
            </div>
            <button type="button" className="btn-blue w-full py-2.5">Save Bank Details</button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Notification Preferences</h2>
          <p className="text-xs text-gray-500 mb-4">Receive email notifications for rent payments and reminders.</p>
          <div className="space-y-4">
            {NOTIFICATION_ROWS.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">📋</span>
                  <span className="text-sm text-gray-700">{label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification(key, !notifs[key])}
                  aria-pressed={notifs[key]}
                  className={`relative w-11 h-6 rounded-full transition-colors ${notifs[key] ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifs[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 font-medium">Password</span>
              <button type="button" className="btn-outline text-xs py-1.5 px-3">Change Password</button>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700 font-medium">Two-Factor Authentication (2FA)</span>
                <button
                  type="button"
                  disabled={savingSecurity}
                  onClick={() => toggleTwoFA(!twoFA)}
                  aria-pressed={twoFA}
                  className={`relative w-11 h-6 rounded-full transition-colors disabled:opacity-60 ${twoFA ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${twoFA ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Add an extra layer of security to your account. When enabled, we'll email you a
                one-time code each time you sign in.
              </p>
              <div className={`flex items-center gap-2 text-xs font-medium ${twoFA ? 'text-green-600' : 'text-gray-400'}`}>
                <ShieldCheck size={14} />
                {twoFA ? 'Two-factor authentication is on' : 'Two-factor authentication is off'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
