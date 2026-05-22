import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneSetup } from '../../three/SceneSetup';
import { ProductModel } from '../../three/ProductModel';
import { Rig } from '../../three/Rig';
import { RevealHeading } from '../shared/RevealHeading';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { useReveal } from '../../hooks/useReveal';

/**
 * Full-viewport hero: a 3D glass jar centred behind editorial copy. The jar
 * auto-rotates and tilts toward the pointer; headline + supporting blocks fade
 * and rise in on load.
 */
export function Hero() {
  const parallax = useMouseParallax();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, { start: 'top 95%', delay: 0.4 } as any);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* ambient gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_10%,#ffffff_0%,#f4efe6_45%,#e6ddcb_100%)]" />

      {/* 3D jar */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Canvas
          className="!h-full !w-full"
          camera={{ position: [0, 0, 6], fov: 35 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <SceneSetup />
            <Rig update={parallax.update} />
            <ProductModel pointer={parallax.current} />
          </Suspense>
        </Canvas>
      </div>

      <div className="container-px relative z-10 flex flex-1 flex-col justify-between pb-10 pt-32 md:pt-40">
        <RevealHeading
          as="h1"
          trigger="load"
          delay={0.2}
          text="El Nuevo Estándar de la *Salud* *Tiroidea*"
          className="max-w-[14ch] font-serif text-[13vw] font-medium leading-[0.95] tracking-tight md:text-[7.5vw]"
        />

        <div className="grid items-end gap-10 md:grid-cols-2">
          <div className="flex items-center gap-6">
            <a href="#endocrine" className="cta cta-light border border-charcoal/15">
              <span>↓</span> Desplazar
            </a>
            {/* founder portraits — gradient stand-ins */}
            <div className="flex -space-x-4">
              <span className="h-14 w-14 rounded-full border-2 border-cream bg-[conic-gradient(at_30%_30%,#cdbfa3,#b8d0c8,#9bbab0)]" />
              <span className="h-14 w-14 rounded-full border-2 border-cream bg-[conic-gradient(at_70%_40%,#d8c7ad,#e9e2d4,#b8d0c8)]" />
            </div>
          </div>

          <div className="max-w-xl justify-self-end">
            <p
              data-reveal
              className="mb-6 text-base leading-relaxed text-charcoal/80 md:text-lg"
            >
              La salud tiroidea es fundamental para la salud de todo el cuerpo. 
              En Duyu Care creemos en la creación de salud en lugar de combatir 
              enfermedades — desarrollando productos estudiados científicamente 
              que apoyan tu función tiroidea y bienestar general.
            </p>
            <a href="#subscribe" className="cta cta-stroke">
              Pre-ordenar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
