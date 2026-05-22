import { useEffect, useRef, useState } from 'react';

const NAV = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Ciencia', href: '#science' },
  { label: 'Nuestra Historia', href: '#about' },
  { label: 'Comunidad', href: '#community' },
];

/** Fixed header that hides on scroll-down, reveals on scroll-up. */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-smooth ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="container-px flex items-center justify-between py-5">
        <a href="#hero" className="font-serif text-2xl italic tracking-tight">
          Duyu
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-9 text-[13px] uppercase tracking-[0.14em]">
            {NAV.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  className="relative py-1 text-charcoal/80 transition-colors hover:text-charcoal
                             after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left
                             after:scale-x-0 after:bg-charcoal after:transition-transform after:duration-500
                             hover:after:scale-x-100"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#subscribe" className="cta cta-dark hidden sm:inline-flex">
            Pre-ordena Thyroid Hero®
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-6 bg-charcoal transition-transform ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span className={`h-px w-6 bg-charcoal transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span
              className={`h-px w-6 bg-charcoal transition-transform ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`overflow-hidden bg-cream/95 backdrop-blur md:hidden transition-[max-height] duration-500 ease-smooth ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <ul className="container-px flex flex-col gap-5 py-6 font-serif text-2xl">
          {NAV.map((n) => (
            <li key={n.label}>
              <a href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
