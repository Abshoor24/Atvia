import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Grid, Center } from '@react-three/drei';
import { CarModel } from './CarModel';
import { RotateCcw, ZoomIn, ZoomOut, Compass } from 'lucide-react';

// Camera presets according to user specification
const CAMERA_PRESETS = {
  exterior: {
    pos: [3.8, 2.0, 3.8],
    target: [0, 0.45, 0]
  },
  interior: {
    pos: [-0.25, 0.95, 0.55],
    target: [-0.35, 0.68, 0.0]
  },
  inspection: {
    pos: [-0.2, 1.25, 0.75],
    target: [-0.28, 0.65, 0.05]
  }
};

function LoadingSkeleton() {
  return (
    <div className="car-canvas__loader" aria-live="polite">
      <div className="car-canvas__loader-inner">
        <div className="car-canvas__loader-spinner" />
        <span className="car-canvas__loader-text">Memuat Model 3D Presisi...</span>
        <span className="car-canvas__loader-sub">Ferrari GT Substrate Geometry • 1.68 MB</span>
      </div>
    </div>
  );
}

export function CarCanvas({
  viewMode,
  selectedPinId,
  onSelectPin,
  inspectionPoints,
  sequencePins,
  isDark
}) {
  const controlsRef = useRef();
  const [autoRotate, setAutoRotate] = useState(false);

  // Smoothly move camera when viewMode changes
  useEffect(() => {
    if (!controlsRef.current) return;
    const preset = CAMERA_PRESETS[viewMode] || CAMERA_PRESETS.exterior;
    controlsRef.current.setLookAt(
      preset.pos[0], preset.pos[1], preset.pos[2],
      preset.target[0], preset.target[1], preset.target[2],
      true
    );
  }, [viewMode]);

  // Smoothly focus on selected pin when clicked
  useEffect(() => {
    if (!controlsRef.current || !selectedPinId) return;

    // Check if it's a sequence pin
    const seqPin = sequencePins.find((p) => p.id === selectedPinId);
    if (seqPin) {
      const [px, py, pz] = seqPin.position;
      // Position camera offset depending on pin
      const camX = px + (px >= 0 ? 1.6 : -1.6);
      const camY = Math.max(0.6, py + 0.6);
      const camZ = pz + (pz >= 0 ? 1.8 : -1.8);
      controlsRef.current.setLookAt(camX, camY, camZ, px, py, pz, true);
      return;
    }

    // Check if it's an inspection point
    const inspPin = inspectionPoints.find((p) => p.id === selectedPinId);
    if (inspPin) {
      const [px, py, pz] = inspPin.position;
      controlsRef.current.setLookAt(px + 0.35, py + 0.45, pz + 0.45, px, py, pz, true);
    }
  }, [selectedPinId, sequencePins, inspectionPoints]);

  const handleResetCamera = () => {
    if (!controlsRef.current) return;
    const preset = CAMERA_PRESETS[viewMode] || CAMERA_PRESETS.exterior;
    controlsRef.current.setLookAt(
      preset.pos[0], preset.pos[1], preset.pos[2],
      preset.target[0], preset.target[1], preset.target[2],
      true
    );
  };

  const handleZoom = (delta) => {
    if (!controlsRef.current) return;
    controlsRef.current.dolly(delta, true);
  };

  return (
    <div className="car-canvas-container">
      {/* Fallback skeleton while Suspense loads */}
      <Suspense fallback={<LoadingSkeleton />}>
        <Canvas
          shadows
          camera={{ position: [3.8, 2.0, 3.8], fov: 45 }}
          className="car-canvas__viewport"
        >
          {/* Neutral Technical Lighting Setup (Clinical Studio) */}
          <ambientLight intensity={isDark ? 0.6 : 0.85} />
          <directionalLight
            position={[8, 12, 6]}
            intensity={isDark ? 1.4 : 1.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={0.5}
            shadow-camera-far={25}
            shadow-camera-left={-4}
            shadow-camera-right={4}
            shadow-camera-top={4}
            shadow-camera-bottom={-4}
          />
          <directionalLight position={[-6, 6, -6]} intensity={0.5} />

          {/* Precision 3D Model with Center Alignment */}
          <Center top>
            <CarModel
              viewMode={viewMode}
              selectedPinId={selectedPinId}
              onSelectPin={onSelectPin}
              inspectionPoints={inspectionPoints}
              sequencePins={sequencePins}
            />
          </Center>

          {/* Swiss Technical Grid Floor */}
          <Grid
            position={[0, -0.01, 0]}
            args={[18, 18]}
            cellSize={0.5}
            cellThickness={0.8}
            cellColor={isDark ? '#1E293B' : '#E2E8F0'}
            sectionSize={2.0}
            sectionThickness={1.2}
            sectionColor={isDark ? '#334155' : '#CBD5E1'}
            fadeDistance={12}
            fadeStrength={1.5}
          />

          {/* Smooth Camera Controls */}
          <CameraControls
            ref={controlsRef}
            minDistance={0.8}
            maxDistance={8.5}
            maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going below floor
            smoothTime={0.25}
            autoRotate={autoRotate}
            autoRotateSpeed={1.0}
          />
        </Canvas>
      </Suspense>

      {/* Floating Canvas Quick Controls (Clinical & Minimal) */}
      <div className="car-canvas__floating-controls" aria-label="Kontrol Navigasi Kanvas 3D">
        <button
          type="button"
          className="car-canvas__tool-btn"
          onClick={handleResetCamera}
          title="Reset Sudut Kamera"
          aria-label="Reset Sudut Kamera"
        >
          <RotateCcw size={15} strokeWidth={2} />
        </button>
        <button
          type="button"
          className="car-canvas__tool-btn"
          onClick={() => handleZoom(0.8)}
          title="Perbesar Kamera (Zoom In)"
          aria-label="Zoom In"
        >
          <ZoomIn size={15} strokeWidth={2} />
        </button>
        <button
          type="button"
          className="car-canvas__tool-btn"
          onClick={() => handleZoom(-0.8)}
          title="Perkecil Kamera (Zoom Out)"
          aria-label="Zoom Out"
        >
          <ZoomOut size={15} strokeWidth={2} />
        </button>
        <button
          type="button"
          className={`car-canvas__tool-btn ${autoRotate ? 'car-canvas__tool-btn--active' : ''}`}
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? 'Hentikan Rotasi Otomatis' : 'Mulai Rotasi Otomatis'}
          aria-label="Rotasi Otomatis"
        >
          <Compass size={15} strokeWidth={2} />
        </button>
      </div>

      {/* Canvas Watermark / Substrate Inspection Label */}
      <div className="car-canvas__badge-label">
        <span className="car-canvas__badge-dot" />
        <span>Substrate 3D Simulator • ATVIA Technical Explorer</span>
      </div>
    </div>
  );
}
