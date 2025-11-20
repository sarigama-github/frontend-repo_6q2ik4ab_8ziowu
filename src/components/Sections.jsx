import { useEffect } from 'react'
import { sectionReveal } from '../animations/timelines'
import { projects } from '../data/projects'
import { gsap } from 'gsap'

export default function Sections() {
  useEffect(() => {
    sectionReveal('[data-section]')
  }, [])

  const onHover = (id, enter = true) => {
    const sel = `#proj-${id}`
    gsap.to(sel, { scale: enter ? 1.03 : 1, rotate: enter ? 2 : 0, duration: 0.4, ease: 'power3.out' })
  }

  return (
    <main id="scroll-root" className="relative z-10">
      {/* Spacer for hero full-screen pinning */}
      <section className="h-screen" />

      <section id="about" data-section className="min-h-screen flex items-center bg-transparent">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h2 data-animate="fade-up" className="text-4xl md:text-5xl font-bold text-white">About</h2>
            <p data-animate="fade-up" className="mt-4 text-slate-200 max-w-prose">
              I design and build interactive, performant 3D experiences for the web. My focus is motion that feels purposeful, GPU-friendly pipelines, and clean systems that scale.
            </p>
          </div>
          <ul className="grid gap-3 content-start">
            {['Three.js / WebGL','GSAP Motion','GLTF / Draco','Shader Graph / GLSL','Perf & Profiling'].map((s) => (
              <li key={s} data-animate="fade-up" className="text-slate-300">• {s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="work" data-section className="min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <h2 data-animate="fade-up" className="text-4xl md:text-5xl font-bold text-white mb-8">Selected Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map(p => (
              <a
                key={p.id}
                id={`proj-${p.id}`}
                href={p.link}
                onMouseEnter={() => onHover(p.id, true)}
                onMouseLeave={() => onHover(p.id, false)}
                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-all backdrop-blur">
                <div className="h-40 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-white/10" />
                <h3 className="mt-4 text-white font-semibold">{p.title}</h3>
                <p className="text-slate-300 text-sm">{p.description}</p>
                <span className="text-slate-300 text-xs">GLB: {p.model}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="services" data-section className="min-h-[70vh] flex items-center">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            { t: '3D Websites', d: 'Hero scenes, product viewers, interactive worlds.' },
            { t: 'Motion Systems', d: 'Scroll-driven narratives, transitions, micro-interactions.' },
            { t: 'Performance', d: 'Profiling, asset pipelines, responsive fallbacks.' },
          ].map((s, i) => (
            <div key={i} data-animate="fade-up" className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500/60 to-indigo-500/60 mb-4" />
              <h3 className="text-white font-semibold">{s.t}</h3>
              <p className="text-slate-300 text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" data-section className="min-h-[70vh] flex items-center">
        <div className="container mx-auto px-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">
            <h2 data-animate="fade-up" className="text-3xl md:text-4xl font-bold text-white">Let’s build something immersive</h2>
            <p data-animate="fade-up" className="mt-2 text-slate-300">Tell me about your project and timeline. I’ll reply within 1 business day.</p>
            <form data-animate="fade-up" className="mt-6 grid md:grid-cols-3 gap-4">
              <input className="col-span-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60" placeholder="Name"/>
              <input className="col-span-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60" placeholder="Email"/>
              <button className="col-span-1 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-lg transition-colors">Send</button>
            </form>
          </div>
        </div>
      </section>

      {/* Spacer after contact */}
      <section className="h-[40vh]" />
    </main>
  )
}
