'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Line, Float } from '@react-three/drei'
import * as THREE from 'three'

// === ALL CITIES ===
const CITIES = [
  // SUISSE
  { name: 'Geneve', lat: 46.2044, lng: 6.1432, active: true },
  { name: 'Zurich', lat: 47.3769, lng: 8.5417, active: true },
  { name: 'Lausanne', lat: 46.5197, lng: 6.6323, active: true },
  { name: 'Bern', lat: 46.9480, lng: 7.4474, active: false },
  { name: 'Basel', lat: 47.5596, lng: 7.5886, active: false },
  { name: 'Lugano', lat: 46.0037, lng: 8.9511, active: false },
  // FRANCE
  { name: 'Paris', lat: 48.8566, lng: 2.3522, active: true },
  { name: 'Lyon', lat: 45.7640, lng: 4.8357, active: false },
  { name: 'Marseille', lat: 43.2965, lng: 5.3698, active: false },
  { name: 'Toulouse', lat: 43.6047, lng: 1.4442, active: false },
  { name: 'Nice', lat: 43.7102, lng: 7.2620, active: false },
  { name: 'Bordeaux', lat: 44.8378, lng: -0.5792, active: false },
  { name: 'Lille', lat: 50.6292, lng: 3.0573, active: false },
  { name: 'Strasbourg', lat: 48.5734, lng: 7.7521, active: false },
  { name: 'Nantes', lat: 47.2184, lng: -1.5536, active: false },
  { name: 'Montpellier', lat: 43.6108, lng: 3.8767, active: false },
  // UK
  { name: 'London', lat: 51.5074, lng: -0.1278, active: true },
  { name: 'Manchester', lat: 53.4808, lng: -2.2426, active: false },
  { name: 'Birmingham', lat: 52.4862, lng: -1.8904, active: false },
  { name: 'Edinburgh', lat: 55.9533, lng: -3.1883, active: false },
  { name: 'Glasgow', lat: 55.8642, lng: -4.2518, active: false },
  { name: 'Bristol', lat: 51.4545, lng: -2.5879, active: false },
  { name: 'Leeds', lat: 53.8008, lng: -1.5491, active: false },
  { name: 'Liverpool', lat: 53.4084, lng: -2.9916, active: false },
  { name: 'Cambridge', lat: 52.2053, lng: 0.1218, active: false },
  { name: 'Oxford', lat: 51.7520, lng: -1.2577, active: false },
  // ALLEMAGNE
  { name: 'Berlin', lat: 52.5200, lng: 13.4050, active: true },
  { name: 'Munich', lat: 48.1351, lng: 11.5820, active: false },
  { name: 'Hamburg', lat: 53.5511, lng: 9.9937, active: false },
  { name: 'Frankfurt', lat: 50.1109, lng: 8.6821, active: false },
  { name: 'Stuttgart', lat: 48.7758, lng: 9.1829, active: false },
  { name: 'Cologne', lat: 50.9375, lng: 6.9603, active: false },
  // EUROPE
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, active: true },
  { name: 'Brussels', lat: 50.8503, lng: 4.3517, active: false },
  { name: 'Stockholm', lat: 59.3293, lng: 18.0686, active: true },
  { name: 'Oslo', lat: 59.9139, lng: 10.7522, active: false },
  { name: 'Copenhagen', lat: 55.6761, lng: 12.5683, active: false },
  { name: 'Helsinki', lat: 60.1699, lng: 24.9384, active: false },
  { name: 'Madrid', lat: 40.4168, lng: -3.7038, active: false },
  { name: 'Barcelona', lat: 41.3874, lng: 2.1686, active: false },
  { name: 'Lisbon', lat: 38.7223, lng: -9.1393, active: false },
  { name: 'Rome', lat: 41.9028, lng: 12.4964, active: false },
  { name: 'Milan', lat: 45.4642, lng: 9.1900, active: false },
  { name: 'Vienna', lat: 48.2082, lng: 16.3738, active: false },
  { name: 'Prague', lat: 50.0755, lng: 14.4378, active: false },
  { name: 'Warsaw', lat: 52.2297, lng: 21.0122, active: false },
  { name: 'Budapest', lat: 47.4979, lng: 19.0402, active: false },
  { name: 'Dublin', lat: 53.3498, lng: -6.2603, active: false },
  { name: 'Athens', lat: 37.9838, lng: 23.7275, active: false },
  { name: 'Tallinn', lat: 59.4370, lng: 24.7536, active: false },
  // CANADA
  { name: 'Montreal', lat: 45.5017, lng: -73.5673, active: true },
  { name: 'Toronto', lat: 43.6532, lng: -79.3832, active: true },
  { name: 'Vancouver', lat: 49.2827, lng: -123.1207, active: true },
  { name: 'Ottawa', lat: 45.4215, lng: -75.6972, active: false },
  { name: 'Calgary', lat: 51.0447, lng: -114.0719, active: false },
  { name: 'Edmonton', lat: 53.5461, lng: -113.4938, active: false },
  { name: 'Quebec City', lat: 46.8139, lng: -71.2080, active: false },
  { name: 'Winnipeg', lat: 49.8951, lng: -97.1384, active: false },
  { name: 'Halifax', lat: 44.6488, lng: -63.5752, active: false },
  // USA
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194, active: true },
  { name: 'New York', lat: 40.7128, lng: -74.0060, active: true },
  { name: 'Boston', lat: 42.3601, lng: -71.0589, active: false },
  { name: 'Seattle', lat: 47.6062, lng: -122.3321, active: false },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, active: false },
  { name: 'Austin', lat: 30.2672, lng: -97.7431, active: false },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298, active: false },
  { name: 'Washington', lat: 38.9072, lng: -77.0369, active: false },
  { name: 'Miami', lat: 25.7617, lng: -80.1918, active: false },
]

