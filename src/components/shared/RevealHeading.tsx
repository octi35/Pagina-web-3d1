import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealHeadingProps {
  /** text where words wrapped in * become italic serif emphasis */
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** start trigger; pass "load" to animate immediately (hero) */
  trigger?: 'scroll' | 'load';
  delay?: number;
}

/**
 * Word-by-word reveal mimicking the original's blur+rise effect. Words wrapped
 * in *asterisks* render as italic Playfair emphasis. Splits manually so we
 * don't need the paid GSAP SplitText plugin.
 */
export function RevealHeading({
  text,
  as = 'h2',
  className = '',
  trigger = 'scroll',
  delay = 0,
}: RevealHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as any;

  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLElement>('[data-word]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(spans, { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { autoAlpha: 0, y: '0.5em', filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.06,
          delay,
          scrollTrigger:
            trigger === 'scroll'
              ? { trigger: el, start: 'top 82%' }
              : undefined,
        }
      );
    }, el);
    return () => ctx.revert();
  }, [trigger, delay]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => {
        const italic = w.startsWith('*') && w.endsWith('*');
        const clean = italic ? w.slice(1, -1) : w;
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
            <span data-word className="inline-block will-change-transform">
              {italic ? <i className="font-serif italic">{clean}</i> : clean}
            </span>
            {i < words.length - 1 && ' '}
          </span>
        );
      })}
    </Tag>
  );
}
