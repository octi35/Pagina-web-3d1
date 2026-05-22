import { useEffect, useRef } from 'react';

export interface Pointer {
  /** -1 .. 1 normalised, lerped */
  x: number;
  y: number;
}

/**
 * Tracks normalised pointer position (-1..1) and exposes a lerped value via a
 * ref so consumers (e.g. a Three.js render loop) can read it every frame
 * without triggering React re-renders.
 */
export function useMouseParallax(smoothing = 0.08) {
  const target = useRef<Pointer>({ x: 0, y: 0 });
  const current = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  /** Call once per frame to advance the lerp and get the smoothed pointer. */
  const update = () => {
    current.current.x += (target.current.x - current.current.x) * smoothing;
    current.current.y += (target.current.y - current.current.y) * smoothing;
    return current.current;
  };

  return { update, target, current };
}
