import brochureTarget from './image-targets/brochure.json'
import './styles.css'

const hud = document.querySelector('#ar-hud')
const loadingScreen = document.querySelector('#loading-screen')
const instruction = document.querySelector('#instruction')
const hint = document.querySelector('#hint')
const target = document.querySelector('#brochure-target')
const house = document.querySelector('#house-content')
const imageTarget = {
  ...brochureTarget,
  // The AR experience lives at /ar/, while targets are deployed at the site root.
  imagePath: new URL('../image-targets/brochure_luminance.png', window.location.href).href,
}

// Increase z to lift the house further above the brochure image.
const HOUSE_LIFT = 0.12
house.setAttribute('position', `0 0 ${HOUSE_LIFT}`)

const hideLoadingScreen = () => loadingScreen.classList.add('is-ready')

const configureImageTargets = () => {
  window.XR8.XrController.configure({
    imageTargetData: [imageTarget],
  })
}

if (window.XR8) configureImageTargets()
else window.addEventListener('xrloaded', configureImageTargets, {once: true})

if (window.XR8) hideLoadingScreen()
else window.addEventListener('xrloaded', hideLoadingScreen, {once: true})

target.addEventListener('xrextrasfound', () => {
  hideLoadingScreen()
  hud.classList.add('target-found')
  instruction.textContent = 'Your AR home is ready'
  hint.textContent = 'Pinch to resize'
})

target.addEventListener('xrextraslost', () => {
  hud.classList.remove('target-found')
  instruction.textContent = 'Find the brochure again'
  hint.textContent = 'Keep the entire house image in view'
})
