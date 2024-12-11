export interface DGGRIDSpec {
  id?: string;
  name: string;
  projection: string;
  aperture: number;
  topology: string;
  resolution: number;
  precision: number;
  outputFormat: string;
  outputFilename: string;
  cellOutput: boolean;
  vertexOutput: boolean;
  heightFromCenter?: number;
  orientationLatitude?: number;
  orientationLongitude?: number;
  azimuthDegrees?: number;
  maxCells?: number;
  clipToEllipsoid?: boolean;
  metersPerUnit?: number;
}

export interface GridData {
  id: string;
  name: string;
  cells: {
    id: number;
    vertices: number[][];
    center: number[];
  }[];
  metadata: {
    projection: string;
    resolution: number;
    cellCount: number;
    heightFromCenter?: number;
  };
  visible: boolean;
  color: string;
  opacity: number;
}

export interface GridGroup {
  id: string;
  name: string;
  gridIds: string[];
}