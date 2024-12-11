import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useGridStore } from '../store/gridStore';

export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseGridVisible = useGridStore((state) => state.baseGridVisible);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  if (!baseGridVisible) return null;

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshStandardMaterial
        color="#4488ff"
        wireframe={true}
        transparent={true}
        opacity={0.3}
      />
    </Sphere>
  );
}