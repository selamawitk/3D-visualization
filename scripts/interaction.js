import * as THREE from 'three';

export function setupInteraction(camera, scene, rendererDomElement) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const infoPanel = document.getElementById('info-panel');
  const partNameSpan = document.getElementById('part-name');

  const originalColors = new Map();
  let lastHovered = null;

  function lightenColor(color, factor = 0.3) {
    return color.clone().lerp(new THREE.Color(0xffffff), factor);
  }

  function onMouseMove(event) {
    mouse.x = (event.clientX / rendererDomElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / rendererDomElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const hoveredObject = intersects[0].object;

      if (lastHovered && lastHovered !== hoveredObject) {
        const original = originalColors.get(lastHovered);
        if (original) lastHovered.material.color.copy(original);
      }

      if (!originalColors.has(hoveredObject)) {
        originalColors.set(hoveredObject, hoveredObject.material.color.clone());
      }

      hoveredObject.material.color.copy(
        lightenColor(originalColors.get(hoveredObject), 0.4)
      );

      const name = hoveredObject.name || 'Unknown';
      partNameSpan.textContent = name;
      infoPanel.classList.remove('hidden');

      lastHovered = hoveredObject;
    } else {
      if (lastHovered && originalColors.has(lastHovered)) {
        lastHovered.material.color.copy(originalColors.get(lastHovered));
      }
      lastHovered = null;
      infoPanel.classList.add('hidden');
      partNameSpan.textContent = '';
    }
  }

  window.addEventListener('mousemove', onMouseMove);
}