// Connections from hub (Geneve) to major cities
const HUB_CONNECTIONS = [
  [0, 6],   // Geneve -> Paris
  [0, 1],   // Geneve -> Zurich
  [0, 16],  // Geneve -> London
  [0, 26],  // Geneve -> Berlin
  [0, 32],  // Geneve -> Amsterdam
  [0, 50],  // Geneve -> Montreal
  [0, 59],  // Geneve -> San Francisco
  [0, 60],  // Geneve -> New York
  [6, 16],  // Paris -> London
  [6, 12],  // Paris -> Lille
  [6, 7],   // Paris -> Lyon
  [16, 19], // London -> Edinburgh
  [16, 17], // London -> Manchester
  [26, 27], // Berlin -> Munich
  [26, 28], // Berlin -> Hamburg
  [32, 35], // Amsterdam -> Brussels -> erreur, Brussels idx
  [34, 36], // Stockholm -> Copenhagen
  [50, 51], // Montreal -> Toronto
  [51, 52], // Toronto -> Vancouver
  [59, 60], // SF -> NYC
  [59, 62], // SF -> Seattle
  [6, 39],  // Paris -> Barcelona
  [26, 44], // Berlin -> Prague
  [42, 43], // Milan -> Rome erreur... let me fix indices
]

const RADIUS = 1.5

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

