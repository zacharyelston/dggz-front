import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useGridStore } from '../store/gridStore';
import { GridRenderer } from './Viewer/GridRenderer';
import { Globe } from './Globe';
import { ControlsGuide } from './Viewer/ControlsGuide';
import { CameraControls } from './Viewer/CameraControls';
import { GridAnalysisTools } from './Analysis/GridAnalysisTools';

export function Scene() {
  const { grids } = useGridStore();
  const gridArray = Object.values(grids);

  return (
    <div className="relative w-full h-full">
      <Canvas style={{ background: '#111' }}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={45}
          near={0.1}
          far={1000}
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Base globe visualization */}
        <Globe />
        
        {/* Render all visible grids */}
        {gridArray.map((grid) => (
          <GridRenderer key={grid.id} grid={grid} />
        ))}
        
        <CameraControls />
      </Canvas>
      
      <ControlsGuide />
      <GridAnalysisTools />
    </div>
  );
}