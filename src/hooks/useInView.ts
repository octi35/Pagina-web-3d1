import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref + boolean that flips true the first time the element enters
 * the viewport. Used to lazy-mount heavy Three.js canvases (perf requirement).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = '200px'
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}
