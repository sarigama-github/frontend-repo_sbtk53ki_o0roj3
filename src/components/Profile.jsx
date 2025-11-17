export default function Profile({ profile }) {
  if (!profile) return null
  return (
    <section className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-start gap-6">
        <img src={profile.avatar_url} alt={profile.name} className="h-24 w-24 rounded-lg object-cover" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <a href={profile.html_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">@{profile.login}</a>
            </div>
            <div className="text-sm text-gray-600">
              <span className="mr-4">⭐ Followers: {profile.followers}</span>
              <span>👀 Following: {profile.following}</span>
            </div>
          </div>
          {profile.bio && (
            <p className="mt-3 text-gray-700">{profile.bio}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
            {profile.location && <span>📍 {profile.location}</span>}
            {profile.company && <span>🏢 {profile.company}</span>}
            {profile.blog && (
              <a className="text-blue-600 hover:underline" href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer">🔗 Website</a>
            )}
            {profile.twitter_username && (
              <a className="text-blue-600 hover:underline" href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noreferrer">𝕏 @{profile.twitter_username}</a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
