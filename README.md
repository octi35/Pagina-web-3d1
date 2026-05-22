# Duyu Care — 3D Landing Page Clone

A pixel-feel recreation of [duyucare.dops.agency](https://duyucare.dops.agency/)
(brand: **Duyu Care**, product: *Thyroid Hero®*) built with the requested stack.

## Stack

- **React + Vite + TypeScript**
- **Tailwind CSS** — layout, typography, design tokens (cream `#f4efe6`, sage `#b8d0c8`, charcoal `#1c1b18`)
- **Three.js** via **@react-three/fiber** + **@react-three/drei** — glass jar, ingredient spheres, background mesh
- **GSAP + ScrollTrigger** — entrance reveals, pinned/scrubbed 3D rotation, count-ups, line unmasks
- **Lenis** — smooth scroll, synced to the GSAP ticker

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview
```

## Structure

```
src/
  components/
    Preloader/      counter intro + wipe
    Header/         hide-on-scroll nav + mobile drawer
    Hero/           full-viewport 3D glass jar + headline
    ProductShowcase/ sticky jar, scroll-scrubbed spin, staggered cards
    Ingredients/    floating spheres (mouse-parallax depth) + 13 ingredients + animated stats
    About/          dark editorial, line-unmask, wireframe bg mesh
    Testimonials/   big stat, marquee, fade carousel
    FAQ/            accordion
    Footer/         subscribe band + footer
    shared/         RevealHeading, CountUp
  three/
    SceneSetup.tsx       lights + procedural (offline) environment
    ProductModel.tsx     LatheGeometry glass jar, MeshPhysicalMaterial transmission
    IngredientSphere.tsx SphereGeometry + physical material, depth parallax
    BackgroundMesh.tsx   wireframe icosahedron
    Rig.tsx              advances mouse-parallax lerp inside the R3F loop
  hooks/
    useSmoothScroll.ts   Lenis ↔ GSAP ticker
    useMouseParallax.ts  lerped pointer ref (no re-renders)
    useReveal.ts         generic [data-reveal] scroll reveal
    useInView.ts         IntersectionObserver for lazy-mounting canvases
  styles/globals.css
  App.tsx
```

## Notes / decisions

- **3D**: jar is a `LatheGeometry` profile with a `MeshPhysicalMaterial`
  glass (transmission/thickness/clearcoat) over a charcoal metallic lid;
  ingredient spheres use translucent physical material. Lighting = ambient +
  warm directional key + cool rim, plus a `<Lightformer>` environment so
  nothing is fetched from the network.
- **Performance**: every canvas after the hero is lazy-mounted via
  IntersectionObserver; geometries/materials are `useMemo`'d and disposed by
  R3F on unmount; `dpr` is capped at 2.
- **Accessibility**: `prefers-reduced-motion` short-circuits the preloader,
  parallax, smooth scroll, and heading reveals.
- Images on the original are real photos; per the brief, stand-ins here are
  gradient/geometric placeholders (founder portraits, Instagram grid) — no gray boxes.
