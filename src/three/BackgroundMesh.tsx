import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Slowly rotating wireframe icosahedron — a subtle 3D texture for backgrounds. */
export function BackgroundMesh({ color = '#9bbab0' }: { color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(2.6, 1), []);
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.25 }),
    [color]
  );
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.x += d * 0.05;
    ref.current.rotation.y += d * 0.08;
  });
  return <mesh ref={ref} geometry={geo} material={mat} />;
}
