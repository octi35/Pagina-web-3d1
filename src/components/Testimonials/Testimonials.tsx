import { useState } from 'react';
import { RevealHeading } from '../shared/RevealHeading';

const SLIDES = [
  {
    title: ['Nuestro Enfoque ', 'Reactivo', 'Proactivo'],
    body: 'La atención médica, tal como existe hoy, suele ser reactiva, exclusivamente prescriptiva y trata solo los síntomas — no al ser humano. Los desafíos diarios del estrés crónico, los contaminantes tóxicos, la inflamación y las dietas deficientes en nutrientes son inevitables. Nunca es demasiado temprano para incorporar hábitos saludables.',
  },
  {
    title: ['Cuidado para Cada', '', 'Cuerpo'],
    body: 'Donde sea que estés en tu camino hacia la sanación, estamos contigo. Duyu ofrece soluciones holísticas que empoderan tu propio cuerpo y decisiones diarias — suplementos respaldados por ciencia junto con pruebas en demanda para protocolos personalizados.',
  },
  {
    title: ['Rituales Diarios', '', 'Impulsados Por Ciencia'],
    body: 'Nos importan los datos fríos y claros. Duyu es tu compañero ideal para la salud y el bienestar — un suplemento tiroideo limpio, potente y de espectro completo elaborado con 13 ingredientes estudiados científicamente.',
  },
  {
    title: ['Los Buenos Hábitos', '', 'Son Geniales'],
    body: 'La salud depende de nuestras decisiones diarias. Salud es un verbo — una búsqueda activa y definida por nosotros mismos. Queremos vivir en un mundo donde la enfermedad sea opcional, navegable o prevenible a través de la dieta, el movimiento, el sueño, la salud mental y la comunidad.',
  },
];

const MARQUEE = [
  'Formulado por nutricionistas',
  'Espectro completo',
  '13 ingredientes activos',
  'Probado por terceros',
  'Respaldado por ciencia',
  'Hecho para cada cuerpo',
  'Ritual diario',
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const slide = SLIDES[i];

  return (
    <section id="community" className="overflow-hidden">
      {/* big stat */}
      <div className="container-px py-28 text-center md:py-40">
        <p className="eyebrow mb-6 text-charcoal/55">¿Sabías que?</p>
        <RevealHeading
          as="h2"
          text="Más de 800 millones de personas en el mundo se ven afectadas por *Afecciones de la* *Tiroides*"
          className="mx-auto max-w-[20ch] font-serif text-[8vw] font-medium leading-[1.02] md:text-[4.5vw]"
        />
      </div>

      {/* marquee */}
      <div className="border-y border-charcoal/15 py-6">
        <div className="flex w-max marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, idx) => (
            <span
              key={idx}
              className="mx-8 whitespace-nowrap font-serif text-2xl italic text-charcoal/70 md:text-3xl"
            >
              {m} <span className="not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* fade carousel */}
      <div className="bg-sage/40 py-24 md:py-32">
        <div className="container-px">
          <div className="mb-10 flex items-center justify-between">
            <p className="eyebrow text-charcoal/60">Por qué somos diferentes</p>
            <div className="flex items-center gap-6">
              <span className="font-serif text-lg">
                {String(i + 1).padStart(2, '0')}{' '}
                <span className="text-charcoal/40">/ 0{SLIDES.length}</span>
              </span>
              <div className="flex gap-3">
                <button
                  aria-label="Previous slide"
                  onClick={() => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/30 transition-colors hover:bg-charcoal hover:text-cream"
                >
                  ←
                </button>
                <button
                  aria-label="Next slide"
                  onClick={() => setI((p) => (p + 1) % SLIDES.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/30 transition-colors hover:bg-charcoal hover:text-cream"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="grid min-h-[40vh] gap-12 md:grid-cols-2">
            <div key={`t-${i}`} className="animate-[fadeIn_0.6s_ease]">
              <h3 className="font-serif text-[8vw] font-medium leading-[1] md:text-[3.8vw]">
                {slide.title[0]}
                {slide.title[1] && <s className="opacity-40">{slide.title[1]}</s>}
                <br />
                <span className="italic">{slide.title[2]}</span>
              </h3>
            </div>
            <div
              key={`b-${i}`}
              className="flex items-center animate-[fadeIn_0.6s_ease]"
            >
              <p className="max-w-prose text-lg leading-relaxed text-charcoal/80">
                {slide.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
