import { useState } from 'react'

export default function Header({ onSearch, defaultUsername }) {
  const [value, setValue] = useState(defaultUsername || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) onSearch(value.trim())
  }

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-tight">Dev Portfolio</a>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-sm ml-4">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search GitHub username..."
          />
          <button className="px-3 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition">Load</button>
        </form>
        <a href="/test" className="ml-4 text-sm text-gray-600 hover:text-gray-900">System Test</a>
      </div>
    </header>
  )
}
