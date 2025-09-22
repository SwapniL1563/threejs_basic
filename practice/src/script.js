import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

const canvas = document.querySelector("canvas.webgl")

// creating scene
const scene = new THREE.Scene();


// creating an object
const geometry = new THREE.BoxGeometry(1,1,1,3,3,3); 
// const material = new THREE.MeshBasicMaterial({ color: "#fffafa" , wireframe:true})
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);

// camera
const sizes = {
  width:window.innerWidth,
  height:window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
camera.position.z = 3;
camera.lookAt(cube.position);
scene.add(camera);

// stars effect using bufferGeometry
const starsGeometry = new THREE.BufferGeometry();
const starCount = 500;

const positions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 120;
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 4));

const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);


// handling resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width,sizes.height);
})

// handling fullscreen 
window.addEventListener("dblclick" , () => {
  if(!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
})

// orbit control
const control = new OrbitControls(camera,canvas);

// add damping
control.enableDamping = true;

// renderer - display the scene
const renderer = new THREE.WebGLRenderer({
  canvas:canvas
})
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

// animate the cube 
// const clock = new THREE.Clock();

const tick = () => {
  // console.log("hii");
  control.update()
  renderer.render(scene,camera);
  window.requestAnimationFrame(tick);
}

tick();



