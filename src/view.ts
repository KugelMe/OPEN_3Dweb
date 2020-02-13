import {
  AmbientLight,
  Box3,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Sphere,
  Vector3,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function view(model: string) {
  const { innerWidth: width, innerHeight: height } = window;

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(2, 3, 4);

  const light = new DirectionalLight(0xffffff, 1);
  scene.add(light);
  scene.add(new AmbientLight(0x999999));

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const loader = new GLTFLoader();
  loader.load(model, gltf => {
    const bounds = new Box3()
      .setFromObject(gltf.scene)
      .getBoundingSphere(new Sphere());
    const { center, radius } = bounds;
    controls.target.copy(center);
    camera.position.copy(
      center.add(new Vector3(2, 3, 4).normalize().multiplyScalar(3 * radius))
    );
    camera.near = 0.01 * radius;
    camera.far = 10 * radius;
    camera.updateProjectionMatrix();
    scene.add(...gltf.scenes);
    render();
  });

  function render() {
    requestAnimationFrame(render);
    controls.update();
    light.position.copy(camera.position);
    renderer.render(scene, camera);
  }
}
