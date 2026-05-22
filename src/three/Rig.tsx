import { useFrame } from '@react-three/fiber';

/** Advances the mouse-parallax lerp once per frame inside the R3F loop. */
export function Rig({ update }: { update: () => void }) {
  useFrame(() => update());
  return null;
}
