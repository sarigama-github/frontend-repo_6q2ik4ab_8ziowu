import { useEffect } from 'react'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'

function Hero() {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      '.hero-title',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      0.2
    ).fromTo(
      '.hero-sub',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 },
      0.4
    ).fromTo(
      '.hero-cta',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 },
      0.6
    )
  }, [])

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient veil to improve text contrast, but keep scene interactive */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="hero-title text-5xl md:text-6xl font-bold text-white tracking-tight">
              I craft immersive 3D web experiences
            </h1>
            <p className="hero-sub mt-4 text-lg md:text-xl text-slate-200 max-w-2xl">
              Blending Three.js and motion design to build premium, high-performance interfaces that feel alive.
            </p>
            <div className="hero-cta mt-8 flex items-center gap-4">
              <a href="#work" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-lg backdrop-blur transition-colors">
                View Work
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
