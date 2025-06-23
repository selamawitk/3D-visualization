import * as THREE from 'three';

import { initScene } from './initScene.js';
import { createProduct, animateProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { animateCamera } from './cameraAnimation.js';

const { scene, camera, renderer, controls } = initScene();

const product = createProduct();
scene.add(product);

addLighting(scene);
setupInteraction(camera, scene, renderer.domElement);

let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const time = clock.getElapsedTime(); // ✅ seconds, not milliseconds

  animateProduct(product, time);
  animateCamera(camera, controls, time);

  controls.update();
  renderer.render(scene, camera);
}

animate();
