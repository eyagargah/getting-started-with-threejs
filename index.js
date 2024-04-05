import * as THREE from "three";
import { OrbitControls } from "jsm/Addons.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const controls = new OrbitControls(camera , renderer.domElement);

camera.position.z = 2;

const scene = new THREE.Scene();
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading : true
});
const mesh = new THREE.Mesh(geo, mat);

const wireMat = new THREE.MeshBasicMaterial({
    color:0xffffff,
    wireframe:true
})

const wireMesh = new THREE.Mesh(geo,wireMat)
wireMesh.scale.setScalar(1.001)
mesh.add(wireMesh)
scene.add(mesh);

var light = new THREE.HemisphereLight(0x0099ff, 0xaa5500);

scene.add(light);

function animate(t=0) {
  requestAnimationFrame(animate);
  mesh.rotation.y = t*0.001
  renderer.render(scene, camera);
}
animate();
