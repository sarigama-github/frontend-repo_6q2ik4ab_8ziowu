import Hero from './components/Hero'
import ThreeScene from './components/ThreeScene'
import Sections from './components/Sections'

function App() {
  return (
    <div className="bg-[#0a0f1e] text-white">
      {/* Three.js background scene and Spline hero animation */}
      <ThreeScene />

      {/* Content overlays and scroll sections */}
      <Hero />
      <Sections />
    </div>
  )
}

export default App
