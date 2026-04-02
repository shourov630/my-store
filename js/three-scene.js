/* ============================================
   THREE.JS 3D SCENE — Hero Background
   ============================================ */

import * as THREE from 'three';

export function initThreeScene() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  // Detect mobile for performance
  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (error) {
    console.warn("WebGL not supported, falling back to basic background:", error);
    document.body.classList.add('no-webgl');
    return null;
  }
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
  renderer.setClearColor(0x000000, 0);

  // Particle system
  const particleCount = isMobile ? (isLowEnd ? 400 : 800) : 2000;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 80;
    positions[i3 + 1] = (Math.random() - 0.5) * 80;
    positions[i3 + 2] = (Math.random() - 0.5) * 40;

    velocities[i3] = (Math.random() - 0.5) * 0.02;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

    sizes[i] = Math.random() * 2 + 0.5;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Custom shader material for particles
  const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(0x00f0ff) },
      uColor2: { value: new THREE.Color(0x7c3aed) },
      uMouse: { value: new THREE.Vector2(0, 0) }
    },
    vertexShader: `
      attribute float size;
      uniform float uTime;
      uniform vec2 uMouse;
      varying float vAlpha;
      varying float vColorMix;

      void main() {
        vec3 pos = position;

        // Gentle floating
        pos.x += sin(uTime * 0.3 + position.y * 0.1) * 0.5;
        pos.y += cos(uTime * 0.2 + position.x * 0.1) * 0.5;

        // Mouse influence
        float mouseInfluence = 1.0 - smoothstep(0.0, 15.0, length(pos.xy - uMouse * 20.0));
        pos.xy += normalize(pos.xy - uMouse * 20.0 + 0.001) * mouseInfluence * 2.0;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (200.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;

        vAlpha = 0.3 + 0.7 * (1.0 - smoothstep(0.0, 40.0, length(pos)));
        vColorMix = sin(uTime * 0.5 + position.x * 0.1) * 0.5 + 0.5;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying float vAlpha;
      varying float vColorMix;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;

        float glow = 1.0 - smoothstep(0.0, 0.5, dist);
        glow = pow(glow, 1.5);

        vec3 color = mix(uColor1, uColor2, vColorMix);
        gl_FragColor = vec4(color, glow * vAlpha * 0.6);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // Floating geometric shapes
  const shapes = [];
  if (!isLowEnd) {
    const shapeConfigs = [
      { geo: new THREE.OctahedronGeometry(1.5, 0), pos: [-15, 8, -10], speed: 0.003 },
      { geo: new THREE.TorusGeometry(1.2, 0.4, 8, 16), pos: [18, -6, -8], speed: 0.004 },
      { geo: new THREE.IcosahedronGeometry(1, 0), pos: [-12, -10, -12], speed: 0.002 },
      { geo: new THREE.TetrahedronGeometry(1.3, 0), pos: [14, 12, -15], speed: 0.005 },
    ];

    if (!isMobile) {
      shapeConfigs.push(
        { geo: new THREE.BoxGeometry(1.5, 1.5, 1.5), pos: [20, 5, -6], speed: 0.003 },
        { geo: new THREE.TorusKnotGeometry(0.8, 0.3, 32, 8), pos: [-20, -4, -10], speed: 0.002 }
      );
    }

    shapeConfigs.forEach(config => {
      const material = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.12
      });
      const mesh = new THREE.Mesh(config.geo, material);
      mesh.position.set(...config.pos);
      mesh.userData.speed = config.speed;
      mesh.userData.initialY = config.pos[1];
      scene.add(mesh);
      shapes.push(mesh);
    });
  }

  // Mouse tracking
  const mouse = new THREE.Vector2(0, 0);
  const targetMouse = new THREE.Vector2(0, 0);

  function onMouseMove(event) {
    targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  if (!isMobile) {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  // Animation loop
  let time = 0;
  let animationId;
  let isVisible = true;

  // Pause when not visible
  const observer = new IntersectionObserver(
    (entries) => {
      isVisible = entries[0].isIntersecting;
    },
    { threshold: 0 }
  );
  observer.observe(canvas);

  function animate() {
    animationId = requestAnimationFrame(animate);

    if (!isVisible) return;

    time += 0.01;

    // Smooth mouse interpolation
    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    // Update particle uniforms
    particleMaterial.uniforms.uTime.value = time;
    particleMaterial.uniforms.uMouse.value = mouse;

    // Rotate particles slowly
    particles.rotation.y = time * 0.02;
    particles.rotation.x = time * 0.01;

    // Animate shapes
    shapes.forEach((shape, i) => {
      shape.rotation.x += shape.userData.speed;
      shape.rotation.y += shape.userData.speed * 0.7;
      shape.position.y = shape.userData.initialY + Math.sin(time + i) * 1.5;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  let resizeTimeout;
  function onResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 150);
  }

  window.addEventListener('resize', onResize, { passive: true });

  // Cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    observer.disconnect();
    renderer.dispose();
    particleGeometry.dispose();
    particleMaterial.dispose();
    shapes.forEach(s => {
      s.geometry.dispose();
      s.material.dispose();
    });
  };
}
