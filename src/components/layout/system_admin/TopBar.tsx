import { useEffect, useMemo, useRef, useState, type JSX, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, FileText, Layers, LayoutGrid, Mic, Search, Settings, User, X } from 'lucide-react'
import { searchAll } from '../../data/search'
import type { SearchResultType } from '../../data/types'

const typeIcon: Record<SearchResultType, JSX.Element> = {
  page: <LayoutGrid className="h-4 w-4" />,
  user: <User className="h-4 w-4" />,
  'role-permission': <Layers className="h-4 w-4" />,
}

const typeLabel: Record<SearchResultType, string> = {
  page: 'Page',
  user: 'User',
  'role-permission': 'Permission',
}

export default function TopBar() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const results = useMemo(() => searchAll(query), [query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [])

  const goTo = (path: string) => {
    navigate(path)
    setOpen(false)
    setQuery('')
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      goTo(results[activeIndex].path)
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-6 py-5 sm:flex-nowrap sm:gap-4">
      <h1 className="mr-2 shrink-0 text-2xl font-bold tracking-tight text-slate-900">
        Admin Dashboard
      </h1>

      <div
        ref={containerRef}
        className="relative order-3 w-full sm:order-none sm:max-w-xs sm:flex-1"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls="global-search-results"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search pages, users, permissions…"
          className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-14 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-accent"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:block">
            ⌘K
          </kbd>
        )}

        {open && query && (
          <div
            id="global-search-results"
            role="listbox"
            className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-lg border border-slate-200 bg-white py-2 shadow-card"
          >
            {results.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-slate-500">
                No results for "{query}"
              </p>
            ) : (
              results.map((result, idx) => (
                <button
                  key={result.id}
                  role="option"
                  aria-selected={idx === activeIndex}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => goTo(result.path)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    idx === activeIndex ? 'bg-brand-accentSoft' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                    {typeIcon[result.type]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-slate-900">
                      {result.title}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      {result.subtitle}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                    {typeLabel[result.type]}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        aria-label="Voice search"
        className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
      >
        <Mic className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-500">
        <FileText className="h-4 w-4" />
        AI Assistant
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
        >
          <Bell className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Settings"
          onClick={() => navigate('/settings')}
          className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
        >
          <Settings className="h-4 w-4" />
        </button>
        <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-200">
          <div className="flex h-full w-full items-center justify-center text-xs font-medium text-slate-600">
            JB
          </div>
        </div>
      </div>
    </div>
  )
}
