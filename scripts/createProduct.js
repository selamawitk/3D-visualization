import * as THREE from 'three';

export function createProduct() {
  const product = new THREE.Group();

  // Colors
  const legColor = new THREE.Color(0x1e1e1e); // Matte black
  const tabletopColor = new THREE.Color(0x8b6a4f); // Brown wood tone

  // Tabletop geometry and material
  const tabletopGeometry = new THREE.BoxGeometry(3, 0.15, 2);
  const tabletopMaterial = new THREE.MeshPhysicalMaterial({
    color: tabletopColor,
    metalness: 0.2,
    roughness: 0.7,
    clearcoat: 0.2,
    clearcoatRoughness: 0.3,
    emissive: new THREE.Color(0x000000), // set initial emissive to enable animation
  });
  const tabletop = new THREE.Mesh(tabletopGeometry, tabletopMaterial);
  tabletop.castShadow = true;
  tabletop.receiveShadow = true;
  tabletop.name = "Top";
  tabletop.position.y = 1.5;
  product.add(tabletop);

  // Table legs geometry and material
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32);
  const legMaterial = new THREE.MeshPhysicalMaterial({
    color: legColor,
    metalness: 0.9,
    roughness: 0.4,
    clearcoat: 0.1,
  });

  // Leg positions
  const legPositions = [
    [-1.3, 0.75, -0.85],
    [1.3, 0.75, -0.85],
    [-1.3, 0.75, 0.85],
    [1.3, 0.75, 0.85],
  ];

  legPositions.forEach((pos, idx) => {
    const leg = new THREE.Mesh(legGeometry, legMaterial.clone());
    leg.position.set(...pos);
    leg.castShadow = true;
    leg.receiveShadow = true;
    leg.name = `Leg ${idx + 1}`;
    product.add(leg);
  });

  // Add pulsing glow metadata to tabletop
  tabletop.userData.pulse = {
    emissiveColor: new THREE.Color(0x4b3621), // Dark brown emissive glow
    emissiveIntensity: 0,
    pulseSpeed: 2, // Pulses per second
  };

  return product;
}

export function animateProduct(product, time) {
  // Floating animation
  const floatHeight = 0.05;
  product.position.y = floatHeight * Math.sin(time * 0.5); // moderate float speed

  // Emissive pulse animation for tabletop
  const tabletop = product.children.find(child => child.name === "Top");
  if (tabletop && tabletop.material.emissive) {
    const pulse = tabletop.userData.pulse;
    const intensity = 0.3 + 0.2 * Math.sin(time * pulse.pulseSpeed);
    tabletop.material.emissive = pulse.emissiveColor.clone().multiplyScalar(intensity);
  }
}
