import React from 'react';
import { useGridStore } from '../../store/gridStore';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

interface GridSettingsProps {
  gridId: string;
  onClose: () => void;
}

export function GridSettings({ gridId, onClose }: GridSettingsProps) {
  const { grids, setGridColor, setGridOpacity } = useGridStore();
  const grid = grids[gridId];

  if (!grid) return null;

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridColor(gridId, e.target.value);
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridOpacity(gridId, parseFloat(e.target.value));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X size={16} />
        </Button>

        <h2 className="text-xl font-bold mb-4">Grid Settings: {grid.name}</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              type="color"
              value={grid.color}
              onChange={handleColorChange}
              className="w-full h-10 p-1 rounded border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opacity: {grid.opacity.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={grid.opacity}
              onChange={handleOpacityChange}
              className="w-full"
            />
          </div>

          <div className="pt-4">
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}