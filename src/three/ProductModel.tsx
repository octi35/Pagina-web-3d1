import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Pointer } from '../hooks/useMouseParallax';

interface ProductModelProps {
  /** lerped pointer (-1..1) shared from the parent render loop */
  pointer: React.MutableRefObject<Pointer>;
  /** 0..1 scroll progress used to add an extra scrubbed spin */
  scroll?: React.MutableRefObject<number>;
}

/**
 * A frosted-glass supplement jar built from a LatheGeometry profile, capped
 * with a metallic charcoal lid. Idle auto-rotation + lerped mouse parallax,
 * plus an optional scroll-scrubbed Y rotation. Geometries/materials are
 * memoised and disposed by R3F on unmount.
 */
export function ProductModel({ pointer, scroll }: ProductModelProps) {
  const group = useRef<THREE.Group>(null);

  // Lathe profile (x = radius, y = height) describing the jar silhouette.
  const bottleGeo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0.0, -1.25));
    pts.push(new THREE.Vector2(0.55, -1.25));
    pts.push(new THREE.Vector2(0.78, -1.18));
    pts.push(new THREE.Vector2(0.82, -0.9));
    pts.push(new THREE.Vector2(0.82, 0.55));
    pts.push(new THREE.Vector2(0.8, 0.78));
    pts.push(new THREE.Vector2(0.6, 0.86));
    pts.push(new THREE.Vector2(0.58, 0.95));
    return new THREE.LatheGeometry(pts, 64);
  }, []);

  const lidGeo = useMemo(() => new THREE.CylinderGeometry(0.62, 0.62, 0.42, 64), []);
  const labelGeo = useMemo(
    () => new THREE.CylinderGeometry(0.835, 0.835, 0.95, 64, 1, true),
    []
  );

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#e8efe9'),
        transmission: 0.92,
        thickness: 1.2,
        roughness: 0.18,
        metalness: 0,
        ior: 1.35,
        clearcoat: 0.6,
        clearcoatRoughness: 0.3,
        attenuationColor: new THREE.Color('#cfe2da'),
        attenuationDistance: 2.5,
      }),
    []
  );

  const lidMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1c1b18'),
        roughness: 0.35,
        metalness: 0.55,
      }),
    []
  );

  const labelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f4efe6'),
        roughness: 0.85,
        metalness: 0,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.96,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    const p = pointer.current;
    const s = scroll?.current ?? 0;
    // base slow spin + an extra scroll-scrubbed full turn
    group.current.rotation.y += delta * 0.25 + s * delta * 6;
    // mouse parallax tilt, lerped toward target
    const targetX = p.y * 0.25;
    const targetZ = -p.x * 0.12;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.06;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.06;
    group.current.position.x += (p.x * 0.15 - group.current.position.x) * 0.05;
  });

  return (
    <group ref={group} scale={1.15}>
      <mesh geometry={bottleGeo} material={glassMat} />
      {/* paper label band */}
      <mesh geometry={labelGeo} material={labelMat} position={[0, -0.2, 0]} />
      {/* lid */}
      <mesh geometry={lidGeo} material={lidMat} position={[0, 1.05, 0]} />
    </group>
  );
}
