import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const sectionReveal = (selector) => {
  const els = document.querySelectorAll(selector)
  els.forEach((el) => {
    const children = el.querySelectorAll('[data-animate="fade-up"]')
    gsap.fromTo(children,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%'
        }
      }
    )
  })
}

export const sectionSwap = (fromSel, toSel) => {
  // fades out one section, fades in next
  gsap.to(fromSel, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: toSel,
      start: 'top 80%'
    }
  })

  gsap.fromTo(toSel, { opacity: 0 }, {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: toSel,
      start: 'top 80%'
    }
  })
}
