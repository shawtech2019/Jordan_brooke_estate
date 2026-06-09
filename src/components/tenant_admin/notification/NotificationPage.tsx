import { useState } from 'react'

export default function NotificationPage() {
  const [saved, setSaved] = useState(false)

  return (
    <div className="max-w-2xl mx-auto space-y-5">
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
          <h2 className="text-sm font-bold text-gray-900 mb-2">Email Notifications</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Receive important updates via email about check-ins, service
            requests, announcements and property agent.
          </p>
        </div>

        {/* SMS Notifications */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-2">SMS Notifications</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Receive critical alerts via text message about check-ins and service
            requests.
          </p>
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
          <button className="btn-outline px-6 py-2.5">Cancel</button>
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all ${saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Additional notification channels */}
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Notification Channels</h2>
        <div className="space-y-3">
          {[
            { label: 'Maintenance Updates', desc: 'Get notified when your maintenance request status changes' },
            { label: 'Payment Reminders', desc: 'Receive reminders 3 days before rent is due' },
            { label: 'Announcements', desc: 'Building-wide announcements from property management' },
            { label: 'Lease Alerts', desc: 'Important reminders about your lease expiration and renewals' },
            { label: 'Visitor Check-ins', desc: 'Alerts when your registered visitors check in to the building' },
          ].map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
