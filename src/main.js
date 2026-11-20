import './style.css'
import { setupBooking } from './booking.js'
import './responsive.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

document.querySelector('#app').innerHTML = `
  <main>
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__scene" aria-hidden="true"></div>
      <div class="hero__gradient" aria-hidden="true"></div>

      <header class="header">
        <a class="brand" href="/" aria-label="Spina Clinic — início">
          <img
            src="/assets/imagem/spina-clinic-v2.svg"
            alt="Spina Clinic"
            width="110"
            height="80"
          />
        </a>

        <button class="menu-toggle glass" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span></button>
        <nav class="nav glass" id="main-nav" aria-label="Menu principal">
          <button type="button" data-section="A clínica">A clínica</button>
          <button type="button" data-section="Dra. Gabriela">
            Dra. Gabriela
          </button>
          <button type="button" data-section="Atendimento">
            Atendimento
          </button>
          <button type="button" data-section="Dúvidas">Dúvidas</button>
          <a
            href="https://www.instagram.com/spina.clinic/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contato
          </a>
        </nav>
      </header>

      <div class="hero__content">
        <h1 id="hero-title">
          <span class="hero__headline">Sua saúde merece atenção.</span>
          <em>Seus objetivos também.</em>
        </h1>

        <p class="hero__description">
          Atendimento médico com a Dra. Gabriela Becker Spina, em Gurupi.
          Um espaço para entender suas necessidades e avaliar
          os próximos passos do seu cuidado.
        </p>

        <a
          class="hero__button glass"
          href="https://www.instagram.com/spina.clinic/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Solicitar agendamento
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <p class="scene-status" role="status">Preparando o ambiente…</p>
    </section>

    <section class="clinic" id="a-clinica" aria-labelledby="clinic-title">
      <div class="clinic__stage">
        <div class="clinic__copy">
          <h2 id="clinic-title"><span class="clinic__line"><span>Um espaço para olhar</span></span><span class="clinic__line"><span>com atenção para</span></span><span class="clinic__line"><em>a sua saúde.</em></span></h2>
          <p>Localizada em Gurupi, a Spina Clinic está vinculada à atuação da Dra. Gabriela Becker Spina. Aqui, você encontra informações sobre a médica, os atendimentos e os canais para organizar sua primeira consulta.</p>
        </div>
        <div class="clinic__deck">
          <div class="clinic__card clinic__card--back" aria-hidden="true"><img src="/assets/imagem/spina-clinic-parede-pvc.png" alt="" /></div>
          <div class="clinic__card clinic__card--middle" aria-hidden="true"><img src="/assets/imagem/spina-clinic-parede-pvc.png" alt="" /></div>
          <div class="clinic__card clinic__card--front"><img src="/assets/imagem/spina-clinic-parede-pvc.png" alt="Recepção da Spina Clinic, com balcão claro e a marca na parede" /></div>
        </div>
      </div>
    </section>

    <section class="doctor-intro" aria-labelledby="doctor-intro-title">
      <h2 id="doctor-intro-title">
        <span class="doctor-intro__line"><span>Conheça quem estará</span></span>
        <span class="doctor-intro__line"><em>com você nessa</em></span>
        <span class="doctor-intro__line"><span>conversa.</span></span>
      </h2>
    </section>

    <section class="doctor" id="dra-gabriela" aria-labelledby="doctor-name">
      <h2 class="doctor__name" id="doctor-name">Dra. Gabriela Becker Spina</h2>
      <div class="doctor__portrait"><div class="doctor__tilt"><img src="/assets/imagem/dra-gabriela.png" alt="Dra. Gabriela Becker Spina" width="1080" height="1350" /></div></div>
      <div class="doctor__info doctor__info--left">
        <p>Gabriela Becker Spina é médica e sócia-administradora da empresa Spina Clinic, em Gurupi.</p>
        <a class="doctor__button glass" href="https://www.instagram.com/spina.clinic/" target="_blank" rel="noopener noreferrer">Solicitar agendamento</a>
      </div>
      <div class="doctor__info doctor__info--right"><p>Nutróloga formada pela Unitpac e com 4 anos de Bombeiros e SAMU no Tocantins, a Dra. Gabriela une ciência e acolhimento para devolver qualidade de vida a cada paciente.</p></div>
    </section>

<section class="services" id="atendimento" aria-label="Áreas de atendimento"><div class="services__track"><article class="service-panel" aria-labelledby="service-title-1"><div class="service-card"><span class="service-card__number">01</span><div class="service-card__copy"><h2 id="service-title-1"><span class="service-card__title">EMAGRECIMENTO</span> <em class="service-card__subtitle">E NUTROLOGIA</em></h2><p>Acompanhamento médico para você alcançar um peso saudável e manter o resultado, sem dietas malucas.</p></div><img src="/assets/imagem/img-1.png" alt="EMAGRECIMENTO E NUTROLOGIA" width="600" height="840" loading="lazy" /></div></article><article class="service-panel" aria-labelledby="service-title-2"><div class="service-card"><span class="service-card__number">02</span><div class="service-card__copy"><h2 id="service-title-2"><span class="service-card__title">Lipedema</span> <em class="service-card__subtitle"></em></h2><p>Diagnóstico e manejo clínico de uma condição que muita gente passa anos sem entender.</p></div><img src="/assets/imagem/img-2.png" alt="Lipedema " width="600" height="840" loading="lazy" /></div></article><article class="service-panel" aria-labelledby="service-title-3"><div class="service-card"><span class="service-card__number">03</span><div class="service-card__copy"><h2 id="service-title-3"><span class="service-card__title">Saúde</span> <em class="service-card__subtitle">Hormonal</em></h2><p>Cuidado individualizado para as mudanças hormonais em cada fase da vida.</p></div><img src="/assets/imagem/img-3.png" alt="Saúde Hormonal" width="600" height="840" loading="lazy" /></div></article><article class="service-panel" aria-labelledby="service-title-4"><div class="service-card"><span class="service-card__number">04</span><div class="service-card__copy"><h2 id="service-title-4"><span class="service-card__title">Soroterapia e</span> <em class="service-card__subtitle">Terapias Injetáveis</em></h2><p>Reposição de vitaminas e nutrientes com indicação e acompanhamento médico.</p></div><img src="/assets/imagem/img-4.png" alt="Soroterapia e Terapias Injetáveis" width="600" height="840" loading="lazy" /></div></article><article class="service-panel" aria-labelledby="service-title-5"><div class="service-card"><span class="service-card__number">05</span><div class="service-card__copy"><h2 id="service-title-5"><span class="service-card__title">Modelagem</span> <em class="service-card__subtitle">Corporal</em></h2><p>Tecnologias como Unyque Pro e Refreeze, indicadas após avaliação médica.</p></div><img src="/assets/imagem/img-5.png" alt="Modelagem Corporal" width="600" height="840" loading="lazy" /></div></article></div></section>
    <section class="clinic-story" id="nosso-espaco" aria-labelledby="story-title">
      <img class="clinic-story__wall" src="/assets/imagem/spina-clinic-parede-pvc.png" alt="" />
      <div class="clinic-story__card">
        <img class="clinic-story__logo" src="/assets/imagem/logo-nome.png" alt="Spina Clinic" />
        <div class="clinic-story__picture"><img src="/assets/imagem/spina-clinic-recepcao-3d.png" alt="Recepção da Spina Clinic, com balcão de pedra e poltronas" /></div>
        <p class="clinic-story__intro">A Spina Clinic nasce, nesta proposta, com uma ideia central: tornar o cuidado com a saúde mais compreensível.</p>
        <h2 class="clinic-story__title" id="story-title">Cuidado próximo,<br>em Gurupi.</h2>
        <p class="clinic-story__description">Um ambiente acolhedor, uma comunicação próxima e atenção aos detalhes compõem a identidade que queremos transmitir em cada encontro.</p>
      </div>
    </section>

<section class="faq" id="duvidas" aria-label="Dúvidas frequentes"><div class="faq__inner"><article class="faq__row"><h2><span>Preciso ter um objetivo de</span> <em>emagrecimento para marcar?</em></h2><div class="faq__answer"><p>Não. Nesta proposta de atendimento, a consulta também contempla dúvidas sobre saúde nutricional, composição corporal e mudanças percebidas no corpo.</p></div></article><article class="faq__row"><h2><span>Como funciona a</span> <em>primeira consulta?</em></h2><div class="faq__answer"><p>O primeiro encontro é dedicado a conhecer seu histórico, entender suas necessidades e realizar a avaliação médica. A partir disso, são discutidos os próximos passos.</p></div></article><article class="faq__row"><h2><span>Preciso fazer</span> <em>exames antes?</em></h2><div class="faq__answer"><p>Você pode levar exames recentes que já possua. A necessidade de novos exames será avaliada durante a consulta.</p></div></article><article class="faq__row"><h2><span>Todo paciente recebe indicação</span> <em>de medicamentos ou suplementos?</em></h2><div class="faq__answer"><p>Não. A indicação depende da avaliação individual. A consulta não pressupõe a prescrição de um medicamento, suplemento ou procedimento específico.</p></div></article><article class="faq__row"><h2><span>A bioimpedância faz</span> <em>parte de todo atendimento?</em></h2><div class="faq__answer"><p>Ela pode ser utilizada como recurso complementar, conforme o objetivo da consulta e a indicação para cada paciente.</p></div></article><article class="faq__row"><h2><span>Como funcionam</span> <em>os retornos?</em></h2><div class="faq__answer"><p>A frequência do acompanhamento é definida conforme as necessidades e o plano discutido durante a consulta.</p></div></article><article class="faq__row"><h2><span>Como</span> <em>agendar?</em></h2><div class="faq__answer"><p>Clique em “Solicitar agendamento” para iniciar uma conversa com a equipe, conhecer os horários e receber as orientações para o primeiro atendimento.</p><a class="faq__button" href="https://www.instagram.com/spina.clinic/" target="_blank" rel="noopener noreferrer">Solicitar agendamento</a></div></article></div></section>
    <section class="closing" id="contato" aria-labelledby="closing-title">
      <h2 id="closing-title"><span>O próximo passo é</span><span>reservar um tempo</span><span>para você.</span></h2>
      <p>Traga suas dúvidas, sua história e seus objetivos.<br>Vamos começar pela compreensão do que você<br class="closing__break"> precisa hoje.</p>
    </section>
    <footer class="footer">
      <a class="footer__brand" href="#" aria-label="Spina Clinic — início"><img src="/assets/imagem/spina-clinic-v2.svg" alt="Spina Clinic" width="150" height="110" /></a>
      <nav class="footer__nav" aria-label="Navegação do rodapé">
        <a href="#a-clinica">A clínica</a><a href="#dra-gabriela">Dra. Gabriela</a><a href="#atendimento">Atendimento</a><a href="#duvidas">Dúvidas</a><a href="#contato">Contato</a>
      </nav>
      <div class="footer__social"><p>Redes sociais:</p><a href="https://www.instagram.com/spina.clinic/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Spina Clinic"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg></a></div>
      <p class="footer__note">Protótipo conceitual — serviços, jornada e textos institucionais ilustrativos, sujeitos à aprovação da clínica.</p>
    </footer>

    <dialog class="section-dialog">
      <h2></h2>
      <p>Esta seção será apresentada na próxima etapa do protótipo.</p>
      <button class="dialog-close" type="button">Fechar</button>
    </dialog>
  </main>
`

