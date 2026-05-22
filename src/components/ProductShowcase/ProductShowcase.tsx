import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneSetup } from '../../three/SceneSetup';
import { ProductModel } from '../../three/ProductModel';
import { Rig } from '../../three/Rig';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { useInView } from '../../hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

const ADVANTAGES = [
  'Tu tiroides es el héroe silencioso de tu cuerpo, trabajando incansablemente para mantener bajo control tu metabolismo, niveles de energía y estado de ánimo.',
  'La glándula tiroidea requiere varios nutrientes clave para su función óptima — esenciales para la producción, conversión y regulación de las hormonas tiroideas.',
  'Nuestro suplemento de espectro completo formulado por nutricionistas entrega estas vitaminas, minerales y adaptógenos esenciales en una porción diaria.',
  'Cuidar tu tiroides se vuelve fácil.',
];

const FUNCTIONS = [
  ['Función Inmune', 'Defensa Antioxidante'],
  ['Función Metabólica', 'Mantenimiento de Peso'],
  ['Función Cognitiva', 'Energía balanceada, reducción de fatiga + niebla mental, regulación emocional + estrés'],
  ['Salud Menstrual', 'Regularidad menstrual, alivio de síntomas'],
  ['Salud de la Piel', 'Cabello brillante, uñas fuertes, piel hidratada'],
];

export function ProductShowcase() {
  const parallax = useMouseParallax();
  const scroll = useRef(0);
  const section = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);
  const { ref: canvasHost, inView } = useInView<HTMLDivElement>('300px');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // scrub the jar rotation across the whole section
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          scroll.current = self.progress;
        },
      });
      // staggered advantage cards
      gsap.fromTo(
        '[data-adv]',
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: cards.current, start: 'top 78%' },
        }
      );
      gsap.fromTo(
        '[data-fn]',
        { autoAlpha: 0, x: -30 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '[data-fn-list]', start: 'top 80%' },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="endocrine" className="relative py-28 md:py-40">
      <div className="container-px">
        <h2 className="text-center font-serif text-[10vw] font-medium leading-[0.95] md:text-[5.5vw]">
          Tu Sistema Endocrino,
          <br />
          <span className="italic">Optimizado</span>
        </h2>
      </div>

      {/* sticky jar + advantage cards */}
      <div className="container-px mt-20 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative hidden lg:block">
          <div
            ref={canvasHost}
            className="sticky top-24 h-[70vh] w-full"
            aria-hidden
          >
            {inView && (
              <Canvas
                className="!h-full !w-full"
                camera={{ position: [0, 0, 6], fov: 35 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <SceneSetup />
                  <Rig update={parallax.update} />
                  <ProductModel pointer={parallax.current} scroll={scroll} />
                </Suspense>
              </Canvas>
            )}
          </div>
        </div>

        <div ref={cards} className="flex flex-col gap-px">
          <p className="mb-8 font-serif text-3xl md:text-4xl">
            Thyroid Hero<span className="align-super text-base">®</span>
          </p>
          {ADVANTAGES.map((t, i) => (
            <div
              key={i}
              data-adv
              className="flex gap-6 border-t border-charcoal/15 py-7"
            >
              <span className="font-serif text-sm italic text-charcoal/50">
                [0{i + 1}]
              </span>
              <p className="max-w-prose text-lg leading-relaxed text-charcoal/85">
                {t}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* functions marquee-ish list */}
      <div
        data-fn-list
        className="container-px mt-28 grid gap-x-12 gap-y-8 border-t border-charcoal/15 pt-12 md:grid-cols-2 lg:grid-cols-3"
      >
        {FUNCTIONS.map(([title, desc]) => (
          <div key={title} data-fn className="border-b border-charcoal/10 pb-6">
            <h3 className="font-serif text-2xl italic">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