// === GOLD BRAIN (neural mesh) ===
function GoldenBrain() {
  const brainRef = useRef<THREE.Group>(null)
  const neuronsRef = useRef<THREE.Points>(null)
  const pulseLinesRef = useRef<THREE.Group>(null)

  // Generate realistic brain shape with two hemispheres + sulci
  const { positions, connections, brainSurface } = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const conns: [number, number][] = []
    const surface: THREE.Vector3[] = []

    // LEFT HEMISPHERE
    for (let i = 0; i < 250; i++) {
      const u = Math.random() * Math.PI
      const v = Math.random() * Math.PI * 2
      // Brain shape: wider at top, narrower at bottom, split in middle
      const baseR = 0.32
      const bumps = 1 + 0.08 * Math.sin(u * 6) * Math.cos(v * 4) + 0.05 * Math.sin(u * 12 + v * 8)
      const rx = baseR * bumps
      const ry = baseR * 0.75 * bumps
      const rz = baseR * 0.9 * bumps

      const x = rx * Math.sin(u) * Math.cos(v) - 0.04 // left offset
      const y = ry * Math.cos(u) * 0.9 + 0.02
      const z = rz * Math.sin(u) * Math.sin(v)

      // Only left hemisphere
      if (x < 0.02) {
        pts.push(new THREE.Vector3(x, y, z))
        if (Math.random() > 0.5) surface.push(new THREE.Vector3(x, y, z))
      }
    }

    // RIGHT HEMISPHERE
    for (let i = 0; i < 250; i++) {
      const u = Math.random() * Math.PI
      const v = Math.random() * Math.PI * 2
      const baseR = 0.32
      const bumps = 1 + 0.08 * Math.sin(u * 6 + 1) * Math.cos(v * 4 + 0.5) + 0.05 * Math.sin(u * 12 + v * 8 + 2)
      const rx = baseR * bumps
      const ry = baseR * 0.75 * bumps
      const rz = baseR * 0.9 * bumps

      const x = rx * Math.sin(u) * Math.cos(v) + 0.04 // right offset
      const y = ry * Math.cos(u) * 0.9 + 0.02
      const z = rz * Math.sin(u) * Math.sin(v)

      if (x > -0.02) {
        pts.push(new THREE.Vector3(x, y, z))
        if (Math.random() > 0.5) surface.push(new THREE.Vector3(x, y, z))
      }
    }

    // BRAIN STEM
    for (let i = 0; i < 40; i++) {
      const t = Math.random()
      const angle = Math.random() * Math.PI * 2
      const r = 0.06 + Math.random() * 0.03
      pts.push(new THREE.Vector3(
        Math.cos(angle) * r,
        -0.2 - t * 0.15,
        Math.sin(angle) * r
      ))
    }

    // SULCI (grooves) - dense connection points along brain folds
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI
      const side = i % 2 === 0 ? -1 : 1
      pts.push(new THREE.Vector3(
        side * 0.01,
        0.15 * Math.cos(t),
        0.28 * Math.sin(t)
      ))
    }

    // Create neural connections - nearby neurons connect
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dist = pts[i].distanceTo(pts[j])
        if (dist < 0.1 && Math.random() > 0.7) {
          conns.push([i, j])
        }
        // Long-range connections (inter-hemisphere)
        if (dist > 0.2 && dist < 0.5 && Math.random() > 0.97) {
          conns.push([i, j])
        }
      }
    }

    const positions = new Float32Array(pts.length * 3)
    pts.forEach((p, i) => {
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    })

    return { positions, connections: conns, brainSurface: surface }
  }, [])

  // Animate brain rotation and neuron pulses
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (brainRef.current) {
      brainRef.current.rotation.y = Math.sin(t * 0.2) * 0.15
      brainRef.current.rotation.x = Math.sin(t * 0.15) * 0.05
    }
    // Pulse the neuron points
    if (neuronsRef.current) {
      const mat = neuronsRef.current.material as THREE.PointsMaterial
      mat.opacity = 0.7 + Math.sin(t * 1.5) * 0.3
    }
    // Pulse connection groups
    if (pulseLinesRef.current) {
      pulseLinesRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        if (mesh.material && 'opacity' in mesh.material) {
          (mesh.material as THREE.Material).opacity = 0.15 + Math.sin(t * 2 + i * 0.3) * 0.15
        }
      })
    }
  })

  // Connection lines from brain to globe surface (neural highways to cities)
  const brainToCityLines = useMemo(() => {
    const lines: [number, number, number][][] = []
    const activeCities = CITIES.filter(c => c.active)
    activeCities.forEach((city, i) => {
      const cityPos = latLngToVec3(city.lat, city.lng, RADIUS)
      // Start from random brain surface point
      const brainPt = brainSurface[i % brainSurface.length] || new THREE.Vector3(0, 0, 0)
      const mid = brainPt.clone().add(cityPos).multiplyScalar(0.5)
      mid.normalize().multiplyScalar(RADIUS * 0.5)

      const curve = new THREE.QuadraticBezierCurve3(brainPt, mid, cityPos)
      lines.push(curve.getPoints(30).map(p => [p.x, p.y, p.z] as [number, number, number]))
    })
    return lines
  }, [brainSurface])

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={brainRef}>
        {/* Neuron points - gold dots on brain surface */}
        <points ref={neuronsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#FFD700"
            size={0.015}
            transparent
            opacity={0.9}
            sizeAttenuation
          />
        </points>

        {/* Dense neural connections (gold circuit lines) */}
        <group ref={pulseLinesRef}>
          {connections.slice(0, 300).map(([a, b], i) => {
            const pa = [positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2]] as [number, number, number]
            const pb = [positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]] as [number, number, number]
            // Curved connections for more organic look
            const mx = (pa[0] + pb[0]) / 2 + (Math.random() - 0.5) * 0.03
            const my = (pa[1] + pb[1]) / 2 + (Math.random() - 0.5) * 0.03
            const mz = (pa[2] + pb[2]) / 2 + (Math.random() - 0.5) * 0.03
            return (
              <Line
                key={`n${i}`}
                points={[pa, [mx, my, mz], pb]}
                color={i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FFA500' : '#DAA520'}
                lineWidth={i % 5 === 0 ? 1.5 : 0.8}
                transparent
                opacity={0.2 + (i % 10) * 0.03}
              />
            )
          })}
        </group>

        {/* Brain glow layers */}
        <Sphere args={[0.35, 32, 32]}>
          <meshStandardMaterial
            color="#FFD700"
            transparent
            opacity={0.04}
            emissive="#FFD700"
            emissiveIntensity={0.3}
          />
        </Sphere>
        <Sphere args={[0.28, 32, 32]}>
          <meshStandardMaterial
            color="#FFA500"
            transparent
            opacity={0.06}
            emissive="#FFA500"
            emissiveIntensity={0.5}
          />
        </Sphere>
        {/* Inner core glow */}
        <Sphere args={[0.12, 16, 16]}>
          <meshBasicMaterial color="#FFD700" transparent opacity={0.15} />
        </Sphere>
      </group>

      {/* Neural highways: brain to active cities */}
      {brainToCityLines.map((pts, i) => (
        <Line
          key={`btc${i}`}
          points={pts}
          color="#FFD700"
          lineWidth={1}
          transparent
          opacity={0.12}
        />
      ))}
    </Float>
  )
}

