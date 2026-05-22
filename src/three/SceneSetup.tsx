import { Environment, Lightformer } from '@react-three/drei';

/**
 * Shared lighting rig: soft ambient fill, a warm directional key light, a
 * cool rim light, plus a procedural studio environment (built entirely from
 * Lightformers so nothing is fetched from the network — works offline and
 * keeps the glass transmission material looking premium).
 */
export function SceneSetup() {
  return (
    <>
      <ambientLight intensity={0.6} color="#f4efe6" />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.1}
        color="#fff7ec"
        castShadow={false}
      />
      {/* cool rim light from behind */}
      <directionalLight position={[-5, 2, -4]} intensity={1.1} color="#bcd6cd" />

      <Environment resolution={256}>
        <group rotation={[0, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={3}
            color="#ffffff"
            position={[0, 4, 2]}
            scale={[8, 4, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            color="#cfe2da"
            position={[-4, 1, -3]}
            scale={[4, 6, 1]}
          />
          <Lightformer
            form="circle"
            intensity={2}
            color="#fbeed8"
            position={[3, -1, 3]}
            scale={[3, 3, 1]}
          />
        </group>
      </Environment>
    </>
  );
}
