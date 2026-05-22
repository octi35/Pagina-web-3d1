import { useState } from 'react';
import { RevealHeading } from '../shared/RevealHeading';

const ITEMS = [
  {
    q: 'What are the 13 key ingredients in Thyroid Hero™?',
    a: 'Ashwagandha, Organic Chaga, L-Tyrosine, Beta Carotene, Selenium, Vitamin D3, Vitamin B12, Vitamin B1, Vitamin B2, Iodine, Magnesium Glycinate, Zinc, and Iron.',
  },
  {
    q: 'What are the health benefits of each key ingredient?',
    a: 'Each ingredient is chosen for a specific role — adaptogens like Ashwagandha and Organic Chaga help manage stress and immune regulation; L-Tyrosine, Iodine, Selenium and Zinc directly support thyroid hormone production and metabolism; the B-vitamins, D3, Iron and Magnesium Glycinate round out energy, cognitive function, and overall wellbeing.',
  },
  {
    q: 'How many Thyroid Hero™ capsules should I take per day?',
    a: 'Our recommended dosage is two capsules daily, ideally taken with food and water.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28 md:py-40">
      <div className="container-px grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow mb-6 text-charcoal/55">FAQ</p>
          <RevealHeading
            as="h2"
            text="Have *questions?*"
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
