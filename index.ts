import {
  Box3,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Sphere,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modelFile from "./model.glb";

const { innerWidth: width, innerHeight: height } = window;

const scene = new Scene();
const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(2, 3, 4);

const light = new DirectionalLight(0xffffff, 1);
light.position.set(1, 2, 3);
scene.add(light);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
loader.load(modelFile, gltf => {
  const bounds = new Box3()
    .setFromObject(gltf.scene)
    .getBoundingSphere(new Sphere());
  controls.target.copy(bounds.center);
  scene.add(...gltf.scenes);
  render();
});

function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}
