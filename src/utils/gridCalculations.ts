import { GridData } from '../types/dggrid';
import { Vector3 } from 'three';

export interface GridStats {
  frequency: number;
  class: string;
  strutLengths: {
    a: number;
    b: number;
    c: number;
    d?: number;
  };
  faceAreas: {
    min: number;
    max: number;
    avg: number;
    stdDev: number;
  };
  vertexAngles: {
    min: number;
    max: number;
    avg: number;
  };
  coverage: {
    surface: number;
    volume: number;
  };
}

export function calculateGridStats(grid: GridData): GridStats {
  const strutLengths = calculateStrutLengths(grid);
  const faceAreas = calculateFaceAreas(grid);
  const vertexAngles = calculateVertexAngles(grid);
  const coverage = calculateCoverage(grid);

  return {
    frequency: calculateFrequency(grid),
    class: determineGridClass(grid),
    strutLengths,
    faceAreas,
    vertexAngles,
    coverage,
  };
}

function calculateFrequency(grid: GridData): number {
  // Calculate subdivision frequency based on cell count
  return Math.round(Math.sqrt(grid.cells.length / 20));
}

function determineGridClass(grid: GridData): string {
  // Determine grid class based on topology and vertex arrangement
  const vertexCount = grid.cells[0]?.vertices.length || 0;
  if (vertexCount === 6) return 'Class I';
  if (vertexCount === 5) return 'Class II';
  return 'Class III';
}

function calculateStrutLengths(grid: GridData) {
  const lengths = new Set<number>();
  
  grid.cells.forEach(cell => {
    const vertices = cell.vertices;
    for (let i = 0; i < vertices.length; i++) {
      const v1 = new Vector3(...vertices[i]);
      const v2 = new Vector3(...vertices[(i + 1) % vertices.length]);
      lengths.add(v1.distanceTo(v2));
    }
  });

  const sortedLengths = Array.from(lengths).sort((a, b) => a - b);
  
  return {
    a: sortedLengths[0] || 0,
    b: sortedLengths[1] || sortedLengths[0] || 0,
    c: sortedLengths[2] || sortedLengths[1] || sortedLengths[0] || 0,
    d: sortedLengths[3],
  };
}

function calculateFaceAreas(grid: GridData) {
  const areas: number[] = [];
  
  grid.cells.forEach(cell => {
    const vertices = cell.vertices;
    let area = 0;
    
    // Calculate area using triangulation
    for (let i = 1; i < vertices.length - 1; i++) {
      const v1 = new Vector3(...vertices[0]);
      const v2 = new Vector3(...vertices[i]);
      const v3 = new Vector3(...vertices[i + 1]);
      
      // Calculate triangle area
      const triangle = new Vector3()
        .crossVectors(
          new Vector3().subVectors(v2, v1),
          new Vector3().subVectors(v3, v1)
        );
      area += triangle.length() / 2;
    }
    
    areas.push(area);
  });

  const avg = areas.reduce((sum, a) => sum + a, 0) / areas.length;
  const variance = areas.reduce((sum, a) => sum + Math.pow(a - avg, 2), 0) / areas.length;

  return {
    min: Math.min(...areas),
    max: Math.max(...areas),
    avg,
    stdDev: Math.sqrt(variance),
  };
}

function calculateVertexAngles(grid: GridData) {
  const angles: number[] = [];
  
  grid.cells.forEach(cell => {
    const vertices = cell.vertices;
    for (let i = 0; i < vertices.length; i++) {
      const v1 = new Vector3(...vertices[i]);
      const v2 = new Vector3(...vertices[(i + 1) % vertices.length]);
      const v3 = new Vector3(...vertices[(i + 2) % vertices.length]);
      
      // Calculate angle between vectors
      const vec1 = new Vector3().subVectors(v2, v1);
      const vec2 = new Vector3().subVectors(v2, v3);
      const angle = vec1.angleTo(vec2) * (180 / Math.PI);
      angles.push(angle);
    }
  });

  return {
    min: Math.min(...angles),
    max: Math.max(...angles),
    avg: angles.reduce((sum, a) => sum + a, 0) / angles.length,
  };
}

function calculateCoverage(grid: GridData) {
  const totalSurfaceArea = 4 * Math.PI; // Surface area of unit sphere
  const totalVolume = (4/3) * Math.PI; // Volume of unit sphere
  
  let gridSurfaceArea = 0;
  let gridVolume = 0;
  
  grid.cells.forEach(cell => {
    const area = calculateCellArea(cell.vertices);
    gridSurfaceArea += area;
    
    // Approximate volume using surface area and height from center
    const height = grid.metadata.heightFromCenter || 0;
    gridVolume += area * height;
  });

  return {
    surface: (gridSurfaceArea / totalSurfaceArea) * 100,
    volume: (gridVolume / totalVolume) * 100,
  };
}

function calculateCellArea(vertices: number[][]) {
  let area = 0;
  const v0 = new Vector3(...vertices[0]);
  
  for (let i = 1; i < vertices.length - 1; i++) {
    const v1 = new Vector3(...vertices[i]);
    const v2 = new Vector3(...vertices[i + 1]);
    
    // Calculate spherical triangle area
    area += calculateSphericalTriangleArea(v0, v1, v2);
  }
  
  return area;
}

function calculateSphericalTriangleArea(v1: Vector3, v2: Vector3, v3: Vector3) {
  // Calculate spherical excess using l'Huilier's formula
  const a = v1.angleTo(v2);
  const b = v2.angleTo(v3);
  const c = v3.angleTo(v1);
  
  const s = (a + b + c) / 2;
  const E = Math.sqrt(
    Math.tan(s/2) *
    Math.tan((s-a)/2) *
    Math.tan((s-b)/2) *
    Math.tan((s-c)/2)
  );
  
  return 4 * Math.atan(E);
}