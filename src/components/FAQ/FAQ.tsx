import { useState } from 'react';
import { RevealHeading } from '../shared/RevealHeading';

const ITEMS = [
  {
    q: '¿Cuáles son los 13 ingredientes clave en Thyroid Hero™?',
    a: 'Ashwagandha, Chaga Orgánico, L-Tirosina, Beta Caroteno, Selenio, Vitamina D3, Vitamina B12, Vitamina B1, Vitamina B2, Yodo, Glicinato de Magnesio, Zinc y Hierro.',
  },
  {
    q: '¿Cuáles son los beneficios para la salud de cada ingrediente clave?',
    a: 'Cada ingrediente se elige para un rol específico — los adaptógenos como la Ashwagandha y el Chaga Orgánico ayudan a manejar el estrés y la regulación inmunológica; la L-Tirosina, Yodo, Selenio y Zinc apoyan directamente la producción y metabolismo de las hormonas tiroideas; las vitaminas B, D3, Hierro y Glicinato de Magnesio completan la energía, la función cognitiva y el bienestar general.',
  },
  {
    q: '¿Cuántas cápsulas de Thyroid Hero™ debo tomar al día?',
    a: 'Nuestra dosis recomendada es de dos cápsulas al día, idealmente tomadas con comida y agua.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28 md:py-40">
      <div className="container-px grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow mb-6 text-charcoal/55">Preguntas Frecuentes</p>
          <RevealHeading
            as="h2"
            text="¿Tienes *preguntas?*"
            className="font-serif text-[12vw] font-medium leading-[1] md:text-[5vw]"
          />
        </div>

        <div>
          {ITEMS.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div key={idx} className="border-t border-charcoal/15">
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center gap-6 py-7 text-left"
                  aria-expanded={isOpen}
                >
                  <i className="font-serif text-sm not-italic text-charcoal/45">
                    [0{idx + 1}]
                  </i>
                  <p className="flex-1 text-lg font-medium md:text-xl">{item.q}</p>
                  <span
                    className={`text-2xl transition-transform duration-500 ease-smooth ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-smooth ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-8 pl-12 pr-6 text-base leading-relaxed text-charcoal/75">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
