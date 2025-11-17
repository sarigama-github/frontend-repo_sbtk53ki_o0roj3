import { useState } from 'react'

export default function Header({ onSearch, defaultUsername }) {
  const [value, setValue] = useState(defaultUsername || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) onSearch(value.trim())
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 bg-slate-950/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
        <a href="/" className="text-lg sm:text-xl font-bold tracking-tight text-white">
          <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">Flames</span>
          .Portfolio
        </a>
        <form onSubmit={handleSubmit} className="ml-auto flex items-center gap-2 w-full max-w-sm">
          <div className="relative flex-1">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400/40"
              placeholder="Search GitHub username..."
            />
            <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4a7 7 0 105.196 12.196l3.554 3.554a1 1 0 001.415-1.415l-3.554-3.554A7 7 0 0011 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-medium hover:from-violet-400 hover:to-cyan-400 transition shadow-sm">
            Load
          </button>
        </form>
        <a href="/test" className="hidden sm:inline ml-2 text-sm text-slate-300 hover:text-white">System Test</a>
      </div>
    </header>
  )
}
