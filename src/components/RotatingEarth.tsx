import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const RotatingEarth: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 340;
    let height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const radius = 1;
    const loader = new THREE.TextureLoader();

    // Group for axial tilt (Earth is tilted 23.4 degrees)
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (23.4 * Math.PI) / 180;
    scene.add(earthGroup);

    // 1. High-resolution realistic Earth surface
    const earthGeometry = new THREE.SphereGeometry(radius, 64, 64);
    const earthTexture = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
      () => renderer.render(scene, camera)
    );
    const specularTexture = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'
    );
    const normalTexture = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'
    );

    const earthMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      map: earthTexture,
      specularMap: specularTexture,
      specular: new THREE.Color(0x38bdf8),
      shininess: 18,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.85, 0.85)
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    // 2. Realistic Drifting Cloud Layer
    const cloudsTexture = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
    );
    const cloudsGeometry = new THREE.SphereGeometry(radius * 1.012, 64, 64);
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    earthGroup.add(cloudsMesh);

    // 3. Subtle Realistic Atmospheric Glow (Rayleigh scattering rim)
    const atmosphereGeo = new THREE.SphereGeometry(radius * 1.035, 64, 64);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthGroup.add(atmosphere);

    // 4. Realistic Lighting: Sun + Ambient + Subtle Rim Light
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const softAmbient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(softAmbient);

    const rimLight = new THREE.DirectionalLight(0xec4899, 0.45);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // Adjust camera to fit the enlarged Earth comfortably on all devices
    const updateDimensions = (w: number, h: number) => {
      if (w === 0 || h === 0) return;
      const aspect = w / h;
      camera.aspect = aspect;

      // Safe distance: ratio 0.84 makes the Earth boldly bigger on the right side while leaving room for orbit labels
      const minDimensionRatio = Math.min(1, aspect);
      const safeZ = (radius * 2) / (2 * Math.tan(THREE.MathUtils.degToRad(45 / 2)) * minDimensionRatio * 0.84);
      camera.position.z = Math.max(2.8, safeZ);
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    updateDimensions(width, height);

    // ResizeObserver for instant adaptation
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          updateDimensions(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.002;
      cloudsMesh.rotation.y += 0.0026; // Clouds drift slightly faster than the ground
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      earthGeometry.dispose();
      cloudsGeometry.dispose();
      atmosphereGeo.dispose();
      earthMaterial.dispose();
      cloudsMaterial.dispose();
      atmosphereMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full flex items-center justify-center overflow-hidden select-none pointer-events-none" />;
};

export default RotatingEarth;
