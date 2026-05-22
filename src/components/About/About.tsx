import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BackgroundMesh } from '../../three/BackgroundMesh';
import { RevealHeading } from '../shared/RevealHeading';
import { useInView } from '../../hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const root = useRef<HTMLElement>(null);
  const { ref: host, inView } = useInView<HTMLDivElement>('300px');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // line-by-line unmask of the editorial paragraph
      gsap.utils.toArray<HTMLElement>('[data-line]').forEach((line) => {
        gsap.fromTo(
          line.querySelector('span'),
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: line, start: 'top 88%' },
          }
        );
      });
      gsap.fromTo(
        '[data-quote]',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-quote]', start: 'top 85%' },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const lines = [
    'En noviembre de 2020, los cofundadores y socios Marie Peinert y',
    'Raphael Reuben descubrieron que Marie padecía una afección',
    'tiroidea autoinmune. Juntos, se embarcaron en un viaje hacia la recuperación',
    'a través del cuidado holístico. Al igual que Marie, 800 millones de personas en',
    'todo el mundo se ven afectadas por afecciones de la tiroides. Duyu Care existe',
    'para ayudar a quienes viven con estas afecciones crónicas — y para',
    'proporcionar atención preventiva de primera clase para todos los demás.',
  ];

  return (
    <section
      ref={root}
      id="about"
      className="relative overflow-hidden bg-charcoal py-28 text-cream md:py-40"
    >
      {/* subtle background mesh */}
      <div ref={host} className="pointer-events-none absolute inset-0 opacity-60">
        {inView && (
          <Canvas camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <BackgroundMesh />
            </Suspense>
          </Canvas>
        )}
      </div>

      <div className="container-px relative z-10">
        <p className="eyebrow mb-10 text-cream/60">Sobre nosotros</p>

        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <RevealHeading
              as="h2"
              text="Compartimos tu *Experiencia* *Vivida*"
              className="mb-10 font-serif text-[9vw] font-medium leading-[1] md:text-[4.5vw]"
            />
            <div className="max-w-2xl text-lg leading-relaxed text-cream/80 md:text-xl">
              {lines.map((l, i) => (
                <span
                  key={i}
                  data-line
                  className="block overflow-hidden"
                >
                  <span className="block will-change-transform">{l}</span>
                </span>
              ))}
            </div>
            <a href="#about" className="cta cta-stroke-light mt-10">
              Conócenos
            </a>
          </div>

          <figure
            data-quote
            className="flex flex-col justify-between rounded-3xl border border-cream/15 bg-cream/[0.04] p-10"
          >
            <svg width="40" height="40" viewBox="0 0 36 36" fill="none" className="opacity-80">
              <path
                d="M36 8.86C32.6 9.2 30 10.18 28.09 11.8c-1.9 1.63-2.86 3.62-2.86 5.97 0 1.35.7 2.39 2.1 3.11 1.29.62 2.3 1.24 3.03 1.85.73.56 1.1 1.49 1.1 2.78 0 1.46-.5 2.58-1.51 3.36-.96.73-2.13 1.1-3.54 1.1-1 0-1.93-.23-2.77-.67-.84-.5-1.57-1.15-2.19-1.94-.62-.78-1.12-1.68-1.51-2.69-.34-1.06-.5-2.16-.5-3.28 0-1.85.36-3.62 1.09-5.3.79-1.74 1.88-3.28 3.28-4.63 1.4-1.4 3.11-2.58 5.13-3.53C31.01 6.98 33.36 6.34 36 6v2.86Zm-19.43 0c-3.36.34-6 1.32-7.9 2.94-1.91 1.63-2.86 3.62-2.86 5.97 0 1.35.7 2.39 2.1 3.11 1.29.62 2.3 1.24 3.03 1.85.73.56 1.1 1.49 1.1 2.78 0 1.46-.5 2.58-1.51 3.36-.96.73-2.13 1.1-3.54 1.1-1 0-1.93-.23-2.77-.67-.84-.5-1.57-1.15-2.19-1.94C1.4 26.58.9 25.68.5 24.67.17 23.6 0 22.51 0 21.39c0-1.85.36-3.62 1.09-5.3.79-1.74 1.88-3.28 3.28-4.63 1.4-1.4 3.11-2.58 5.13-3.53C11.58 6.98 13.93 6.34 16.57 6v2.86Z"
                fill="#f4efe6"
              />
            </svg>
            <blockquote className="my-8 font-serif text-2xl italic leading-snug md:text-3xl">
              A través de mi viaje personal de salud, me he dado cuenta de que 
              empoderar a las personas para que se hagan cargo de su propia salud 
              tiene el potencial de revolucionar nuestra manera de enfocar el cuidado de la salud.
            </blockquote>
            <figcaption className="text-sm uppercase tracking-[0.14em] text-cream/60">
              Marie Peinert — Cofundadora y CEO de Duyu
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
