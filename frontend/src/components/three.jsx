import React, { useRef, useEffect } from 'react';

// Используем только glb (GLTF) модели

const Three = ({ modelUrl, width = 600, height = 400 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let THREE;
    let renderer, scene, camera, controls, model;
    let animationId;

    const init = async () => {
      // Динамически импортируем three.js и OrbitControls
      THREE = await import('three');
      const { OrbitControls } = await import(
        'three/examples/jsm/controls/OrbitControls'
      );
      // Сцена
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      // Камера
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(0, 2, 2.5);

      // Рендерер
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true; // ✅ включаем тени
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // более мягкие тени
      mountRef.current.appendChild(renderer.domElement);

      // Свет
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1, 5);
      directionalLight.position.set(5, 10, 5);
      directionalLight.castShadow = true; // ✅ свет даёт тени
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 1;
      directionalLight.shadow.camera.far = 50;
      scene.add(directionalLight);

      // ✅ Текстуры
      const textureLoader = new THREE.TextureLoader();
      const floorTexture = textureLoader.load('/parket.jpg');
      floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(2, 2);

      const wallTexture = textureLoader.load('/wall.jpg');

      // ✅ Пол
      const floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 1, 10),
        new THREE.MeshStandardMaterial({ map: floorTexture })
      );
      floor.position.y = -0.5;
      floor.receiveShadow = true; // ✅ принимает тени

      // ✅ Стены
      const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });

      const wallRight = new THREE.Mesh(
        new THREE.BoxGeometry(1, 10, 10),
        wallMaterial
      );
      wallRight.position.set(5, 0, 0);
      wallRight.receiveShadow = true;

      const wallLeft = new THREE.Mesh(
        new THREE.BoxGeometry(1, 10, 10),
        wallMaterial
      );
      wallLeft.position.set(-5, 0, 0);
      wallLeft.receiveShadow = true;

      const wallBack = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 1),
        wallMaterial
      );
      wallBack.position.set(0, 0, -5);
      wallBack.receiveShadow = true;

      const wallFront = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 1),
        wallMaterial
      );
      wallFront.position.set(0, 0, 5);
      wallFront.receiveShadow = true;

      // ✅ Добавляем всё
      scene.add(floor, wallRight, wallLeft, wallBack, wallFront);

      // === Плинтус ===
      const plinthMaterial = new THREE.MeshStandardMaterial({
        color: 0xdddddd,
      }); // светло-серый

      // плинтус у правой стены
      const plinthRight = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.2, 10), // толщина Y = 0.2
        plinthMaterial
      );
      plinthRight.position.set(4.9, 0.05, 0); // чуть ниже пола
      plinthRight.castShadow = true;
      plinthRight.receiveShadow = true;

      // плинтус у левой стены
      const plinthLeft = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.2, 10),
        plinthMaterial
      );
      plinthLeft.position.set(-4.9, 0.05, 0);
      plinthLeft.castShadow = true;
      plinthLeft.receiveShadow = true;

      // плинтус у задней стены
      const plinthBack = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.2, 1),
        plinthMaterial
      );
      plinthBack.position.set(0, 0.05, -4.9);
      plinthBack.castShadow = true;
      plinthBack.receiveShadow = true;

      // плинтус у передней стены
      const plinthFront = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.2, 1),
        plinthMaterial
      );
      plinthFront.position.set(0, 0.05, 4.9);
      plinthFront.castShadow = true;
      plinthFront.receiveShadow = true;

      scene.add(plinthRight, plinthLeft, plinthBack, plinthFront);

      // Контролы
      controls = new OrbitControls(camera, renderer.domElement);
      controls.rollSpeed = 0.01;
      controls.enablePan = false;

      controls.autoRotate = true;
      controls.autoRotateSpeed = 1;
      controls.minDistance = 0.1;
      controls.maxDistance = 5;
      controls.minPolarAngle = Math.PI / 3;
      controls.maxPolarAngle = Math.PI / 3;
      controls.target.set(0, 1, 0);

      // Загрузка только glb модели
      if (modelUrl) {
        const { GLTFLoader } = await import(
          'three/examples/jsm/loaders/GLTFLoader'
        );
        const loader = new GLTFLoader();
        loader.load(
          modelUrl,
          (gltf) => {
            model = gltf.scene;
            scene.add(model);
          },
          undefined,
          (error) => {
            console.error('Ошибка загрузки GLB модели:', error);
          }
        );
      } else {
        // Если нет модели, добавим куб для примера
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        model = new THREE.Mesh(geometry, material);
        scene.add(model);
      }
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader');
      const wardrobeLoader = new GLTFLoader();
      wardrobeLoader.load(
        '../../3dmodels/wardrobe.glb', // путь к шкафу
        (gltf) => {
          const wardrobe = gltf.scene;
          wardrobe.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          // 📌 Ставим шкаф в угол (например, левый-задний угол комнаты)
          wardrobe.position.set(-3.5, 0, -4);
          wardrobe.scale.set(1, 1, 1); // можно подогнать масштаб под комнату

          scene.add(wardrobe);
        },
        undefined,
        (error) => {
          console.error('Ошибка загрузки шкафа wardrobe.glb:', error);
        }
      );
      // Анимация
      const animate = () => {
        animationId = requestAnimationFrame(animate);

        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    };

    init();

    return () => {
      // Очистка
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      scene = null;
      camera = null;
      controls = null;
      model = null;
    };
  }, [modelUrl, width, height]);

  return (
    <div
      ref={mountRef}
      style={{
        width: width + 'px',
        height: height + 'px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#f0f0f0',
      }}
    />
  );
};

export default Three;