setupBooking()

const menuToggle = document.querySelector('.menu-toggle')
const mainNav = document.querySelector('#main-nav')
const mobileMenu = window.matchMedia('(max-width: 640px)')
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open))
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
  mainNav.classList.toggle('is-open', open)
  mainNav.inert = mobileMenu.matches && !open
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'))
mainNav.addEventListener('click', (event) => { if (event.target.closest('a, button')) setMenu(false) })
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') { setMenu(false); menuToggle.focus() }
})
document.addEventListener('click', (event) => { if (!event.target.closest('.header')) setMenu(false) })
mobileMenu.addEventListener('change', () => setMenu(false))
setMenu(false)

const doctorCompact = window.matchMedia('(max-width: 1000px)')
const doctorCTA = document.querySelector('.doctor__button')
function placeDoctorCTA() {
  document.querySelector(doctorCompact.matches ? '.doctor' : '.doctor__info--left').append(doctorCTA)
}
doctorCompact.addEventListener('change', placeDoctorCTA)
placeDoctorCTA()

// Navegação provisória até construirmos as próximas seções.
const dialog = document.querySelector('.section-dialog')

document.querySelectorAll('[data-section]').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.section === 'Dúvidas') {
      document.querySelector('#duvidas').scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (button.dataset.section === 'Atendimento') {
      document.querySelector('#atendimento').scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (button.dataset.section === 'Dra. Gabriela') {
      document.querySelector('#dra-gabriela').scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (button.dataset.section === 'A clínica') {
      document.querySelector('#a-clinica').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      return
    }
    dialog.querySelector('h2').textContent = button.dataset.section
    dialog.showModal()
  })
})

