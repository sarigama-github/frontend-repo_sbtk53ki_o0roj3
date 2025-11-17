import Spline from '@splinetool/react-spline'

// You can swap this scene URL with your own Spline scene for a bespoke look.
// Tip: Export as .splinecode from Spline and paste the hosted URL here.
const DEFAULT_SCENE =
  'https://prod.spline.design/9TQz2oYwE9y9Xk5q/scene.splinecode'

export default function SplineHero({ title, subtitle, badge, sceneUrl = DEFAULT_SCENE }) {
  return (
    <section className="relative h-[72vh] min-h-[520px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
      {/* 3D Canvas */}
      <div className="absolute inset-0 pointer-events-auto">
        <Spline scene={sceneUrl} />
      </div>

      {/* Vignette + Ambient glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.7)_100%)]" />
      <div className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-[36rem] rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl text-center">
          {badge && (
            <div className="mx-auto inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-slate-300 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {badge}
            </div>
          )}
          <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(124,58,237,0.25)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-slate-300/95 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Glass actions bar */}
          <div className="mt-8 mx-auto w-fit rounded-xl border border-white/10 bg-white/5 backdrop-blur px-2 py-2 flex items-center gap-2">
            <a
              href="#repos"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-medium shadow/50 hover:from-violet-400 hover:to-cyan-400 transition"
            >
              Explore Repos
            </a>
            <a
              href="#profile"
              className="px-4 py-2 rounded-lg text-slate-200 hover:text-white border border-white/10 bg-white/0 hover:bg-white/5 transition"
            >
              About Me
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
