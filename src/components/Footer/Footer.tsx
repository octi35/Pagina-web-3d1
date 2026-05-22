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
            <p className="eyebrow mb-4 text-charcoal/65">Helping you</p>
            <RevealHeading
              as="h2"
              text="Feel better, *consistently.*"
              className="font-serif text-[11vw] font-medium leading-[1] md:text-[5vw]"
            />
          </div>
          <div className="max-w-md md:justify-self-end">
            <p className="mb-8 text-lg leading-relaxed text-charcoal/80">
              Nutritional supplementation is most impactful when used routinely.
              Subscribing to Duyu ensures your 30-day supply of Thyroid Hero®
              reaches you without delay — so you don’t miss a day of benefits.
            </p>
            <a href="#subscribe" className="cta cta-dark">
              Subscribe Now
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
                Follow us on <i className="italic">Instagram</i>
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
              Contact us regarding{' '}
              <i className="italic">the latest in thyroid care!</i>
            </p>
            <div className="md:justify-self-end">
              <p className="mb-6 max-w-xs text-cream/70">
                Click “Contact Us” to subscribe and discover a wealth of
                information.
              </p>
              <a href="#subscribe" className="cta cta-stroke-light">
                Contact Us
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-cream/15 py-12 text-sm md:grid-cols-3">
            <div className="flex flex-col gap-3 text-cream/70">
              <a href="#science" className="hover:text-cream">Science</a>
              <a href="#about" className="hover:text-cream">Our Story</a>
            </div>
            <div className="flex flex-col gap-3 text-cream/70">
              <a href="#community" className="hover:text-cream">Community</a>
              <a href="#subscribe" className="hover:text-cream">Contact Us</a>
              <a href="https://www.instagram.com/duyucare/" className="hover:text-cream">
                Instagram
              </a>
            </div>
            <div className="flex flex-col gap-3 text-cream/70">
              <a href="#" className="hover:text-cream">Privacy Policy</a>
              <a href="#" className="hover:text-cream">Terms &amp; Conditions</a>
              <a href="#" className="hover:text-cream">Cookie Policy</a>
            </div>
          </div>

          <p className="pt-8 text-xs text-cream/50">
            © 2026 Duyu Care Limited. All rights reserved. — Recreation for demo
            purposes.
          </p>
        </div>
      </footer>
    </>
  );
}
