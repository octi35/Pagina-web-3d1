import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Counts from 0 to `to` when scrolled into view. */
export function CountUp({
  to,
  suffix = '',
  className = '',
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = { v: 0 };
    const tween = gsap.to(o, {
      v: to,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => setVal(Math.round(o.v)),
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to]);

  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}
