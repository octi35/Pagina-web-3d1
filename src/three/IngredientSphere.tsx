import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Pointer } from '../hooks/useMouseParallax';

interface IngredientSphereProps {
  position: [number, number, number];
  color: string;
  radius?: number;
  /** depth factor — how strongly this sphere reacts to mouse parallax */
  depth?: number;
  speed?: number;
  pointer: React.MutableRefObject<Pointer>;
}

/**
 * A soft translucent sphere/pill standing in for a formula ingredient.
 * Floats on a sine bob and drifts with mouse parallax scaled by its depth so
 * nearer spheres move more — a layered depth effect.
 */
export function IngredientSphere({
  position,
  color,
  radius = 0.6,
  depth = 1,
  speed = 1,
  pointer,
}: IngredientSphereProps) {
  const ref = useRef<THREE.Mesh>(null);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);
  const geo = useMemo(() => new THREE.SphereGeometry(radius, 48, 48), [radius]);
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        transmission: 0.55,
        thickness: 0.8,
        roughness: 0.25,
        metalness: 0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.25,
        ior: 1.4,
      }),
    [color]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const p = pointer.current;
    ref.current.position.x = position[0] + p.x * depth * 0.6;
    ref.current.position.y =
      position[1] + Math.sin(t * speed + seed) * 0.18 - p.y * depth * 0.4;
    ref.current.rotation.y = t * 0.3 * speed;
  });

  return <mesh ref={ref} geometry={geo} material={mat} position={position} />;
}
