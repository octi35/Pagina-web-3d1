import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneSetup } from '../../three/SceneSetup';
import { IngredientSphere } from '../../three/IngredientSphere';
import { Rig } from '../../three/Rig';
import { CountUp } from '../shared/CountUp';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { useInView } from '../../hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS = [
  'Ashwagandha',
  'Organic Chaga',
  'L-Tyrosine',
  'Beta Carotene',
  'Selenium',
  'Vitamin D3',
  'Vitamin B12',
  'Vitamin B1',
  'Vitamin B2',
  'Iodine',
  'Magnesium Glycinate',
  'Zinc',
  'Iron',
];

const SPHERES: { position: [number, number, number]; color: string; radius: number; depth: number; speed: number }[] = [
  { position: [-2.6, 1.1, 0], color: '#b8d0c8', radius: 0.7, depth: 1.2, speed: 0.8 },
  { position: [2.4, 1.6, -1], color: '#d8c7ad', radius: 0.55, depth: 0.7, speed: 1.1 },
  { position: [1.8, -1.2, 0.5], color: '#9bbab0', radius: 0.85, depth: 1.5, speed: 0.6 },
  { position: [-2.1, -1.4, -0.5], color: '#e9e2d4', radius: 0.5, depth: 0.5, speed: 1.3 },
  { position: [0.2, 0.3, -1.5], color: '#cfe2da', radius: 1.0, depth: 0.9, speed: 0.7 },
];

const STATS = [
  { to: 60, suffix: '%', label: 'están sin diagnosticar' },
  { to: 5, suffix: ' años', label: 'tiempo promedio para recibir un diagnóstico' },
  { to: 50, suffix: '%', label: 'aún experimentan síntomas después de recibir tratamiento' },
  { to: 78, suffix: '%', label: 'de los médicos recomiendan suplementación como parte del tratamiento de la tiroides' },
];

export function Ingredients() {
  const parallax = useMouseParallax(0.05);
  const root = useRef<HTMLElement>(null);
  const { ref: host, inView } = useInView<HTMLDivElement>('300px');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // char-by-char reveal on the ingredient names
      const items = gsap.utils.toArray<HTMLElement>('[data-char]');
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.03,
          scrollTrigger: { trigger: '[data-ing-list]', start: 'top 80%' },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="ingredients" className="relative overflow-hidden">
      {/* floating spheres canvas */}
      <div ref={host} className="relative py-28 md:py-40">
        <div className="pointer-events-none absolute inset-0">
          {inView && (
            <Canvas
              className="!h-full !w-full"
              camera={{ position: [0, 0, 7], fov: 38 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <SceneSetup />
                <Rig update={parallax.update} />
                {SPHERES.map((s, i) => (
                  <IngredientSphere key={i} {...s} pointer={parallax.current} />
                ))}
              </Suspense>
            </Canvas>
          )}
        </div>

        <div className="container-px relative z-10">
          <p className="eyebrow mb-6 text-charcoal/60">La Fórmula</p>
          <h2 className="max-w-[16ch] font-serif text-[8vw] font-medium leading-[1] md:text-[4.5vw]">
            13 ingredientes estudiados científicamente en un ritual diario.
          </h2>

          <div
            data-ing-list
            className="mt-16 flex flex-wrap gap-x-3 gap-y-4"
          >
            {INGREDIENTS.map((ing) => (
              <span
                key={ing}
                data-char
                className="rounded-full border border-charcoal/25 bg-cream/60 px-5 py-2.5 text-sm backdrop-blur-sm md:text-base"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* science stats band */}
      <div id="science" className="bg-sage py-24 md:py-32">
        <div className="container-px">
          <p className="eyebrow mb-4 text-charcoal/70">Ciencia</p>
          <h3 className="mb-16 max-w-[18ch] font-serif text-[7vw] font-medium leading-[1.02] md:text-[3.6vw]">
            Por qué nuestro <span className="italic">enfoque</span> es importante
          </h3>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-t border-charcoal/25 pt-5">
                <CountUp
                  to={s.to}
                  suffix={s.suffix}
                  className="font-serif text-6xl font-medium md:text-7xl"
                />
                <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
