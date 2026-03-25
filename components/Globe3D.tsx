'use client'
import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'

const CITIES = [
  { name: 'Geneve', lat: 46.2044, lng: 6.1432, flag: '🇨🇭', active: true },
  { name: 'Zurich', lat: 47.3769, lng: 8.5417, flag: '🇨🇭', active: true },
  { name: 'Lausanne', lat: 46.5197, lng: 6.6323, flag: '🇨🇭', active: true },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, flag: '🇫🇷', active: true },
  { name: 'Berlin', lat: 52.5200, lng: 13.4050, flag: '🇩🇪', active: false },
  { name: 'London', lat: 51.5074, lng: -0.1278, flag: '🇬🇧', active: false },
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, flag: '🇳🇱', active: false },
  { name: 'Stockholm', lat: 59.3293, lng: 18.0686, flag: '🇸🇪', active: false },
  { name: 'Montreal', lat: 45.5017, lng: -73.5673, flag: '🇨🇦', active: true },
  { name: 'Toronto', lat: 43.6532, lng: -79.3832, flag: '🇨🇦', active: false },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194, flag: '🇺🇸', active: true },
  { name: 'New York', lat: 40.7128, lng: -74.0060, flag: '🇺🇸', active: false },
  { name: 'Boston', lat: 42.3601, lng: -71.0589, flag: '🇺🇸', active: false },
  { name: 'Seattle', lat: 47.6062, lng: -122.3321, flag: '🇺🇸', active: false },
]

const CONNECTIONS = [
  [0, 8],   // Geneve -> Montreal
  [0, 10],  // Geneve -> SF
  [0, 3],   // Geneve -> Paris
  [0, 1],   // Geneve -> Zurich
  [0, 2],   // Geneve -> Lausanne
  [3, 4],   // Paris -> Berlin
  [8, 9],   // Montreal -> Toronto
  [10, 11], // SF -> NYC
  [3, 5],   // Paris -> London
]

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

function CityMarker({ city, radius }: { city: typeof CITIES[0]; radius: number }) {
  const position = latLngToVector3(city.lat, city.lng, radius)
  const markerRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (markerRef.current && city.active) {
      markerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.3)
    }
  })

  return (
    <group position={position}>
      <mesh ref={markerRef}>
        <sphereGeometry args={[city.active ? 0.03 : 0.015, 16, 16]} />
        <meshBasicMaterial color={city.active ? '#a855f7' : '#6366f1'} />
      </mesh>
      {city.active && (
        <>
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.15} />
          </mesh>
          <Html distanceFactor={4} style={{ pointerEvents: 'none' }}>
            <div className="whitespace-nowrap text-center -translate-y-6">
              <span className="text-xs bg-black/70 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30 backdrop-blur-sm">
                {city.flag} {city.name}
              </span>
            </div>
          </Html>
        </>
      )}
    </group>
  )
}

function ArcConnection({ from, to, radius }: { from: typeof CITIES[0]; to: typeof CITIES[0]; radius: number }) {
  const curveRef = useRef<THREE.Line>(null)

  const curve = useMemo(() => {
    const start = latLngToVector3(from.lat, from.lng, radius)
    const end = latLngToVector3(to.lat, to.lng, radius)
    const mid = start.clone().add(end).multiplyScalar(0.5)
    const dist = start.distanceTo(end)
    mid.normalize().multiplyScalar(radius + dist * 0.3)

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
    const points = curve.getPoints(50)
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [from, to, radius])

  return (
    <line ref={curveRef as any} geometry={curve}>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
    </line>
  )
}

function PulsingRing({ radius }: { radius: number }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius + 0.01, radius + 0.015, 128]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} side={THREE.DoubleSide} />
    </mesh>
  )
}

function GlobeScene() {
  const globeRef = useRef<THREE.Group>(null)
  const RADIUS = 1.5

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 3, 5]} intensity={1} color="#a855f7" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#06b6d4" />

      <group ref={globeRef}>
        {/* Globe sphere */}
        <Sphere args={[RADIUS, 64, 64]}>
          <meshStandardMaterial
            color="#0a0a2e"
            transparent
            opacity={0.9}
            wireframe={false}
          />
        </Sphere>

        {/* Wireframe overlay */}
        <Sphere args={[RADIUS + 0.005, 32, 32]}>
          <meshBasicMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.08}
          />
        </Sphere>

        {/* Connections */}
        {CONNECTIONS.map(([fromIdx, toIdx], i) => (
          <ArcConnection
            key={i}
            from={CITIES[fromIdx]}
            to={CITIES[toIdx]}
            radius={RADIUS}
          />
        ))}

        {/* City markers */}
        {CITIES.map((city, i) => (
          <CityMarker key={i} city={city} radius={RADIUS} />
        ))}

        <PulsingRing radius={RADIUS} />
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  )
}

export default function Globe3D() {
  return (
    <div className="w-full h-[600px] md:h-[700px] relative">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <GlobeScene />
      </Canvas>

      {/* Glow effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>
    </div>
  )
}