document.querySelector('.dialog-close').addEventListener('click', () => {
  dialog.close()
})

const container = document.querySelector('.hero__scene')
const status = document.querySelector('.scene-status')
const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
)

let renderer
let environmentTarget
let model
let disposed = false

const scene = new THREE.Scene()
scene.background = new THREE.Color('#b7ad99')

// Ajuste estes valores para refinar o enquadramento do seu GLB.
const cameraSettings = {
  position: new THREE.Vector3(0.15, 1.85, 1.65),
  target: new THREE.Vector3(0.15, 1.85, -2.28),
  fov: 48,
}

const camera = new THREE.PerspectiveCamera(
  cameraSettings.fov,
  1,
  0.1,
  100,
)

camera.position.copy(cameraSettings.position)
camera.lookAt(cameraSettings.target)

const animation = gsap.context(() => {
  if (reducedMotion.matches) return

  gsap.from('.header', {
    y: -16,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
  })

  gsap.from(
    ['.hero__headline', 'h1 em', '.hero__description', '.hero__button'],
    {
      y: 24,
      opacity: 0,
      duration: 1,
      stagger: 0.13,
      delay: 0.2,
      ease: 'power3.out',
    },
  )
})

function render() {
  if (!renderer || disposed) return
  renderer.render(scene, camera)
}

