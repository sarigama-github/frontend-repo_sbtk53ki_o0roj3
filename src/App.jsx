import { useEffect, useState } from 'react'
import Loading from './components/Loading'
import Header from './components/Header'
import Profile from './components/Profile'
import RepoGrid from './components/RepoGrid'
import Footer from './components/Footer'
import SplineHero from './components/SplineHero'

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
      {/* Spline 3D hero for sleek visual presence */}
      <div className="relative z-0">
        <SplineHero
          title={profile?.name || 'Developer Portfolio'}
          subtitle="Interactive, real‑time GitHub portfolio with a premium 3D touch."
          badge="Powered by GitHub + FastAPI"
        />
      </div>

      {/* Sticky header layered above the Spline scene */}
      <div className="relative z-20">
        <Header onSearch={onSearch} defaultUsername={username} />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <div className="space-y-12">
            <section id="profile">
              <Profile profile={profile} />
            </section>

            <section id="repos" className="scroll-mt-20">
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
            </section>
          </div>
        )}

        <Footer />
      </main>
    </div>
  )
}

export default App
