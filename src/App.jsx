import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

function Cubo() {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.5
    ref.current.rotation.y += delta * 0.2
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#00ffcc" wireframe />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <Cubo />
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  )
}