function resize() {
  if (!renderer || disposed) return

  const hero = document.querySelector('.hero')
  const { width, height } = hero.getBoundingClientRect()

  if (width <= 0 || height <= 0) return

  camera.aspect = width / height
  camera.fov = cameraSettings.fov
  camera.updateProjectionMatrix()

  // O CSS controla o tamanho visual do canvas.
  renderer.setSize(width, height, false)

  render()
}

function disposeModel(root) {
  const materials = new Set()
  const textures = new Set()

  root.traverse((object) => {
    object.geometry?.dispose()

    if (!object.material) return

    const list = Array.isArray(object.material)
      ? object.material
      : [object.material]

    list.forEach((material) => {
      materials.add(material)

      Object.values(material).forEach((value) => {
        if (value?.isTexture) textures.add(value)
      })
    })
  })

  textures.forEach((texture) => texture.dispose())
  materials.forEach((material) => material.dispose())
}


const hero = document.querySelector('.hero')
const finePointer = window.matchMedia('(pointer: fine)')
let cameraReady = false

function moveCamera(x = 0, y = 0) {
  if (!cameraReady || disposed || reducedMotion.matches || !finePointer.matches) return
  gsap.to(camera.position, {
    x: cameraSettings.position.x + x * 0.12,
    y: cameraSettings.position.y - y * 0.07,
    duration: 1.2,
    ease: 'power2.out',
    overwrite: 'auto',
    onUpdate: () => {
      camera.lookAt(cameraSettings.target)
      render()
    },
  })
}

function handlePointerMove(event) {
  if (event.pointerType === 'touch') return
  const rect = hero.getBoundingClientRect()
  moveCamera(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    ((event.clientY - rect.top) / rect.height) * 2 - 1,
  )
}

function handlePointerLeave() { moveCamera() }
hero.addEventListener('pointermove', handlePointerMove)
hero.addEventListener('pointerleave', handlePointerLeave)

