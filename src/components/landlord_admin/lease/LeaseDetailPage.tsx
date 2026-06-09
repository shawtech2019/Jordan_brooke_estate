import { ChevronRight, Download, RefreshCw, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const payments = [
  { date: 'Jan 1, 2022', amount: '$7,900', status: 'Paid' },
  { date: 'Jan 1, 2022', amount: '$56,000', status: 'Paid' },
  { date: 'Jan 1, 2022', amount: '$70,000', status: 'Paid' },
]

export default function LeaseDetailPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        {['Properties','Greenfield Apartment','Units','A-201','Lease Details'].map((b,i,arr)=>(
          <span key={b} className="flex items-center gap-1.5">
            <Link to={"units"}>
            <span className={i===arr.length-1?'text-gray-900 font-medium':'hover:text-gray-700 cursor-pointer'}
              >{b}</span>
            </Link>
            
            {i<arr.length-1&&<ChevronRight size={13}/>}
          </span>
        ))}
      </div>

      <h1 className="text-xl font-bold text-gray-900">Lease Details</h1>

      <div className="grid grid-cols-2 gap-5">
        {/* Tenant Details */}
        <div className="card p-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Tenant Details</h3>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">J</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">John Smith</p>
              <p className="text-xs text-gray-500">+ 234 123 456 7890</p>
              <p className="text-xs text-gray-500">JohnSmith@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Lease Duration */}
        <div className="card p-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Lease Duration</h3>
          <p className="text-sm font-semibold text-gray-900 mb-3">Jan 1, 2026 to Dec 31, 2027</p>
          <div className="space-y-2 text-sm">
            {[['Lease Start Date','Jan 1, 2026'],['Lease End Date','Jan 1, 2027']].map(([l,v])=>(
              <div key={l} className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">{l}</span>
                <span className="font-medium text-gray-900">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rent Amount */}
        <div className="card p-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Rent Amount</h3>
          <p className="text-lg font-bold text-gray-900">$5,000 / Year</p>
          <p className="text-sm text-gray-500 mt-1">$5,000 paid Monthly</p>
          <div className="mt-3 space-y-2 text-sm">
            {[['Lease Start Date','Jan 1, 2026'],['Lease End Date','Jan 1, 2027']].map(([l,v])=>(
              <div key={l} className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">{l}</span>
                <span className="font-medium text-gray-900">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="card p-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Payment History</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Date','Amount','Status'].map(h=><th key={h} className="pb-2 text-left text-xs text-gray-500 font-medium">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((p,i)=>(
                <tr key={i}>
                  <td className="py-2 text-gray-600 text-xs">{p.date}</td>
                  <td className="py-2 font-medium">{p.amount}</td>
                  <td className="py-2"><span className="badge badge-green">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="btn-blue flex items-center gap-2 px-6"><Download size={15}/>Download PDF</button>
        <button className="btn-green flex items-center gap-2 px-6"><RefreshCw size={15}/>Renew Lease</button>
        <button className="btn-red flex items-center gap-2 px-6"><X size={15}/>End Lease</button>
      </div>
    </div>
  )
}
