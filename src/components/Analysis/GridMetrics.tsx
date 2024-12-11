import React from 'react';
import { useGridStore } from '../../store/gridStore';
import { calculateGridStats } from '../../utils/gridCalculations';

interface MetricsProps {
  gridId: string;
}

export function GridMetrics({ gridId }: MetricsProps) {
  const grid = useGridStore(state => state.grids[gridId]);
  if (!grid) return null;

  const stats = calculateGridStats(grid);

  return (
    <div className="space-y-4 text-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-50 p-2 rounded">
          <div className="font-medium">Frequency</div>
          <div>{stats.frequency}</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="font-medium">Class</div>
          <div>{stats.class}</div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Strut Lengths</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>A: {stats.strutLengths.a.toFixed(3)}</div>
          <div>B: {stats.strutLengths.b.toFixed(3)}</div>
          <div>C: {stats.strutLengths.c.toFixed(3)}</div>
          {stats.strutLengths.d && <div>D: {stats.strutLengths.d.toFixed(3)}</div>}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Face Areas</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>Min: {stats.faceAreas.min.toFixed(3)}</div>
          <div>Max: {stats.faceAreas.max.toFixed(3)}</div>
          <div>Avg: {stats.faceAreas.avg.toFixed(3)}</div>
          <div>Std Dev: {stats.faceAreas.stdDev.toFixed(3)}</div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Vertex Angles</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>Min: {stats.vertexAngles.min.toFixed(1)}°</div>
          <div>Max: {stats.vertexAngles.max.toFixed(1)}°</div>
          <div>Avg: {stats.vertexAngles.avg.toFixed(1)}°</div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Coverage</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>Surface: {stats.coverage.surface.toFixed(1)}%</div>
          <div>Volume: {stats.coverage.volume.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
}