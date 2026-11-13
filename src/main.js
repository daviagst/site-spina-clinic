import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { gsap } from 'gsap'

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

        <nav class="nav glass" aria-label="Menu principal">
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

    <dialog class="section-dialog">
      <h2></h2>
      <p>Esta seção será apresentada na próxima etapa do protótipo.</p>
      <button class="dialog-close" type="button">Fechar</button>
    </dialog>
  </main>
`

// Navegação provisória até construirmos as próximas seções.
const dialog = document.querySelector('.section-dialog')

document.querySelectorAll('[data-section]').forEach((button) => {
  button.addEventListener('click', () => {
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
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

    scene.add(new THREE.HemisphereLight('#fff5e5', '#655445', 0.65))

    const sunlight = new THREE.DirectionalLight('#ffe4be', 3)
    sunlight.position.set(-3, 4.5, 3)
    sunlight.target.position.set(0, 1, -1)
    sunlight.castShadow = true
    sunlight.shadow.mapSize.set(2048, 2048)
    Object.assign(sunlight.shadow.camera, {
      left: -5, right: 5, top: 5, bottom: -5, near: 0.1, far: 20,
    })
    sunlight.shadow.normalBias = 0.025
    scene.add(sunlight, sunlight.target)

    const wallLight = new THREE.SpotLight('#ffe3b5', 18, 8, Math.PI / 3, 0.8, 2)
    wallLight.position.set(0.4, 2.9, 0.5)
    wallLight.target.position.set(0.35, 2.1, -2.25)
    scene.add(wallLight, wallLight.target)

    resize()

    const loader = new GLTFLoader()
    const gltf = await loader.loadAsync(
      '/assets/3D/spina-clinic-recepcao.glb',
    )

    if (disposed) {
      disposeModel(gltf.scene)
      return
    }

    model = gltf.scene

    // A referência mostra a recepção aberta, sem cobertura.
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
      if (/teto/i.test(object.name)) {
        object.visible = false
      }
    })

    scene.add(model)

    status.hidden = true
    container.classList.add('is-ready')
    resize()

    if (reducedMotion.matches) {
      cameraReady = true
      render()
      return
    }

    camera.position.copy(cameraSettings.position)
    camera.position.z += 0.25
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