async function initScene() {
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.AgXToneMapping
    renderer.toneMappingExposure = Math.pow(2, -0.6)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    container.appendChild(renderer.domElement)

    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()

    environmentTarget = pmrem.fromScene(room, 0.04)
    scene.environment = environmentTarget.texture
    scene.environmentIntensity = 0.3

    room.dispose()
    pmrem.dispose()

    // Iluminação e sombras foram gravadas na textura pelo Blender.
    // O ambiente acima é utilizado apenas pelo vidro, preservado como PBR.

    resize()

    const loader = new GLTFLoader()
    const gltf = await loader.loadAsync(
      '/assets/3D/spina-clinic-recepcao.glb?v=baked-recepcao-4',
    )

    if (disposed) {
      disposeModel(gltf.scene)
      return
    }

    model = gltf.scene

    // Preserva a geometria e a visibilidade exportadas do arquivo original.
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true
        object.receiveShadow = true
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach(material => {
          for (const texture of [material.map, material.emissiveMap]) {
            if (texture) texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
          }
        })
      }
    })

    scene.add(model)
    // Usa a câmera de recepção, nunca a câmera de vista geral.
    model.updateMatrixWorld(true)
    const sourceCamera = gltf.cameras.find(c => c.name.includes('recepcao'))
    if (sourceCamera) {
      sourceCamera.getWorldPosition(cameraSettings.position)
      const direction = new THREE.Vector3()
      sourceCamera.getWorldDirection(direction)
      cameraSettings.target.copy(cameraSettings.position).addScaledVector(direction, 4)
      cameraSettings.target.y -= 0.12
      cameraSettings.fov = sourceCamera.fov
      // Pequeno recorte para que as bordas externas da maquete não apareçam.
      camera.zoom = 1.08
      camera.near = sourceCamera.near
      camera.far = sourceCamera.far
      camera.position.copy(cameraSettings.position)
      camera.lookAt(cameraSettings.target)
    }
    status.hidden = true
    container.classList.add('is-ready')
    resize()

    if (reducedMotion.matches) {
      cameraReady = true
      render()
      return
    }

    camera.position.copy(cameraSettings.position)
    const entryDirection = cameraSettings.position.clone()
      .sub(cameraSettings.target).normalize()
    camera.position.addScaledVector(entryDirection, 0.15)
    camera.lookAt(cameraSettings.target)
    render()

    gsap.to(camera.position, {
      x: cameraSettings.position.x,
      y: cameraSettings.position.y,
      z: cameraSettings.position.z,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        camera.lookAt(cameraSettings.target)
        render()
      },
      onComplete: () => { cameraReady = true },
    })
  } catch (error) {
    console.error('Não foi possível carregar a recepção 3D:', error)

    status.textContent =
      'Não foi possível carregar o ambiente 3D. Atualize para tentar novamente.'
  }
}

const resizeObserver = new ResizeObserver(() => {
  resize()
})

resizeObserver.observe(document.querySelector('.hero'))

window.addEventListener('resize', resize)
initScene()

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    disposed = true
    animation.revert()
    gsap.killTweensOf(camera.position)
    window.removeEventListener('resize', resize)
    hero.removeEventListener('pointermove', handlePointerMove)
    hero.removeEventListener('pointerleave', handlePointerLeave)

    if (model) disposeModel(model)

    environmentTarget?.dispose()
    renderer?.dispose()
    renderer?.domElement.remove()

    resizeObserver.disconnect()
  })
}

