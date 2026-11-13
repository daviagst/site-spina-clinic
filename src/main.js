import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

document.querySelector('#app').innerHTML = `
  <main class="setup">
    <p class="eyebrow" data-reveal>SPINA CLINIC</p>
    <h1 data-reveal>Um novo começo.</h1>
    <p data-reveal>Base do projeto pronta para receber o layout.</p>
  </main>
`

const motion = gsap.matchMedia()
motion.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from('[data-reveal]', {
    autoAlpha: 0,
    y: 24,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out',
  })
})

if (import.meta.hot) {
  import.meta.hot.dispose(() => motion.revert())
}
