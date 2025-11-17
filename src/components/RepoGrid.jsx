export default function RepoGrid({ repos = [] }) {
  if (!repos.length) return (
    <div className="text-center text-gray-500 py-16">No repositories to show.</div>
  )
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {repos.map((repo) => (
        <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="group block bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">{repo.name}</h3>
            {repo.stargazers_count > 0 && (
              <span className="text-xs px-2 py-1 rounded bg-yellow-50 text-yellow-700 border border-yellow-100">⭐ {repo.stargazers_count}</span>
            )}
          </div>
          {repo.description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{repo.description}</p>
          )}
          <div className="mt-4 flex items-center gap-3 text-xs text-gray-600">
            {repo.language && (
              <span className="px-2 py-1 rounded bg-gray-50 border border-gray-100">{repo.language}</span>
            )}
            {repo.forks_count > 0 && (
              <span className="px-2 py-1 rounded bg-gray-50 border border-gray-100">🍴 {repo.forks_count}</span>
            )}
            {repo.homepage && (
              <span className="ml-auto text-blue-600 group-hover:underline">Demo →</span>
            )}
          </div>
        </a>
      ))}
    </section>
  )
}
