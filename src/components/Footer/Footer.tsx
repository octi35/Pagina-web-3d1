import { RevealHeading } from '../shared/RevealHeading';

const GALLERY = [
  'linear-gradient(135deg,#cdbfa3,#b8d0c8)',
  'linear-gradient(135deg,#b8d0c8,#9bbab0)',
  'linear-gradient(135deg,#e9e2d4,#d8c7ad)',
  'linear-gradient(135deg,#9bbab0,#cfe2da)',
];

export function Footer() {
  return (
    <>
      {/* subscribe / help band */}
      <section
        id="subscribe"
        className="bg-[radial-gradient(120%_120%_at_80%_0%,#cfe2da_0%,#b8d0c8_55%,#9bbab0_100%)] py-28 md:py-40"
      >
        <div className="container-px grid items-end gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-4 text-charcoal/65">Ayudándote a</p>
            <RevealHeading
              as="h2"
              text="Sentirte mejor, *constantemente.*"
              className="font-serif text-[11vw] font-medium leading-[1] md:text-[5vw]"
            />
          </div>
          <div className="max-w-md md:justify-self-end">
            <p className="mb-8 text-lg leading-relaxed text-charcoal/80">
              La suplementación nutricional tiene mayor impacto cuando se usa de manera rutinaria.
              Suscribirse a Duyu asegura que tu suministro de 30 días de Thyroid Hero®
              llegue sin demoras — para que no te pierdas ni un día de beneficios.
            </p>
            <a href="#subscribe" className="cta cta-dark">
              Suscríbete Ahora
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-charcoal py-20 text-cream">
        <div className="container-px">
          <div className="flex flex-col gap-12 border-b border-cream/15 pb-14 lg:flex-row lg:justify-between">
            <a href="#hero" className="font-serif text-4xl italic">
              Duyu
            </a>
            <div className="max-w-md">
              <p className="mb-6 font-serif text-2xl">
                Síguenos en <i className="italic">Instagram</i>
              </p>
              <div className="grid grid-cols-4 gap-3">
                {GALLERY.map((g, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg"
                    style={{ backgroundImage: g }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-12 py-14 md:grid-cols-2">
            <p className="max-w-md font-serif text-2xl md:text-3xl">
              ¡Contáctanos sobre{' '}
              <i className="italic">lo último en cuidado tiroideo!</i>
            </p>
            <div className="md:justify-self-end">
              <p className="mb-6 max-w-xs text-cream/70">
                Haz clic en “Contáctanos” para suscribirte y descubrir mucha más información.
              </p>
              <a href="#subscribe" className="cta cta-stroke-light">
                Contáctanos
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-cream/15 py-12 text-sm md:grid-cols-3">
            <div className="flex flex-col gap-3 text-cream/70">
              <a href="#science" className="hover:text-cream">Ciencia</a>
              <a href="#about" className="hover:text-cream">Nuestra Historia</a>
            </div>
            <div className="flex flex-col gap-3 text-cream/70">
              <a href="#community" className="hover:text-cream">Comunidad</a>
              <a href="#subscribe" className="hover:text-cream">Contáctanos</a>
              <a href="https://www.instagram.com/duyucare/" className="hover:text-cream">
                Instagram
              </a>
            </div>
            <div className="flex flex-col gap-3 text-cream/70">
              <a href="#" className="hover:text-cream">Política de Privacidad</a>
              <a href="#" className="hover:text-cream">Términos y Condiciones</a>
              <a href="#" className="hover:text-cream">Política de Cookies</a>
            </div>
          </div>

          <p className="pt-8 text-xs text-cream/50">
            © 2026 Duyu Care Limited. Todos los derechos reservados. — Recreación para fines de demostración.
          </p>
        </div>
      </footer>
    </>
  );
}
