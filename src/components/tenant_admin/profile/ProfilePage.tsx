import { useState } from 'react'
import { Camera } from 'lucide-react'

export default function ProfilePage() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(true)

  const [form, setForm] = useState({
    fullName: 'John Smith',
    jobTitle: 'Operation Manager',
    email: 'JohnSmith@gmail.com',
    company: 'Oakwood Complex',
    phone: '(234) 780 987 0978',
    location: 'Lagos Nigeria',
  })

  return (
    <div className="max-w-3xl mx-auto space-y-5">
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
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-400">J</span>
                  </div>
                </div>
                <button className="absolute bottom-1 right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-md">
                  <Camera size={14} />
                </button>
              </div>
              <button className="btn-outline w-full py-2.5 text-sm">Change Photo</button>
            </div>
          </div>

          {/* Notification preferences */}
          <div className="card p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900">Notification Preferences</h2>

            {[
              { label: 'Email Notification', value: emailNotif, setter: setEmailNotif },
              { label: 'SMS Notification', value: smsNotif, setter: setSmsNotif },
            ].map(({ label, value, setter }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{label}</span>
                <button
                  onClick={() => setter(!value)}
                  className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-green-500' : 'bg-gray-200'}`}
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
                  {key === 'jobTitle' ? 'Job Title' : key === 'email' ? 'Email Address' : key === 'phone' ? 'Phone Number' : key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-gray-50"
                />
              </div>
            ))}

            <button className="w-full btn-primary py-2.5 rounded-xl mt-2">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