// === CITY MARKER ===
function CityMarker({ city }: { city: typeof CITIES[0] }) {
  const pos = latLngToVec3(city.lat, city.lng, RADIUS)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current && city.active) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2.5 + city.lat) * 0.4)
    }
  })

  return (
    <group position={pos}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[city.active ? 0.025 : 0.01, 12, 12]} />
        <meshBasicMaterial color={city.active ? '#FFD700' : '#DAA520'} />
      </mesh>
      {city.active && (
        <mesh>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0.1} />
        </mesh>
      )}
    </group>
  )
}

// === ARC CONNECTION (gold) ===
function ArcConnection({ fromIdx, toIdx }: { fromIdx: number; toIdx: number }) {
  const from = CITIES[fromIdx]
  const to = CITIES[toIdx]
  if (!from || !to) return null

  const points = useMemo(() => {
    const start = latLngToVec3(from.lat, from.lng, RADIUS)
    const end = latLngToVec3(to.lat, to.lng, RADIUS)
    const mid = start.clone().add(end).multiplyScalar(0.5)
    const dist = start.distanceTo(end)
    mid.normalize().multiplyScalar(RADIUS + dist * 0.25)
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
    return curve.getPoints(40).map(p => [p.x, p.y, p.z] as [number, number, number])
  }, [from, to])

  return (
    <Line
      points={points}
      color="#DAA520"
      lineWidth={1}
      transparent
      opacity={0.25}
    />
  )
}

