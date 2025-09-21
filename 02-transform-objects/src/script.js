import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// grouping 
const group = new THREE.Group();
scene.add(group);

group.position.y = 1; // adding position to group

/**
 * Objects
 */


const box1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color:"red"})
)
group.add(box1);

const box2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color:"green"})
)
group.add(box2)
box2.position.x = -2;

const box3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color:"blue"})
)
group.add(box3)
box1.position.x = 2;

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 1;
// mesh.position.y= -2;
// mesh.position.z = -4;
// mesh.scale.set(2,0.25,0.5)
// mesh.position.set(1,-1,3);

// mesh.rotation.reorder("XZY")
// mesh.rotation.y = 1;
// mesh.rotation.z = -0.5;
// mesh.rotation.x = Math.PI;

// mesh.position.normalize(); // set the length as 1

// console.log(mesh.position.length()) // length from scene center to obj
// scene.add(mesh);



/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0,0,3);
// camera.lookAt(-0.5,0,1)
scene.add(camera);

const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// console.log(mesh.position.distanceTo(camera.position)) // distance between two obj or camera and scene

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
