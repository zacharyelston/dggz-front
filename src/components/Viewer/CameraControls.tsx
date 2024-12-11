import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import CameraControlsImpl from 'camera-controls';

CameraControlsImpl.install({ THREE });

export function CameraControls() {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useRef<CameraControlsImpl>();
  
  useEffect(() => {
    controls.current = new CameraControlsImpl(camera as THREE.PerspectiveCamera, gl.domElement);
    controls.current.dollyToCursor = true; // Enable cursor-based zooming
    controls.current.minDistance = 1.2;
    controls.current.maxDistance = 20;
    controls.current.smoothTime = 0.25;
    
    return () => {
      controls.current?.dispose();
    };
  }, [camera, gl]);
  
  useFrame((_, delta) => {
    controls.current?.update(delta);
  });
  
  return null;
}