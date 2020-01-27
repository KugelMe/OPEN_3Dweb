import {
  AmbientLight,
  Box3,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Sphere,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function view(model: string) {
  const { innerWidth: width, innerHeight: height } = window;

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(2, 3, 4);

  const light = new DirectionalLight(0xffffff, 1);
  light.position.set(1, 2, 3);
  scene.add(light);
  scene.add(new AmbientLight(0x4444444));

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const loader = new GLTFLoader();
  loader.load(model, gltf => {
    const bounds = new Box3()
      .setFromObject(gltf.scene)
      .getBoundingSphere(new Sphere());
    controls.target.copy(bounds.center);
    camera.position.multiplyScalar(
      (4 * bounds.radius) / bounds.center.sub(camera.position).length()
    );
    scene.add(...gltf.scenes);
    render();
  });

  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }
}
