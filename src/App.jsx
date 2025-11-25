import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

// Componente del Cubo
function Escultura({ position }) {
  const meshRef = useRef()
  
  // Animación: Esto corre 60 veces por segundo
  useFrame((state, delta) => {
    // Hacemos que gire suavemente
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.2
  })

  return (
    <mesh position={position} ref={meshRef}>
      {/* Geometría: Un cubo de 2x2x2 */}
      <boxGeometry args={[2, 2, 2]} />
      {/* Material: Color cian estilo 'wireframe' (alambre) tecnológico */}
      <meshStandardMaterial color="#00ffcc" wireframe />
    </mesh>
  )
}

// La App Principal
export default function App() {
  return (
    // El Canvas ocupa toda la pantalla detrás de la cortina
    <div style={{ width: '100vw', height: '100vh', background: '#050505' }}>
      <Canvas>
        {/* Luces */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Decoración: Estrellas de fondo */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Nuestro Cubo */}
        <Escultura position={[0, 0, 0]} />

        {/* Controles para rotar con el mouse */}
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  )
}