import { useState } from 'react';
import { RevealHeading } from '../shared/RevealHeading';

const SLIDES = [
  {
    title: ['Our ', 'Reactive', 'Proactive Approach'],
    body: 'Healthcare, as it exists today, is often reactive, exclusively prescriptive, and only treats the symptoms — not the human. The daily challenges of chronic stress, toxic pollutants, inflammation and nutrient-deficient diets are unavoidable. It’s never too early to incorporate healthy habits.',
  },
  {
    title: ['Care for Every', '', 'Body'],
    body: 'Wherever you are on your healing journey, we’ve got you. Duyu provides holistic solutions that empower agency over your body and daily choices — science-backed supplements plus on-demand testing for personalised protocols.',
  },
  {
    title: ['Daily Rituals', '', 'Powered By Science'],
    body: 'We care about the cold, hard facts. Duyu is your go-to health and wellness partner — a clean, potent full-spectrum thyroid supplement made with 13 scientifically studied ingredients.',
  },
  {
    title: ['Good Habits', '', 'Are Cool'],
    body: 'Health relies on our daily choices. Health is a verb — an active, self-defined pursuit. We want to live in a world where illness is optional, navigable, or preventable through diet, movement, sleep, mental health and community.',
  },
];

const MARQUEE = [
  'Nutritionist-formulated',
  'Full-spectrum',
  '13 active ingredients',
  'Third-party tested',
  'Science-backed',
  'Made for everyBody',
  'Daily ritual',
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const slide = SLIDES[i];

  return (
    <section id="community" className="overflow-hidden">
      {/* big stat */}
      <div className="container-px py-28 text-center md:py-40">
        <p className="eyebrow mb-6 text-charcoal/55">Did you know?</p>
        <RevealHeading
          as="h2"
          text="Over 800 million people worldwide are affected by *Thyroid* *Conditions*"
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
            <p className="eyebrow text-charcoal/60">Why we’re different</p>
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
