import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui"

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Add debug-ui
const gui = new  GUI({
  width:500,
title:"Debug UI",
closeFolders:true
});
// gui.close();
// toggling gui with key
window.addEventListener("keydown" , (e) => {
  if(e.key == 'h') gui.show(gui._hidden)
})

// gui folders
const scroll = gui.addFolder("Transform");
scroll.show()

const other = gui.addFolder("Other");

// non-properties
const myObj = {
  myVar:77,
}

// add to gui
scroll.add(myObj,"myVar",-100,100,1).name("custom property");

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: "#ff0000" , wireframe:true});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// add to gui 
scroll.add(mesh.position,"y",-2,2,0.05).name("position-y");

// checkbox
other.add(material,"wireframe");

// add color
myObj.color = "#ff0000";
other.addColor(myObj,"color").onChange(() => {
  material.color.set(myObj.color);
});

// function / button
myObj.spin = () => {
  gsap.to(mesh.rotation,{ duration:1, y: mesh.rotation.y + Math.PI * 2});
}

other.add(myObj,"spin");

// tweaking the geometry
myObj.segment = 2;
scroll.add(myObj,"segment").onChange(() => {
  mesh.geometry = new THREE.BoxGeometry(1,1,1,myObj.segment,myObj.segment,myObj.segment)
}).min(1).max(20).name("subdivisons / segments")

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
