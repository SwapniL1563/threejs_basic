// create a scene
const scene = new THREE.Scene();

// create an object => geometry + material
const geometry = new THREE.BoxGeometry(2,2,2);

const material = new THREE.MeshBasicMaterial({ color:"green"});

const cube = new THREE.Mesh(geometry,material);

scene.add(cube); // add to scene

//  add camera

const size = {
    width: window.innerWidth,
    height:window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75,size.width/size.height);
scene.add(camera);

camera.position.z = 3;
camera.position.x = -2;

// renderer - to render scene
const target = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({
    canvas:target
});
renderer.setSize(size.width,size.height);
renderer.render(scene,camera)
