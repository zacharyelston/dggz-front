import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GridData } from '../../types/dggrid';

interface GridRendererProps {
  grid: GridData;
}

export function GridRenderer({ grid }: GridRendererProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];
    let vertexIndex = 0;

    grid.cells.forEach((cell) => {
      // Scale vertices to match globe radius (1) plus height
      const baseRadius = 1 + (grid.metadata.heightFromCenter || 0);
      const scaledVertices = cell.vertices.map(vertex => {
        const [x, y, z] = vertex;
        const length = Math.sqrt(x * x + y * y + z * z);
        return [
          (x / length) * baseRadius,
          (y / length) * baseRadius,
          (z / length) * baseRadius
        ];
      });

      for (let i = 1; i < scaledVertices.length - 1; i++) {
        vertices.push(...scaledVertices[0]);
        vertices.push(...scaledVertices[i]);
        vertices.push(...scaledVertices[i + 1]);

        indices.push(vertexIndex);
        indices.push(vertexIndex + 1);
        indices.push(vertexIndex + 2);
        vertexIndex += 3;
      }
    });

    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    return geo;
  }, [grid]);

  return grid.visible ? (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhongMaterial
        color={grid.color}
        wireframe={true}
        transparent={true}
        opacity={grid.opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  ) : null;
}