// Os três frames são estados de uma única sequência controlada pela rolagem.
// Preserva as palavras inteiras e expõe uma única frase para leitores de tela.
const introTitle = document.querySelector('#doctor-intro-title')
introTitle.setAttribute('aria-label', 'Conheça quem estará com você nessa conversa.')
document.querySelectorAll('.doctor-intro__line > *').forEach((line) => {
  const text = line.textContent.trim()
  line.setAttribute('aria-hidden', 'true')
  line.replaceChildren()
  text.split(/(\s+)/).forEach((word) => {
    if (/^\s+$/.test(word)) {
      line.append(document.createTextNode(word))
      return
    }
    const wrapper = document.createElement('span')
    wrapper.className = 'doctor-intro__word'
    Array.from(word).forEach((letter) => {
      const char = document.createElement('span')
      char.className = 'doctor-intro__char'
      char.textContent = letter
      wrapper.append(char)
    })
    line.append(wrapper)
  })
})
const doctorName = document.querySelector('.doctor__name')
const signatureText = doctorName.textContent.trim()
doctorName.setAttribute('aria-label', signatureText)
doctorName.replaceChildren()
Array.from(signatureText).forEach((letter) => {
  const character = document.createElement('span')
  character.className = 'doctor__signature-letter'
  character.setAttribute('aria-hidden', 'true')
  character.textContent = letter === ' ' ? '\u00a0' : letter
  doctorName.append(character)
})
document.querySelectorAll('.faq__row h2 > span, .faq__row h2 > em').forEach((line) => {
  const inner = document.createElement('span')
  inner.className = 'faq__reveal-text'
  inner.textContent = line.textContent
  line.replaceChildren(inner)
  line.classList.add('faq__mask')
})
const closingTitle = document.querySelector('#closing-title')
closingTitle.setAttribute('aria-label', 'O próximo passo é reservar um tempo para você.')
closingTitle.querySelectorAll(':scope > span').forEach((line) => {
  const text = line.textContent
  line.setAttribute('aria-hidden', 'true')
  line.replaceChildren()
  text.split(/(\s+)/).forEach((word) => {
    if (/^\s+$/.test(word)) { line.append(document.createTextNode(word)); return }
    const wrapper = document.createElement('span')
    wrapper.className = 'closing__word'
    Array.from(word).forEach((letter) => {
      const char = document.createElement('span')
      char.className = 'closing__char'
      char.textContent = letter
      wrapper.append(char)
    })
    line.append(wrapper)
  })
})
// O alinhamento fica fora do elemento transformado para não acumular deslocamentos.
const storyCenter = document.createElement('div')
storyCenter.className = 'clinic-story__center'
const centeredStoryCard = document.querySelector('.clinic-story__card')
centeredStoryCard.before(storyCenter)
storyCenter.append(centeredStoryCard)
const clinicMotion = gsap.matchMedia()
clinicMotion.add({
  motion: '(prefers-reduced-motion: no-preference)',
  compact: '(max-width: 1000px)',
  short: '(max-height: 560px)',
}, (context) => {
  if (!context.conditions.motion) return
  const compact = context.conditions.compact
  const shortScreen = context.conditions.short
  gsap.from('.clinic__line > *', {
    yPercent: 110, opacity: 0, duration: 1, stagger: 0.14, ease: 'power3.out',
    scrollTrigger: { trigger: '.clinic', start: 'top 65%', toggleActions: 'play none none reverse' },
  })
  gsap.from('.clinic__copy p', {
    y: 18, opacity: 0, duration: 0.9, delay: 0.35,
    scrollTrigger: { trigger: '.clinic', start: 'top 65%', toggleActions: 'play none none reverse' },
  })
  // A abertura ganha margens conforme sai da tela, revelando o fundo verde.
  gsap.to('.hero', {
    clipPath: 'inset(0% 5% 0% 5%)',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6,
    },
  })

  // Primeiro cartão visível; os seguintes chegam pela frente, de baixo para cima.
  gsap.set('.clinic__card--middle, .clinic__card--front', {
    y: () => window.innerHeight, autoAlpha: 0,
  })
  const stack = gsap.timeline({ scrollTrigger: {
    trigger: '.clinic', start: shortScreen ? 'top 70%' : 'top top', end: shortScreen ? 'bottom 20%' : '+=120%', pin: !shortScreen,
    scrub: 0.8, invalidateOnRefresh: true,
  } })
  stack.to({}, { duration: 0.25 })
    .set('.clinic__card--middle', { autoAlpha: 1 })
    .to('.clinic__card--middle', {
      y: 0, duration: 1, ease: 'power1.out',
    })
    .to('.clinic__card--back', {
      xPercent: -16, rotation: -11, yPercent: 1, duration: 1, ease: 'power1.out',
    }, '<')
    .to({}, { duration: 0.25 })
    .set('.clinic__card--front', { autoAlpha: 1 })
    .to('.clinic__card--front', {
      y: 0, xPercent: 12, duration: 1, ease: 'power1.out',
    })
    .to('.clinic__card--middle', {
      xPercent: -7, rotation: -6, duration: 1, ease: 'power1.out',
    }, '<')
    .to({}, { duration: 0.3 })
  // A rolagem conduz a revelação; cada linha começa escondida pela máscara.
  gsap.set('.doctor-intro__char', { yPercent: 100, opacity: 0 })
  gsap.to('.doctor-intro__char',
    {
      yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.045,
      ease: 'power2.out', immediateRender: true,
      scrollTrigger: {
        trigger: '.doctor-intro',
        start: 'top 80%', end: 'top 15%',
        scrub: 0.7, invalidateOnRefresh: true,
      },
    },
  )
  gsap.set('.doctor__name', { autoAlpha: 1, y: 0 })
  gsap.set('.doctor__signature-letter', { clipPath: 'inset(-20% 110% -25% -15%)' })
  gsap.to('.doctor__signature-letter', {
    clipPath: 'inset(-20% -20% -25% -15%)',
    duration: 0.32, stagger: 0.065, ease: 'none',
    scrollTrigger: {
      trigger: '.doctor', start: 'top 85%',
      toggleActions: 'play none none reset',
    },
  })
  gsap.set('.doctor__portrait', { autoAlpha: 0 })
  gsap.set('.doctor__info, .doctor__button', { autoAlpha: 0, y: 18 })
  // Entrada acontece enquanto a seção entra na tela, antes da pausa.
  gsap.timeline({ scrollTrigger: {
    trigger: '.doctor', start: 'top 95%', end: 'top 25%',
    scrub: 0.35, invalidateOnRefresh: true,
  } })
    .to('.doctor__portrait', { autoAlpha: 1, duration: 0.65 }, 0.2)
  gsap.timeline({ scrollTrigger: {
    trigger: '.doctor', start: compact || shortScreen ? 'top 45%' : 'top top', end: compact || shortScreen ? 'bottom 85%' : '+=85%',
    pin: !compact && !shortScreen, scrub: 0.45, invalidateOnRefresh: true,
  } })
    .to('.doctor__name', { scale: compact ? 1 : 0.87, opacity: compact ? 0.65 : 0.3, duration: 1 })
    .to('.doctor__info, .doctor__button', { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.65 }, 0.15)
    .to({}, { duration: 0.15 })
  const panels = gsap.utils.toArray('.service-panel')
  const horizontal = gsap.to('.services__track', {
    x: () => -(document.querySelector('.services__track').scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: '.services', start: 'top top',
      end: () => '+=' + window.innerWidth * (panels.length - 1),
      pin: true, scrub: 0.7, invalidateOnRefresh: true,
    },
  })
  panels.forEach((panel, index) => {
    const elements = panel.querySelectorAll('.service-card__number, .service-card__title, .service-card__subtitle, .service-card__copy p')
    gsap.from(elements, {
      y: 28, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: index === 0 ? {
        trigger: '.services', start: 'top 65%', toggleActions: 'play none none reverse',
      } : {
        trigger: panel, containerAnimation: horizontal, start: 'left 65%',
        toggleActions: 'play none none reverse',
      },
    })
  })
  const storyMobile = () => window.innerWidth <= 1000
  const storySection = document.querySelector('.clinic-story')
  const storyCard = document.querySelector('.clinic-story__card')
  // A escala é uniforme; as dimensões do card permanecem constantes.
  const storyCoverScale = () => Math.max(
    storySection.clientWidth / storyCard.offsetWidth,
    storySection.clientHeight / storyCard.offsetHeight,
  ) + 0.01
  storySection.append(...document.querySelectorAll('.clinic-story__title, .clinic-story__description'))
  gsap.set('.clinic-story__wall', { clipPath: 'inset(24% 0% 0% 0%)' })
  gsap.set('.clinic-story__card', {
    y: () => storySection.clientHeight * 0.95, scale: 1,
    width: () => storyMobile() ? '78vw' : 'min(38vw, 460px)',
    height: '82svh', x: 0, xPercent: 0, yPercent: 0, transformOrigin: '50% 50%',
  })
  gsap.set('.clinic-story__logo, .clinic-story__intro', { autoAlpha: 1, y: 0 })
  gsap.set('.clinic-story__picture', {
    autoAlpha: 1, width: '66%', height: '48%', top: '50%', x: 0, xPercent: -50, yPercent: -50,
  })
  gsap.set('.clinic-story__title, .clinic-story__description', { autoAlpha: 0, y: 24 })
  // Primeiro revela o fundo; o card começa a entrar perto do fim da transição.
  gsap.timeline({ scrollTrigger: {
    trigger: '.clinic-story', start: 'top 85%', end: 'top top',
    scrub: 0.35, invalidateOnRefresh: true,
  } })
    .to('.clinic-story__wall', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'none' }, 0)
    .to('.clinic-story__card', {
      y: () => storySection.clientHeight * 0.70, duration: 0.22, ease: 'none',
    }, 0.78)
  gsap.timeline({ scrollTrigger: {
    trigger: '.clinic-story', start: 'top top', end: '+=290%',
    pin: true, scrub: 0.6, invalidateOnRefresh: true,
  } })
    .fromTo('.clinic-story__card',
      { y: () => storySection.clientHeight * 0.70 },
      { y: 0, duration: 1, ease: 'none', immediateRender: false })
    .to({}, { duration: 0.3 })
    .addLabel('expand')
    .to('.clinic-story__card', { scale: storyCoverScale, duration: 2.4, ease: 'none' })
    .to('.clinic-story__logo, .clinic-story__intro', { autoAlpha: 0, y: -25, duration: 0.85 }, 'expand+=0.7')
    .to('.clinic-story__picture', {
      width: () => storySection.clientWidth * (storyMobile() ? 0.66 : 0.42) / storyCoverScale(),
      height: () => storySection.clientHeight * (storyMobile() ? 0.44 : 0.94) / storyCoverScale(),
      duration: 2.4, ease: 'none',
    }, 'expand')
    .to('.clinic-story__picture img', { scale: 1.04, duration: 1.6, ease: 'none' }, 'expand+=0.8')
    .to('.clinic-story__title, .clinic-story__description', {
      autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.7,
    }, 'expand+=1.5')
    .to({}, { duration: 0.4 })
  gsap.utils.toArray('.faq__row').forEach((row) => {
    const title = row.querySelectorAll('.faq__reveal-text')
    const answer = row.querySelector('.faq__answer')
    gsap.set(title, { yPercent: 110 })
    gsap.set(answer, { y: 12, opacity: 0 })
    gsap.set(row, { '--rule-progress': 0 })
    gsap.timeline({ scrollTrigger: {
      trigger: row, start: 'top 85%', once: true,
    } })
      .to(row, { '--rule-progress': 1, duration: 1.2, ease: 'power2.inOut' }, 0)
      .to(title, { yPercent: 0, duration: 1.05, stagger: 0.14, ease: 'power3.out' }, 0.12)
      .to(answer, { y: 0, opacity: 1, duration: 0.85, ease: 'power2.out' }, 0.4)
  })
  gsap.set('.closing__char', { yPercent: 100, opacity: 0 })
  gsap.to('.closing__char', {
    yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.045, ease: 'power2.out',
    scrollTrigger: { trigger: '.closing', start: 'top 90%', end: 'top 45%', scrub: 0.7, invalidateOnRefresh: true },
  })
  gsap.from('.closing > p', {
    y: 18, opacity: 0, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '.closing', start: 'top 60%', once: true },
  })
  // Calcular de cima para baixo inclui o espaço criado pelo pin dos cartões.
  ScrollTrigger.sort()
  ScrollTrigger.refresh()

})
if (import.meta.hot) import.meta.hot.dispose(() => clinicMotion.revert())


clinicMotion.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
  const section = document.querySelector('.doctor')
  const tilt = document.querySelector('.doctor__tilt')
  const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.8, ease: 'power3.out' })
  const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.8, ease: 'power3.out' })
  const x = gsap.quickTo(tilt, 'x', { duration: 0.8, ease: 'power3.out' })
  function move(event) {
    const box = section.getBoundingClientRect()
    const nx = (event.clientX - box.left) / box.width - 0.5
    const ny = (event.clientY - box.top) / box.height - 0.5
    rx(-ny * 0.8); ry(nx * 1.6); x(nx * 6)
  }
  function reset() { rx(0); ry(0); x(0) }
  section.addEventListener('pointermove', move)
  section.addEventListener('pointerleave', reset)
  return () => {
    section.removeEventListener('pointermove', move)
    section.removeEventListener('pointerleave', reset)
  }
})
