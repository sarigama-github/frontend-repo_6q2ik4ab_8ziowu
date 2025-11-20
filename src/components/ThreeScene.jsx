import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lightweight Three.js scene with camera waypoints synchronized to scroll
export default function ThreeScene() {
  const mountRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#0b1020')

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 1.2, 5)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const ambient = new THREE.AmbientLight(0x404040, 2.0)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0xffffff, 1.2)
    dir.position.set(3, 4, 2)
    scene.add(dir)

    // Minimal geometry placeholders to represent sections
    const geo = new THREE.IcosahedronGeometry(1, 1)
    const mat = new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.4, metalness: 0.3 })
    const meshHero = new THREE.Mesh(geo, mat)
    meshHero.position.set(0, 0, 0)
    scene.add(meshHero)

    const meshAbout = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x14b8a6, roughness: 0.5, metalness: 0.2 }))
    meshAbout.position.set(3, 0, -2)
    scene.add(meshAbout)

    const meshWork = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5, metalness: 0.2 }))
    meshWork.position.set(-3, 0.5, -4)
    scene.add(meshWork)

    sceneRef.current = scene

    const clock = new THREE.Clock()
    const animate = () => {
      const t = clock.getElapsedTime()
      meshHero.rotation.y = t * 0.3
      meshAbout.rotation.x = t * 0.2
      meshWork.rotation.z = t * 0.25

      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(animate)
    }

    // Pause rendering when tab hidden
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current)
      } else {
        animate()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Scroll-driven camera waypoints
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-root',
        start: 'top top',
        end: '+=4000',
        scrub: 1,
        pin: '#three-wrapper',
      }
    })

    const cam = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const lookAt = new THREE.Vector3(0, 0, 0)

    const toCam = (x, y, z, lx = 0, ly = 0, lz = 0, dur = 1) => {
      tl.to(cam, {
        x, y, z, duration: dur,
        onUpdate: () => {
          camera.position.set(cam.x, cam.y, cam.z)
          lookAt.set(lx, ly, lz)
          camera.lookAt(lookAt)
        }, ease: 'none'
      })
    }

    // Waypoints matching sections: hero -> about -> work -> contact
    toCam(0, 1.2, 5, 0, 0, 0, 1)
    toCam(3, 1.0, 2, 3, 0, -2, 1)
    toCam(-3.5, 1.2, 2.5, -3, 0.5, -4, 1)
    toCam(0, 2.5, 6, 0, 0, 0, 1)

    // Resize handling
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      ScrollTrigger.getAll().forEach(s => s.kill())
      tl.kill()
      mount.removeChild(renderer.domElement)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
    }
  }, [])

  return (
    <div id="three-wrapper" ref={mountRef} className="h-screen w-full fixed inset-0" />
  )
}
