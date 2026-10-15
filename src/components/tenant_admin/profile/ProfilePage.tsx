import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Loader2 } from 'lucide-react'
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

export default function ProfilePage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(true)

  const [form, setForm] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    company: '',
    phone: '',
    location: '',
  })

  const applyUser = (user: UserProfile) => {
    setForm({
      fullName: user.fullName || '',
      jobTitle: user.jobTitle || '',
      email: user.email || '',
      company: user.company || '',
      phone: user.phone || '',
      location: user.location || '',
    })
    setAvatarUrl(user.avatarUrl)
    setEmailNotif(user.notificationPreferences?.email ?? true)
    setSmsNotif(user.notificationPreferences?.sms ?? true)
  }

  /* Load the signed-in user's profile */
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Please log in to view your profile')
      navigate('/login')
      return
    }

    let active = true
    ;(async () => {
      try {
        const res = await httpGet<ProfileResponse>('profile')
        if (active) applyUser(res.user)
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Failed to load profile')
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
      const res = await httpPutWithToken<ProfileResponse>('profile', {
        firstName,
        lastName,
        jobTitle: form.jobTitle,
        company: form.company,
        phone: form.phone,
        location: form.location,
      })
      applyUser(res.user)
      toast.success('Profile updated')
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const updatePreference = async (key: 'email' | 'sms', value: boolean) => {
    const setter = key === 'email' ? setEmailNotif : setSmsNotif
    setter(value) // optimistic

    try {
      await httpPutWithToken('profile/notifications', { [key]: value })
    } catch (error: unknown) {
      setter(!value) // revert
      toast.error(
        error instanceof Error ? error.message : 'Failed to update preference'
      )
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
      <div className="max-w-3xl mx-auto flex items-center justify-center gap-2 py-24 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-sm">Loading profile...</span>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2">
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <span>›</span>
        <span className="text-gray-900 font-medium">Profile</span>
      </nav>

      <div className="grid grid-cols-2 gap-5">
        {/* Left: Photo + Notifications */}
        <div className="space-y-4">
          {/* Profile photo */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Profile Picture</h2>
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-gray-200 overflow-hidden flex items-center justify-center">
                  {avatarUrl ? (
                    <img
                      src={resolveAssetUrl(avatarUrl)}
                      alt={form.fullName || 'Profile'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-400">{initial}</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute bottom-1 right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-md disabled:opacity-60"
                >
                  {uploading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Camera size={14} />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="btn-outline w-full py-2.5 text-sm disabled:opacity-60"
              >
                {uploading ? 'Uploading...' : 'Change Photo'}
              </button>
            </div>
          </div>

          {/* Notification preferences */}
          <div className="card p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900">Notification Preferences</h2>

            {[
              { label: 'Email Notification', value: emailNotif, key: 'email' as const },
              { label: 'SMS Notification', value: smsNotif, key: 'sms' as const },
            ].map(({ label, value, key }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{label}</span>
                <button
                  type="button"
                  onClick={() => updatePreference(key, !value)}
                  className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-green-500' : 'bg-gray-200'}`}
                  aria-pressed={value}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            ))}

            <p className="text-xs text-gray-500 leading-relaxed">
              Enable email and SMS notifications to receive alerts and updates
            </p>
          </div>
        </div>

        {/* Right: Basic Info */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            {(Object.keys(form) as (keyof typeof form)[]).map((key) => (
              <div key={key}>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider capitalize block mb-1">
                  {key === 'fullName' ? 'Full Name' : key === 'jobTitle' ? 'Job Title' : key === 'email' ? 'Email Address' : key === 'phone' ? 'Phone Number' : key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  disabled={key === 'email'}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full btn-primary py-2.5 rounded-xl mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