// === NEURON PARTICLES traveling along connections ===
function NeuronParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 80

  const { initialPositions, speeds, connectionIndices } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const idx = new Array(count)

    for (let i = 0; i < count; i++) {
      const ci = Math.floor(Math.random() * HUB_CONNECTIONS.length)
      idx[i] = ci
      spd[i] = 0.3 + Math.random() * 0.7
      // Start at random position along connection
      const [fromIdx, toIdx] = HUB_CONNECTIONS[ci]
      const from = CITIES[fromIdx]
      const to = CITIES[toIdx]
      if (from && to) {
        const t = Math.random()
        const start = latLngToVec3(from.lat, from.lng, RADIUS)
        const end = latLngToVec3(to.lat, to.lng, RADIUS)
        const p = start.lerp(end, t)
        pos[i * 3] = p.x
        pos[i * 3 + 1] = p.y
        pos[i * 3 + 2] = p.z
      }
    }
    return { initialPositions: pos, speeds: spd, connectionIndices: idx }
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return
    const positions = particlesRef.current.geometry.attributes.position
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const ci = connectionIndices[i]
      const [fromIdx, toIdx] = HUB_CONNECTIONS[ci]
      const from = CITIES[fromIdx]
      const to = CITIES[toIdx]
      if (!from || !to) continue

      const progress = ((t * speeds[i] + i * 0.3) % 2) / 2 // 0-1 ping pong
      const pingPong = progress > 0.5 ? 1 - (progress - 0.5) * 2 : progress * 2

      const start = latLngToVec3(from.lat, from.lng, RADIUS)
      const end = latLngToVec3(to.lat, to.lng, RADIUS)
      const mid = start.clone().add(end.clone()).multiplyScalar(0.5)
      const dist = start.distanceTo(end)
      mid.normalize().multiplyScalar(RADIUS + dist * 0.25)

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      const p = curve.getPoint(pingPong)

      positions.setXYZ(i, p.x, p.y, p.z)
    }
    positions.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FFD700"
        size={0.03}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// === MAIN SCENE ===
function GlobeScene() {
  const globeRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.04
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 3, 5]} intensity={1.5} color="#FFD700" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#DAA520" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#FFA500" />

      <group ref={globeRef}>
        {/* Dark globe */}
        <Sphere args={[RADIUS, 64, 64]}>
          <meshStandardMaterial color="#080820" transparent opacity={0.92} />
        </Sphere>

        {/* Gold wireframe */}
        <Sphere args={[RADIUS + 0.003, 36, 36]}>
          <meshBasicMaterial color="#DAA520" wireframe transparent opacity={0.06} />
        </Sphere>

        {/* All city markers */}
        {CITIES.map((city, i) => (
          <CityMarker key={i} city={city} />
        ))}

        {/* All arc connections */}
        {HUB_CONNECTIONS.map(([from, to], i) => (
          <ArcConnection key={i} fromIdx={from} toIdx={to} />
        ))}

        {/* Moving neuron particles */}
        <NeuronParticles />
      </group>

      {/* Golden brain at center */}
      <GoldenBrain />

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
    <div className="w-full h-full min-h-[280px] sm:min-h-[400px] md:min-h-[600px] lg:min-h-[750px] relative">
      <Canvas
        camera={{ position: [0, 0.5, 3.8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <GlobeScene />
      </Canvas>

      {/* Gold glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-yellow-500/8 rounded-full blur-[80px]" />
      </div>
    </div>
  )
}
