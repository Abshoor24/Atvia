import { useMemo, useRef } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

// Fallback to CDN if needed, but local model is cached in /models/ferrari.glb
const MODEL_URL = '/models/ferrari.glb';
const DRACO_URL = '/draco/';

export function CarModel({
  viewMode,
  selectedPinId,
  onSelectPin,
  inspectionPoints,
  sequencePins
}) {
  const groupRef = useRef();

  // Load model using cached local GLB & Draco with fallback
  const { scene } = useGLTF(MODEL_URL, DRACO_URL);

  // Clone scene and apply precision materials once
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const matName = child.material?.name || '';
        
        // Enhance body paint with deep metallic finish
        if (matName.includes('Body_Color') || child.name === 'body') {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#991B1B'), // Deep Crimson Precision Paint
            metalness: 0.85,
            roughness: 0.18,
            envMapIntensity: 1.2
          });
        }

        // Clean transparent glass
        if (matName.includes('Glass') || child.name === 'glass') {
          child.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#CBD5E1'),
            transmission: 0.88,
            opacity: 0.92,
            transparent: true,
            roughness: 0.05,
            ior: 1.52,
            thickness: 0.4
          });
        }

        // Tires: dark matte rubber
        if (matName.includes('Tires') || child.name.includes('tire')) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#1E293B'),
            roughness: 0.85,
            metalness: 0.08
          });
        }

        // Carbon fiber / unpainted trim
        if (matName.includes('Carbon') || matName.includes('plastic_gray') || child.name === 'trim') {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#0F172A'),
            roughness: 0.65,
            metalness: 0.25
          });
        }
      }
    });

    return cloned;
  }, [scene]);

  return (
    <group ref={groupRef} dispose={null}>
      {/* 3D Car Model */}
      <primitive object={clonedScene} />

      {/* Mode 1 & 2: Urutan Perawatan 01-05 Pins */}
      {viewMode !== 'inspection' &&
        sequencePins.map((pin) => {
          const isActive = selectedPinId === pin.id;
          return (
            <group key={pin.id} position={pin.position}>
              <Html center distanceFactor={8} zIndexRange={[100, 0]}>
                <button
                  type="button"
                  className={`car-pin ${isActive ? 'car-pin--active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPin(pin.id);
                  }}
                  aria-label={`Titik Pin ${pin.step}: ${pin.name}`}
                  title={`${pin.step}. ${pin.name} (${pin.volume})`}
                >
                  <span className="car-pin__pulse" />
                  <span className="car-pin__core">
                    <span className="car-pin__num">{pin.step}</span>
                  </span>
                  {isActive && (
                    <span className="car-pin__tooltip animate-fade-in">
                      <span className="car-pin__tooltip-badge">{pin.badge}</span>
                      <strong className="car-pin__tooltip-name">{pin.name}</strong>
                      <span className="car-pin__tooltip-desc">{pin.shortDesc}</span>
                    </span>
                  )}
                </button>
              </Html>
            </group>
          );
        })}

      {/* Mode 3: Mode Inspeksi Do's & Don'ts Pins */}
      {viewMode === 'inspection' &&
        inspectionPoints.map((point) => {
          const isActive = selectedPinId === point.id;
          const isSafe = point.type === 'safe';
          return (
            <group key={point.id} position={point.position}>
              <Html center distanceFactor={8} zIndexRange={[100, 0]}>
                <button
                  type="button"
                  className={`car-inspection-pin ${isSafe ? 'car-inspection-pin--safe' : 'car-inspection-pin--danger'} ${isActive ? 'car-inspection-pin--active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPin(point.id);
                  }}
                  aria-label={`${isSafe ? 'Zona Aman' : 'Zona Pantangan'}: ${point.zone}`}
                  title={`${isSafe ? 'ZONA AMAN' : 'ZONA PANTANGAN'}: ${point.zone}`}
                >
                  <span className="car-inspection-pin__pulse" />
                  <span className="car-inspection-pin__core">
                    {isSafe ? (
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </span>
                  {isActive && (
                    <span className={`car-inspection-pin__tooltip ${isSafe ? 'car-inspection-pin__tooltip--safe' : 'car-inspection-pin__tooltip--danger'}`}>
                      <strong className="car-inspection-pin__tooltip-zone">{point.zone}</strong>
                      <span className="car-inspection-pin__tooltip-text">{point.instruction}</span>
                    </span>
                  )}
                </button>
              </Html>
            </group>
          );
        })}
    </group>
  );
}

useGLTF.preload(MODEL_URL, DRACO_URL);
