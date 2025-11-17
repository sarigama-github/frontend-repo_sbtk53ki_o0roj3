import { useEffect, useState } from 'react'
import Loading from './components/Loading'
import Header from './components/Header'
import Profile from './components/Profile'
import RepoGrid from './components/RepoGrid'
import Footer from './components/Footer'

const DEFAULT_USERNAME = 'jameslovespancakes'

function App() {
  const [username, setUsername] = useState(DEFAULT_USERNAME)
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async (u) => {
    setLoading(true)
    setError('')
    try {
      const [pRes, rRes] = await Promise.all([
        fetch(`${backend}/api/github/profile?username=${u}`),
        fetch(`${backend}/api/github/repos?username=${u}&per_page=12&sort=updated`),
      ])
      if (!pRes.ok) throw new Error('Failed to fetch profile')
      if (!rRes.ok) throw new Error('Failed to fetch repos')
      const p = await pRes.json()
      const r = await rRes.json()
      setProfile(p)
      setRepos(r.items || [])
    } catch (e) {
      setError(e.message || 'Failed to load data')
      setProfile(null)
      setRepos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(username)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSearch = (u) => {
    setUsername(u)
    load(u)
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-96 w-[36rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <Header onSearch={onSearch} defaultUsername={username} />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-slate-300">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live GitHub-powered Portfolio
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
            {profile?.name || 'Developer Portfolio'}
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Showcasing work, projects, and open‑source contributions — fetched in real time from GitHub.
          </p>
        </section>

        {loading && (
          <div className="mt-10">
            <Loading label="Fetching GitHub data..." />
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 text-red-200 p-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-10">
            <Profile profile={profile} />
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">Highlighted Repositories</h2>
                <a
                  href={profile?.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-slate-300 hover:text-white underline/20 hover:underline"
                >
                  View on GitHub →
                </a>
              </div>
              <RepoGrid repos={repos} />
            </div>
          </div>
        )}

        <Footer />
      </main>
    </div>
  )
}

export default App
