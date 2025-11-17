export default function Profile({ profile }) {
  if (!profile) return null
  const stats = [
    { label: 'Followers', value: profile.followers },
    { label: 'Following', value: profile.following },
    { label: 'Public Repos', value: profile.public_repos },
  ]
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      {/* subtle gradient highlight */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <img src={profile.avatar_url} alt={profile.name || profile.login} className="h-24 w-24 rounded-xl object-cover ring-1 ring-white/10" />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{profile.name || profile.login}</h2>
              <a href={profile.html_url} target="_blank" rel="noreferrer" className="text-violet-300 hover:text-violet-200">@{profile.login}</a>
            </div>
            <div className="flex gap-3">
              {stats.map((s) => (
                <div key={s.label} className="px-3 py-2 rounded-lg border border-white/10 bg-white/[0.04] text-center">
                  <div className="text-sm text-slate-300">{s.label}</div>
                  <div className="text-lg font-semibold text-white">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
          {profile.bio && (
            <p className="mt-4 text-slate-300 leading-relaxed">{profile.bio}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
            {profile.location && <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/10">📍 {profile.location}</span>}
            {profile.company && <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/10">🏢 {profile.company}</span>}
            {profile.blog && (
              <a className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/10 text-violet-200 hover:text-white" href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer">🔗 Website</a>
            )}
            {profile.twitter_username && (
              <a className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/10 text-violet-200 hover:text-white" href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noreferrer">𝕏 @{profile.twitter_username}</a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
