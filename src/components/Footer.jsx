export default function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-slate-400">
      <p>Built with ❤️ using React, Tailwind and FastAPI. Live preview enabled.</p>
      <p className="mt-2 opacity-70">© {new Date().getFullYear()} Crafted with a modern dark UI, soft glows, and tasteful gradients.</p>
    </footer>
  )
}
