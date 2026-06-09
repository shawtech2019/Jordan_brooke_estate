import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
  } from 'recharts'
  
  const visitorFlow = [
    { time: '8am', today: 180, yesterday: 150 },
    { time: '9am', today: 220, yesterday: 180 },
    { time: '10am', today: 280, yesterday: 240 },
    { time: '11am', today: 390, yesterday: 300 },
    { time: '12pm', today: 420, yesterday: 350 },
    { time: '1pm', today: 370, yesterday: 310 },
    { time: '2pm', today: 310, yesterday: 280 },
    { time: '3pm', today: 340, yesterday: 300 },
    { time: '4pm', today: 380, yesterday: 330 },
    { time: '5pm', today: 290, yesterday: 260 },
    { time: '6pm', today: 220, yesterday: 200 },
    { time: '7pm', today: 160, yesterday: 140 },
  ]
  
  const peakZones = [
    { zone: 'Main Lobby', pct: 78 },
    { zone: 'Exhibition Hall', pct: 62 },
    { zone: 'Public Cafe', pct: 55 },
    { zone: 'Gardens', pct: 48 },
  ]
  
  const stats = [
    { label: 'Currently In-Building', value: '247' },
    { label: "Today's Peak", value: '421' },
    { label: 'AVG Visit Duration', value: '1h 24m' },
    { label: 'Live Check-Ins', value: '18' },
  ]
  
  export default function VisitorsPage() {
    return (
      <div className="max-w-4xl mx-auto space-y-5">
        <h1 className="text-2xl font-display font-bold text-gray-900">Visitors</h1>
  
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="card p-4 text-center">
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              <p className="text-2xl font-display font-bold text-gray-900 mt-1">{s.value}</p>
            </div>
          ))}
        </div>
  
        {/* Visitor flow chart */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Visitor Flow (Today → Yesterday)</h2>
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 inline-block" /> Today</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-200 inline-block" /> Yesterday</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={visitorFlow} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorToday" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="colorYesterday" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
              />
              <Area type="monotone" dataKey="yesterday" stroke="#93c5fd" strokeWidth={2} fill="url(#colorYesterday)" dot={false} />
              <Area type="monotone" dataKey="today" stroke="#3b82f6" strokeWidth={2.5} fill="url(#colorToday)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
  
        {/* Peak times by zone */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Peak Times By Zone</h2>
          <div className="space-y-3">
            {peakZones.map((z) => (
              <div key={z.zone} className="flex items-center gap-4">
                <span className="text-sm text-gray-700 w-36 shrink-0">{z.zone}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${z.pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{z.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  