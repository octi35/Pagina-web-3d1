import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Generic scroll reveal: fades + translates any [data-reveal] element inside
 * the scope into view, with stagger driven by DOM order. Pass a containerRef.
 */
export function useReveal(
  ref: React.RefObject<HTMLElement>,
  opts: { y?: number; stagger?: number; start?: string } = {}
) {
  useEffect(() => {
    const { y = 30, stagger = 0.08, start = 'top 80%' } = opts;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]', el);
      targets.forEach((t) => {
        gsap.fromTo(
          t,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger,
            scrollTrigger: { trigger: t, start },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [ref, opts]);
}
