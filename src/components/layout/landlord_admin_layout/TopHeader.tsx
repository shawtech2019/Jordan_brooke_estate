import { Search, Mic, Bell, Settings } from 'lucide-react';


const TopHeader = () => {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 shrink-0">
    {/* Search */}
    <div className="flex-1 max-w-xs relative">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Type to search"
        className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
      />
    </div>

    {/* AI Assistant */}
    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
      <Mic size={15} className="text-blue-500" />
      AI Assistant
    </button>

    <div className="flex items-center gap-2 ml-auto">
      {/* Bell */}
      <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
        <Bell size={18} className="text-gray-600" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {/* Settings */}
      <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
        <Settings size={18} className="text-gray-600" />
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-300 to-rose-400 flex items-center justify-center text-white text-sm font-semibold">
        J
      </div>
    </div>
  </header>
  );
};

export default TopHeader;