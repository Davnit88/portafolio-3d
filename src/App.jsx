import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useGLTF, Environment, ContactShadows, useAnimations } from '@react-three/drei'
import { Loader } from '@react-three/drei'
function EscenaPalomitas() {
  const group = useRef()
  // 1. Extraemos también las 'animations' del archivo
  const { scene, animations } = useGLTF('/palomitas.glb')
  
  // 2. Preparamos el control de animaciones
  const { actions } = useAnimations(animations, group)

  // 3. ¡ACCIÓN! Al cargar, buscamos la primera animación y le damos Play
  useEffect(() => {
    // Recorremos cada acción dentro del diccionario 'actions'
    Object.values(actions).forEach((accion) => {
      // Le damos play a cada una
      accion.reset().fadeIn(0.5).play()
    })
    
    // Opcional: Si quieres ver los nombres en la consola para debuguear
    console.log("Animaciones encontradas:", Object.keys(actions))
    
  }, [actions])

  useFrame((state) => {
    // Mantengo la rotación lenta de la cámara/objeto para que se vea épico
    group.current.rotation.y += 0.002
  })

  return <primitive object={scene} ref={group} scale={2} position={[0, -1, 0]} />
}

export default function App() {
  return (<>
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        
        {/* Luces para que se vea increíble */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff9900" />

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1.5} far={4.5} />

        {/* Tu Escena Animada */}
        <EscenaPalomitas />

        <OrbitControls autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
    {/* ESTO AGREGA LA BARRA DE CARGA AUTOMÁTICA */}
      <Loader 
        containerStyles={{ background: 'black', zIndex: 10000 }} // Fondo negro tapa todo
        innerStyles={{ width: '300px', height: '10px', background: '#333' }} // Barra vacía
        barStyles={{ background: '#00ffcc', height: '100%' }} // Barra llena
        dataStyles={{ color: '#00ffcc', fontSize: '1.2rem', fontFamily: 'monospace' }} // Texto %
      />
    </>
  )
}