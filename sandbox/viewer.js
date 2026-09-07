import * as THREE from 'three'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x07110c)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set(3, 2, 4)

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

scene.add(new THREE.HemisphereLight(0xffffff, 0x305c32, 1.1))
const directional = new THREE.DirectionalLight(0xffffff, 1.6)
directional.position.set(2, 5, 3)
scene.add(directional)

let mixer = null

new GLTFLoader().load('./space.glb', (gltf) => {
  const model = gltf.scene
  scene.add(model)

  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3()).length()
  const center = box.getCenter(new THREE.Vector3())
  controls.target.copy(center)
  camera.position.copy(center).add(new THREE.Vector3(size * 0.6, size * 0.4, size * 0.6))
  camera.near = size / 100
  camera.far = size * 100
  camera.updateProjectionMatrix()

  if (gltf.animations && gltf.animations.length) {
    mixer = new THREE.AnimationMixer(model)
    gltf.animations.forEach((clip) => mixer.clipAction(clip).play())
  }
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const clock = new THREE.Clock()
renderer.setAnimationLoop(() => {
  const delta = clock.getDelta()
  if (mixer) mixer.update(delta)
  controls.update()
  renderer.render(scene, camera)
})
