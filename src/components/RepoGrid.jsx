export default function RepoGrid({ repos = [] }) {
  if (!repos.length) return (
    <div className="text-center text-slate-400 py-16">No repositories to show.</div>
  )
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="group relative block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/30 hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_rgba(139,92,246,0.2)]"
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-white group-hover:text-violet-200 transition">{repo.name}</h3>
            {repo.stargazers_count > 0 && (
              <span className="text-xs px-2 py-1 rounded-md bg-yellow-500/15 text-yellow-200 border border-yellow-200/20">⭐ {repo.stargazers_count}</span>
            )}
          </div>
          {repo.description && (
            <p className="mt-2 text-sm text-slate-300/90 line-clamp-3">{repo.description}</p>
          )}
          <div className="mt-4 flex items-center gap-3 text-xs text-slate-300/90">
            {repo.language && (
              <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/10">{repo.language}</span>
            )}
            {repo.forks_count > 0 && (
              <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/10">🍴 {repo.forks_count}</span>
            )}
            <span className="ml-auto text-violet-200 group-hover:text-white">Open →</span>
          </div>
        </a>
      ))}
    </section>
  )
}
