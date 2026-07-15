import './landing.css'

const modal = document.querySelector('#brochure-modal')
const openButton = document.querySelector('#open-brochure')
const closeButton = document.querySelector('#close-brochure')

const closeBrochure = () => { modal.hidden = true }

openButton.addEventListener('click', () => { modal.hidden = false })
closeButton.addEventListener('click', closeBrochure)
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeBrochure()
})
