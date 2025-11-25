import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useGLTF, Environment, ContactShadows } from '@react-three/drei'

function EscenaPalomitas() {
  // Cargamos el archivo desde la carpeta public
  const { scene } = useGLTF('/palomitas.glb')
  const ref = useRef()

  useFrame((state) => {
    // Hacemos que floten un poquito (efecto levitación suave)
    // Math.sin usa el tiempo para subir y bajar
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
    // Rotación lenta para que se vean por todos lados
    ref.current.rotation.y += 0.005
  })

  return <primitive object={scene} ref={ref} scale={2} position={[0, -1, 0]} />
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        
        {/* ILUMINACIÓN DE ESTUDIO */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        
        {/* LUZ DE RELLENO (Para que no queden sombras negras feas en la sartén) */}
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff9900" />

        {/* ENTORNO (Reflejos metálicos para la sartén) */}
        <Environment preset="city" />

        {/* DECORACIÓN */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        {/* Sombras en el suelo para que no parezca que vuelan en la nada */}
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1.5} far={4.5} />

        {/* TU MODELO */}
        <EscenaPalomitas />

        <OrbitControls autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}