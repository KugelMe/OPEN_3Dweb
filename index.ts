import {
  Box3,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Sphere,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import modelFile from "./model.obj";

const { innerWidth: width, innerHeight: height } = window;

const scene = new Scene();
const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(2, 3, 4);

const light = new DirectionalLight(0xffffff, 0.5);
light.position.set(1, 2, 3);
scene.add(light);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new OBJLoader();
loader.load(modelFile, model => {
  const bounds = new Box3()
    .setFromObject(model)
    .getBoundingSphere(new Sphere());
  model.scale.setScalar(1 / bounds.radius);
  model.position.copy(
    bounds.center
      .clone()
      .negate()
      .multiplyScalar(1 / bounds.radius)
  );
  scene.add(model);
});

render();

function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}
