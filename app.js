import brochureTarget from './image-targets/brochure.json'
import './styles.css'

const hud = document.querySelector('#ar-hud')
const loadingScreen = document.querySelector('#loading-screen')
const instruction = document.querySelector('#instruction')
const hint = document.querySelector('#hint')
const scene = document.querySelector('a-scene')
const target = document.querySelector('#brochure-target')
const arHome = document.querySelector('#ar-home')
const house = document.querySelector('#house-content')
const imageTarget = {
  ...brochureTarget,
  // The AR experience lives at /ar/, while targets are deployed at the site root.
  imagePath: new URL('../image-targets/brochure_luminance.png', window.location.href).href,
}

// Increase z to lift the house further above the brochure image.
const HOUSE_LIFT = 0.26
const HOUSE_START_LIFT = -0.18
const HOUSE_ENTRANCE_DURATION = 850
let modelIsLoaded = false
let targetIsFound = false
let entranceHasPlayed = false

const resetHousePosition = () => {
  house.removeAttribute('animation__entrance')
  house.setAttribute('position', `0 0 ${HOUSE_START_LIFT}`)
}

const playHouseEntrance = () => {
  if (!modelIsLoaded || !targetIsFound || entranceHasPlayed) return

  entranceHasPlayed = true
  resetHousePosition()
  requestAnimationFrame(() => {
    house.setAttribute('animation__entrance', {
      property: 'position',
      from: `0 0 ${HOUSE_START_LIFT}`,
      to: `0 0 ${HOUSE_LIFT}`,
      dur: HOUSE_ENTRANCE_DURATION,
      easing: 'easeOutBack',
      loop: false,
    })
  })
}

resetHousePosition()
house.addEventListener('model-loaded', () => {
  modelIsLoaded = true
  playHouseEntrance()
})

const hideLoadingScreen = () => loadingScreen.classList.add('is-ready')

const configureImageTargets = () => {
  window.XR8.XrController.configure({
    imageTargetData: [imageTarget],
  })
}

if (window.XR8) configureImageTargets()
else window.addEventListener('xrloaded', configureImageTargets, {once: true})

// `realityready` fires when the camera texture is available, not merely when the SDK script loads.
scene.addEventListener('realityready', hideLoadingScreen, {once: true})

target.addEventListener('xrextrasfound', () => {
  hideLoadingScreen()
  targetIsFound = true
  arHome.setAttribute('visible', true)
  playHouseEntrance()
  hud.classList.add('target-found')
  instruction.textContent = 'Your AR home is ready'
  hint.textContent = 'Pinch to resize'
})

target.addEventListener('xrextraslost', () => {
  arHome.setAttribute('visible', false)
  targetIsFound = false
  entranceHasPlayed = false
  resetHousePosition()
  hud.classList.remove('target-found')
  instruction.textContent = 'Find the brochure again'
  hint.textContent = 'Keep the entire house image in view'
})
