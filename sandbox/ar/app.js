import spaceTarget from '../image-targets/space.json'
import '../../styles.css'

// 8th Wall's A-Frame build doesn't include the animation-mixer component, so play glTF clips manually.
AFRAME.registerComponent('gltf-anim-player', {
  init() {
    this.mixer = null
    this.el.addEventListener('model-loaded', (event) => {
      const mesh = event.detail.model
      if (!mesh.animations || !mesh.animations.length) return
      this.mixer = new THREE.AnimationMixer(mesh)
      mesh.animations.forEach((clip) => this.mixer.clipAction(clip).play())
    })
  },
  tick(time, delta) {
    if (this.mixer) this.mixer.update(delta / 1000)
  },
})

const hud = document.querySelector('#ar-hud')
const loadingScreen = document.querySelector('#loading-screen')
const instruction = document.querySelector('#instruction')
const hint = document.querySelector('#hint')
const scene = document.querySelector('a-scene')
const target = document.querySelector('#space-target')
const arModel = document.querySelector('#ar-model')

const imageTarget = {
  ...spaceTarget,
  // The AR test lives at /sandbox/ar/, while targets are deployed at /sandbox/.
  imagePath: new URL('../image-targets/space_luminance.jpg', window.location.href).href,
}

const hideLoadingScreen = () => loadingScreen.classList.add('is-ready')

const configureImageTargets = () => {
  window.XR8.XrController.configure({
    imageTargetData: [imageTarget],
  })
}

if (window.XR8) configureImageTargets()
else window.addEventListener('xrloaded', configureImageTargets, {once: true})

scene.addEventListener('realityready', hideLoadingScreen, {once: true})

target.addEventListener('xrextrasfound', () => {
  hideLoadingScreen()
  arModel.setAttribute('visible', true)
  hud.classList.add('target-found')
  instruction.textContent = 'Model found'
  hint.textContent = 'Pinch to resize'
})

target.addEventListener('xrextraslost', () => {
  arModel.setAttribute('visible', false)
  hud.classList.remove('target-found')
  instruction.textContent = 'Find the reference image again'
  hint.textContent = 'Keep the entire image in view'
})
