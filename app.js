import brochureTarget from './image-targets/brochure.json'
import './styles.css'

const hud = document.querySelector('#ar-hud')
const instruction = document.querySelector('#instruction')
const hint = document.querySelector('#hint')
const target = document.querySelector('#brochure-target')

const configureImageTargets = () => {
  window.XR8.XrController.configure({
    imageTargetData: [brochureTarget],
  })
}

if (window.XR8) configureImageTargets()
else window.addEventListener('xrloaded', configureImageTargets, {once: true})

target.addEventListener('xrextrasfound', () => {
  hud.classList.add('target-found')
  instruction.textContent = 'Your AR home is ready'
  hint.textContent = 'Drag to rotate · pinch to resize'
})

target.addEventListener('xrextraslost', () => {
  hud.classList.remove('target-found')
  instruction.textContent = 'Find the brochure again'
  hint.textContent = 'Keep the entire house image in view'
})
