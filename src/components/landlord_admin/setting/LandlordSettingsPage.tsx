import { useState } from 'react'
import { Camera } from 'lucide-react'

export default function LandlordSettingsPage() {
  const [notifs, setNotifs] = useState({ newRent: true, paymentDue: true, overdueRent: true })
  const [twoFA, setTwoFA] = useState(true)

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>

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
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">J</span>
                </div>
              </div>
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 shadow">
                <Camera size={11}/>
              </button>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">Full Name</label>
                <input type="text" defaultValue="John Smith" className="input" />
              </div>
              <button className="btn-outline text-xs py-1.5 w-full">↑ Upload New Photo</button>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Email Address</label>
              <input type="email" defaultValue="JohnSmith@gmail.com" className="input" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Phone Number</label>
              <input type="tel" defaultValue="(911) 3487 5684" className="input" />
            </div>
            <button className="btn-blue w-full py-2.5 mt-2">Save Changes</button>
          </div>
        </div>

        {/* Bank / Payout Info */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Bank / Payout Info</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Bank Name</label>
              <select className="input">
                <option>First Bank Nigeria</option>
                <option>GTBank</option>
                <option>UBA</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Account Number</label>
              <input type="text" defaultValue="4567892368" className="input" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Account Holder Name</label>
              <input type="text" defaultValue="John Smith" className="input" />
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Enter Your bank account details for rent payout.</p>
            </div>
            <button className="btn-blue w-full py-2.5">Save Bank Details</button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Notification Preferences</h2>
          <p className="text-xs text-gray-500 mb-4">Receive email notifications for rent payments and reminders.</p>
          <div className="space-y-4">
            {[
              { key: 'newRent' as const, label: 'New Rent Payment' },
              { key: 'paymentDue' as const, label: 'Payment Due Reminder' },
              { key: 'overdueRent' as const, label: 'Overdue Rent Alert' },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">📋</span>
                  <span className="text-sm text-gray-700">{label}</span>
                </div>
                <button
                  onClick={() => setNotifs(p => ({ ...p, [key]: !p[key] }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${notifs[key] ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifs[key] ? 'translate-x-5' : 'translate-x-0'}`}/>
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
              <button className="btn-outline text-xs py-1.5 px-3">Change Password</button>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700 font-medium">Two-Factor Authentication (2FA)</span>
                <button
                  onClick={() => setTwoFA(!twoFA)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${twoFA ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${twoFA ? 'translate-x-5' : 'translate-x-0'}`}/>
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-3">Add an extra layer of security to your account</p>
              <button className="btn-blue text-xs py-2 px-4">Manage 2FA</button>
              <p className="text-xs text-gray-500 mt-2">For added security, enable two-factor authentication</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
