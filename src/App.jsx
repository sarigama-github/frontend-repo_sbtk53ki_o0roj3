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
        fetch(`${backend}/api/github/repos?username=${u}&per_page=12`),
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
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Header onSearch={onSearch} defaultUsername={username} />

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero */}
        <section className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {profile?.name || 'Developer Portfolio'}
          </h1>
          <p className="mt-3 text-gray-600">
            Showcasing work, projects, and open-source contributions.
          </p>
        </section>

        {loading && <Loading label="Fetching GitHub data..." />}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-8">
            <Profile profile={profile} />
            <div>
              <h2 className="text-xl font-semibold mb-4">Highlighted Repositories</h2>
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
