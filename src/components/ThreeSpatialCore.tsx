import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CameraPreset, FOCUS_DOMAINS } from '../data/portfolioData';

interface ThreeSpatialCoreProps {
  selectedDomainId: string;
  onSelectDomain: (domainId: string) => void;
  explodedTarget: number;
  cameraPreset: CameraPreset;
  pulseBoost: boolean;
}

// Pre-allocated module-scope math helpers (Zero GC in render loop)
const _mouse = new THREE.Vector2();
const _camTargetPos = new THREE.Vector3();
const _dummyObj = new THREE.Object3D();
const _tempColor = new THREE.Color();

function detectSoftwareGl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function createContactShadowTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      8,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, 'rgba(0, 212, 255, 0.28)');
    grad.addColorStop(0.38, 'rgba(37, 99, 235, 0.14)');
    grad.addColorStop(0.75, 'rgba(3, 6, 12, 0.45)');
    grad.addColorStop(1, 'rgba(3, 6, 12, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export const ThreeSpatialCore: React.FC<ThreeSpatialCoreProps> = ({
  selectedDomainId,
  onSelectDomain,
  explodedTarget,
  cameraPreset,
  pulseBoost,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglFallback, setWebglFallback] = useState(false);

  // Store mutable props in refs so React UI updates never recreate WebGL context
  const selectedIdRef = useRef(selectedDomainId);
  const onSelectRef = useRef(onSelectDomain);
  const explodedTargetRef = useRef(explodedTarget);
  const pulseBoostRef = useRef(pulseBoost);
  const cameraTransitionActiveRef = useRef(false);
  const presetRef = useRef(cameraPreset);

  useEffect(() => {
    selectedIdRef.current = selectedDomainId;
  }, [selectedDomainId]);

  useEffect(() => {
    onSelectRef.current = onSelectDomain;
  }, [onSelectDomain]);

  useEffect(() => {
    explodedTargetRef.current = explodedTarget;
  }, [explodedTarget]);

  useEffect(() => {
    pulseBoostRef.current = pulseBoost;
  }, [pulseBoost]);

  useEffect(() => {
    presetRef.current = cameraPreset;
    cameraTransitionActiveRef.current = true;
  }, [cameraPreset]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const isSoftwareGl = detectSoftwareGl();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFallback(true);
      return;
    }

    const width = Math.max(container.clientWidth, 300);
    const height = Math.max(container.clientHeight, 360);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2)
    );
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // WebGL Context Loss & Restore Safety
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFallback(true);
    };
    const handleContextRestored = () => {
      setWebglFallback(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener(
      'webglcontextrestored',
      handleContextRestored
    );

    // Scene, Horizon Fog & Studio Environment Reflection (RoomEnvironment)
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03060c, 0.042);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envRT = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    pmremGenerator.dispose();

    // Camera & OrbitControls
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.35, 7.6);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = Math.PI * 0.18;
    controls.maxPolarAngle = Math.PI * 0.78;
    controls.target.set(0, 0.15, 0);

    const cancelPresetTransition = () => {
      cameraTransitionActiveRef.current = false;
    };
    controls.addEventListener('start', cancelPresetTransition);

    // 3-Point Warm/Cool Studio Lighting Rig + Hemisphere Fill
    const hemiLight = new THREE.HemisphereLight(0x60a5fa, 0x050814, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 2.2);
    keyLight.position.set(5, 7, 5);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      const d = 5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 22;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00d4ff, 2.4);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    const accentPoint = new THREE.PointLight(0x2563eb, 4.5, 14, 2);
    accentPoint.position.set(0, 0.2, 0);
    scene.add(accentPoint);

    // =========================================================================
    // COMPOSITE MULTI-PART PROCEDURAL 3D SCULPTURE (8 Distinct Sub-Assemblies)
    // =========================================================================
    const disposables: { dispose: () => void }[] = [envRT];

    const rootAssembly = new THREE.Group();
    rootAssembly.position.set(0, 0.2, 0);
    scene.add(rootAssembly);

    // 1. Inner Crystalline Octahedral Core (Sapphire Electric Finish)
    const coreGeo = new THREE.OctahedronGeometry(0.92, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      emissive: 0x0066ff,
      emissiveIntensity: 0.65,
      metalness: 0.3,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.castShadow = !isSoftwareGl;
    rootAssembly.add(coreMesh);
    disposables.push(coreGeo, coreMat);

    // 2. Inner Core Facet Shells (Separate radially during Exploded View)
    const shellGroup = new THREE.Group();
    rootAssembly.add(shellGroup);
    const shardGeo = new THREE.OctahedronGeometry(1.06, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.92,
      roughness: 0.22,
      flatShading: true,
    });
    disposables.push(shardGeo, shardMat);

    const shellDirs = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, -1, 0),
    ];
    const shellShards: { mesh: THREE.Mesh; dir: THREE.Vector3 }[] = [];
    shellDirs.forEach((dir) => {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      shard.scale.set(0.38, 0.38, 0.38);
      shard.position.copy(dir).multiplyScalar(0.76);
      shellGroup.add(shard);
      shellShards.push({ mesh: shard, dir });
    });

    // 3. Geodesic Precision Wireframe Cage
    const cageGeo = new THREE.IcosahedronGeometry(1.42, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      metalness: 0.8,
      roughness: 0.28,
      wireframe: true,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    rootAssembly.add(cageMesh);
    disposables.push(cageGeo, cageMat);

    // 4. Primary Brushed Gunmetal Gyroscopic Gimbal Ring
    const ring1Geo = new THREE.TorusGeometry(2.05, 0.042, 24, 96);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.94,
      roughness: 0.16,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI * 0.35;
    rootAssembly.add(ring1Mesh);
    disposables.push(ring1Geo, ring1Mat);

    // 5. Orthogonal Electric-Blue Telemetry Gimbal Ring
    const ring2Geo = new THREE.TorusGeometry(2.42, 0.028, 20, 96);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x00a6ff,
      emissiveIntensity: 0.45,
      metalness: 0.65,
      roughness: 0.42,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI * 0.28;
    ring2Mesh.rotation.x = -Math.PI * 0.22;
    rootAssembly.add(ring2Mesh);
    disposables.push(ring2Geo, ring2Mat);

    // 6. Equatorial Calibration Fin Array (12 Machined Blades via InstancedMesh)
    const finCount = 12;
    const finGeo = new THREE.BoxGeometry(0.08, 0.22, 0.34);
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.88,
      roughness: 0.2,
    });
    const finInstanced = new THREE.InstancedMesh(finGeo, finMat, finCount);
    finInstanced.frustumCulled = false;
    rootAssembly.add(finInstanced);
    disposables.push(finGeo, finMat);

    const updateFins = (radiusOffset: number) => {
      const r = 1.68 + radiusOffset;
      for (let i = 0; i < finCount; i++) {
        const theta = (i / finCount) * Math.PI * 2;
        _dummyObj.position.set(Math.cos(theta) * r, 0, Math.sin(theta) * r);
        _dummyObj.rotation.set(0, -theta, 0);
        _dummyObj.scale.set(1, 1, 1);
        _dummyObj.updateMatrix();
        finInstanced.setMatrixAt(i, _dummyObj.matrix);
      }
      finInstanced.instanceMatrix.needsUpdate = true;
    };
    updateFins(0);

    // 7. Interactive Orbital Domain Satellites (5 Composite 3-Part Nodes + Raycast Layer 1)
    const satelliteGroup = new THREE.Group();
    rootAssembly.add(satelliteGroup);

    const satCrystalGeo = new THREE.OctahedronGeometry(0.19, 0);
    const satCollarGeo = new THREE.TorusGeometry(0.28, 0.024, 14, 36);
    const satHitGeo = new THREE.SphereGeometry(0.45, 10, 10);
    const satHitMat = new THREE.MeshBasicMaterial({ visible: false });
    const satCollarMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.2,
    });
    disposables.push(
      satCrystalGeo,
      satCollarGeo,
      satHitGeo,
      satHitMat,
      satCollarMat
    );

    const hitProxies: THREE.Mesh[] = [];
    const satellites: {
      id: string;
      pivot: THREE.Group;
      crystalMat: THREE.MeshStandardMaterial;
      collar: THREE.Mesh;
      baseAngle: number;
      elevation: number;
    }[] = [];

    FOCUS_DOMAINS.forEach((domain) => {
      const pivot = new THREE.Group();
      satelliteGroup.add(pivot);

      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0077ff,
        emissiveIntensity: 0.5,
        metalness: 0.4,
        roughness: 0.15,
      });
      disposables.push(crystalMat);

      const crystal = new THREE.Mesh(satCrystalGeo, crystalMat);
      pivot.add(crystal);

      const collar = new THREE.Mesh(satCollarGeo, satCollarMat);
      collar.rotation.x = Math.PI / 2;
      pivot.add(collar);

      const hitMesh = new THREE.Mesh(satHitGeo, satHitMat);
      hitMesh.layers.set(1);
      hitMesh.userData.domainId = domain.id;
      pivot.add(hitMesh);
      hitProxies.push(hitMesh);

      satellites.push({
        id: domain.id,
        pivot,
        crystalMat,
        collar,
        baseAngle: domain.orbitAngle,
        elevation: domain.orbitElevation,
      });
    });

    // 8. Instanced Spatial Data Field (140 Micro-Prisms in 3D Depth)
    const particleCount = 140;
    const pGeo = new THREE.OctahedronGeometry(0.038, 0);
    const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const particleMesh = new THREE.InstancedMesh(pGeo, pMat, particleCount);
    disposables.push(pGeo, pMat);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.2 + ((i * 17) % 45) * 0.11;
      const theta = i * 2.39996;
      const y = (((i * 29) % 100) / 100 - 0.5) * 5.2;
      const s = 0.75 + ((i * 13) % 40) * 0.012;

      _dummyObj.position.set(
        Math.cos(theta) * radius,
        y,
        Math.sin(theta) * radius
      );
      _dummyObj.rotation.set(theta, i * 0.4, 0);
      _dummyObj.scale.set(s, s, s);
      _dummyObj.updateMatrix();
      particleMesh.setMatrixAt(i, _dummyObj.matrix);

      _tempColor.setHex(i % 3 === 0 ? 0x00d4ff : i % 2 === 0 ? 0x3b82f6 : 0x93c5fd);
      particleMesh.setColorAt(i, _tempColor);
    }
    particleMesh.instanceMatrix.needsUpdate = true;
    if (particleMesh.instanceColor) {
      particleMesh.instanceColor.needsUpdate = true;
    }
    particleMesh.computeBoundingSphere();
    scene.add(particleMesh);

    // Contact Grounding Plane & Calibration Ring (Zero Floating Illusion)
    const contactShadowTex = createContactShadowTexture(
      renderer.capabilities.getMaxAnisotropy()
    );
    disposables.push(contactShadowTex);

    const floorGeo = new THREE.PlaneGeometry(6.8, 6.8);
    const floorMat = new THREE.MeshBasicMaterial({
      map: contactShadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.72,
    });
    const floorPlane = new THREE.Mesh(floorGeo, floorMat);
    floorPlane.rotation.x = -Math.PI / 2;
    floorPlane.position.y = -2.35;
    scene.add(floorPlane);
    disposables.push(floorGeo, floorMat);

    const baseRingGeo = new THREE.RingGeometry(1.85, 1.9, 64);
    const baseRingMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const baseRing = new THREE.Mesh(baseRingGeo, baseRingMat);
    baseRing.rotation.x = -Math.PI / 2;
    baseRing.position.y = -2.33;
    scene.add(baseRing);
    disposables.push(baseRingGeo, baseRingMat);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // =========================================================================
    // THROTTLED RAYCASTER INTERACTION (Dedicated Layer 1)
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    let hoveredDomainId: string | null = null;
    let lastRaycastMs = 0;

    const updatePointerFromEvent = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      _mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      _mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastRaycastMs < 45) return;
      lastRaycastMs = now;

      updatePointerFromEvent(e.clientX, e.clientY);
      raycaster.setFromCamera(_mouse, camera);
      const hits = raycaster.intersectObjects(hitProxies, false);
      if (hits.length > 0) {
        hoveredDomainId = String(hits[0].object.userData.domainId);
        renderer.domElement.style.cursor = 'pointer';
      } else {
        hoveredDomainId = null;
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handleClick = (e: MouseEvent) => {
      updatePointerFromEvent(e.clientX, e.clientY);
      raycaster.setFromCamera(_mouse, camera);
      const hits = raycaster.intersectObjects(hitProxies, false);
      if (hits.length > 0) {
        const domainId = String(hits[0].object.userData.domainId);
        onSelectRef.current(domainId);
      }
    };

    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('click', handleClick);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const nextW = Math.max(entry.contentRect.width, 280);
      const nextH = Math.max(entry.contentRect.height, 320);
      camera.aspect = nextW / nextH;
      camera.updateProjectionMatrix();
      renderer.setSize(nextW, nextH);
    });
    resizeObserver.observe(container);

    // =========================================================================
    // ANIMATION LOOP WITH SOFTWARE-WEBGL FENCE SYNC PACING
    // =========================================================================
    const clock = new THREE.Clock();
    let frameId = 0;
    let isDisposed = false;
    let currentExploded = explodedTargetRef.current;

    function afterDraw(cb: () => void) {
      if (isDisposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (isDisposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (isDisposed) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      const speedMult = prefersReducedMotion
        ? 0
        : pulseBoostRef.current
        ? 2.1
        : 1.0;

      // Smoothly damp Exploded View separation
      const nextExploded = THREE.MathUtils.damp(
        currentExploded,
        explodedTargetRef.current,
        5.5,
        delta
      );
      if (Math.abs(nextExploded - currentExploded) > 0.001) {
        currentExploded = nextExploded;
        updateFins(currentExploded * 0.55);
      }

      // Smoothly damp Camera Preset transitions
      if (cameraTransitionActiveRef.current) {
        if (presetRef.current === CameraPreset.CORE) {
          _camTargetPos.set(0, 0.55, 5.1);
        } else if (presetRef.current === CameraPreset.ORBITAL) {
          _camTargetPos.set(0, 5.8, 3.8);
        } else {
          _camTargetPos.set(0, 1.35, 7.6);
        }
        camera.position.x = THREE.MathUtils.damp(
          camera.position.x,
          _camTargetPos.x,
          4.5,
          delta
        );
        camera.position.y = THREE.MathUtils.damp(
          camera.position.y,
          _camTargetPos.y,
          4.5,
          delta
        );
        camera.position.z = THREE.MathUtils.damp(
          camera.position.z,
          _camTargetPos.z,
          4.5,
          delta
        );
        if (camera.position.distanceToSquared(_camTargetPos) < 0.01) {
          cameraTransitionActiveRef.current = false;
        }
      }

      // Core & Gimbal Kinematics
      coreMesh.rotation.y += delta * 0.42 * speedMult;
      coreMesh.rotation.x += delta * 0.18 * speedMult;
      const coreScale = 1 + currentExploded * 0.08;
      coreMesh.scale.set(coreScale, coreScale, coreScale);
      coreMat.emissiveIntensity = pulseBoostRef.current ? 1.15 : 0.68;

      cageMesh.rotation.y -= delta * 0.25 * speedMult;
      cageMesh.rotation.z += delta * 0.14 * speedMult;
      const cageScale = 1 + currentExploded * 0.28;
      cageMesh.scale.set(cageScale, cageScale, cageScale);

      shellShards.forEach(({ mesh, dir }) => {
        const dist = 0.76 + currentExploded * 0.72;
        mesh.position.set(dir.x * dist, dir.y * dist, dir.z * dist);
        mesh.rotation.y += delta * 0.6 * speedMult;
      });

      ring1Mesh.rotation.z += delta * 0.22 * speedMult;
      const r1Scale = 1 + currentExploded * 0.14;
      ring1Mesh.scale.set(r1Scale, r1Scale, r1Scale);

      ring2Mesh.rotation.z -= delta * 0.32 * speedMult;
      const r2Scale = 1 + currentExploded * 0.22;
      ring2Mesh.scale.set(r2Scale, r2Scale, r2Scale);

      finInstanced.rotation.y += delta * 0.16 * speedMult;
      particleMesh.rotation.y += delta * 0.04 * speedMult;

      // Update Orbital Satellites
      const orbitRadius = 2.75 + currentExploded * 0.48;
      satellites.forEach((sat) => {
        const theta = sat.baseAngle + elapsed * 0.24 * speedMult;
        sat.pivot.position.set(
          Math.cos(theta) * orbitRadius,
          sat.elevation + Math.sin(elapsed * 1.2 + sat.baseAngle) * 0.12,
          Math.sin(theta) * orbitRadius
        );
        sat.collar.rotation.z = elapsed * 0.9 * speedMult;

        const isSelected = sat.id === selectedIdRef.current;
        const isHovered = sat.id === hoveredDomainId;
        const targetScale = isSelected ? 1.38 : isHovered ? 1.22 : 1.0;
        const nextS = THREE.MathUtils.damp(
          sat.pivot.scale.x,
          targetScale,
          8,
          delta
        );
        sat.pivot.scale.set(nextS, nextS, nextS);

        sat.crystalMat.emissiveIntensity = isSelected
          ? 1.5
          : isHovered
          ? 1.05
          : 0.45;
        sat.crystalMat.color.setHex(
          isSelected ? 0x00d4ff : isHovered ? 0x60a5fa : 0x2563eb
        );
      });

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = window.requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', cancelPresetTransition);
      controls.dispose();
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener(
        'webglcontextlost',
        handleContextLost
      );
      renderer.domElement.removeEventListener(
        'webglcontextrestored',
        handleContextRestored
      );
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[540px]">
      {/* Dedicated Empty WebGL Mount Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Graceful Fallback if WebGL Context is Unavailable */}
      {webglFallback && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#070D19] border border-[#38BDF8]/20 text-center">
          <p className="font-display text-lg font-bold text-[#F8FAFC] mb-1">
            Spatial Engineering Core
          </p>
          <p className="text-xs text-[#94A3B8] max-w-xs">
            Interactive 3D viewport paused. Use the domain selector below to explore Nitish&apos;s Computer Science focus areas.
          </p>
        </div>
      )}
    </div>
  );
};
