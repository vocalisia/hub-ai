'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'

function SwarmCore() {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.15
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -state.clock.elapsedTime * 0.3
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <Icosahedron args={[1.3, 1]}>
          <MeshDistortMaterial
            color="#AD7D4E"
            emissive="#C9A572"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.95}
            distort={0.35}
            speed={1.8}
          />
        </Icosahedron>
      </mesh>

      <mesh scale={1.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#AD7D4E"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh scale={1.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#C9A572"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  )
}

function OrbitingAgents() {
  const ref = useRef<THREE.Group>(null)

  const agents = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2
      const radiusBase = 2.2 + Math.random() * 0.7
      const height = (Math.random() - 0.5) * 1.2
      return {
        angle,
        radius: radiusBase,
        height,
        speed: 0.3 + Math.random() * 0.4,
        size: 0.04 + Math.random() * 0.05,
      }
    })
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.1
    ref.current.children.forEach((child, i) => {
      const agent = agents[i]
      const t = state.clock.elapsedTime * agent.speed
      child.position.x = Math.cos(agent.angle + t) * agent.radius
      child.position.z = Math.sin(agent.angle + t) * agent.radius
      child.position.y = agent.height + Math.sin(t * 2) * 0.2
    })
  })

  return (
    <group ref={ref}>
      {agents.map((agent, i) => (
        <mesh key={i}>
          <sphereGeometry args={[agent.size, 12, 12]} />
          <meshStandardMaterial
            color="#C9A572"
            emissive="#AD7D4E"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

function OrbitingRings() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.3
      ring1.current.rotation.y = t * 0.2
    }
    if (ring2.current) {
      ring2.current.rotation.y = -t * 0.25
      ring2.current.rotation.z = t * 0.15
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.18
      ring3.current.rotation.x = -t * 0.12
    }
  })

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[1.9, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#AD7D4E"
          emissive="#AD7D4E"
          emissiveIntensity={1}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#C9A572"
          emissive="#C9A572"
          emissiveIntensity={1.2}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#AD7D4E"
          emissive="#AD7D4E"
          emissiveIntensity={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  )
}

export default function Logo3D({ size = 'large' }: { size?: 'large' | 'small' }) {
  const dimensions =
    size === 'small' ? { w: 40, h: 40 } : { w: 480, h: 480 }

  return (
    <div
      style={{
        width: dimensions.w,
        height: dimensions.h,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#C9A572" />
          <directionalLight position={[-5, -5, 5]} intensity={0.8} color="#AD7D4E" />
          <pointLight position={[0, 0, 3]} intensity={2} color="#C9A572" />

          <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}>
            <SwarmCore />
          </Float>

          <OrbitingRings />
          <OrbitingAgents />
          <Sparkles count={40} scale={5} size={2} speed={0.4} color="#C9A572" />
        </Suspense>
      </Canvas>
    </div>
  )
}
