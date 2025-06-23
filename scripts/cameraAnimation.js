export function animateCamera(camera, controls, time) {
  if (!controls.userIsInteracting && !controls.autoRotate) {
    const radius = 5;
    const angle = time * 0.5;
    camera.position.x = radius * Math.sin(angle);
    camera.position.z = radius * Math.cos(angle);
    camera.lookAt(0, 1.5, 0);
  }
}
