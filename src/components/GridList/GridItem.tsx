import React from 'react';
import { Eye, EyeOff, Trash2, Settings } from 'lucide-react';
import { GridData } from '../../types/dggrid';
import { Button } from '../ui/Button';

interface GridItemProps {
  grid: GridData;
  onToggleVisibility: () => void;
  onRemove: () => void;
  onSettings: () => void;
}

export function GridItem({
  grid,
  onToggleVisibility,
  onRemove,
  onSettings,
}: GridItemProps) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: grid.color }}
        />
        <span className="font-medium">{grid.name}</span>
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleVisibility}
          title={grid.visible ? 'Hide grid' : 'Show grid'}
        >
          {grid.visible ? <Eye size={16} /> : <EyeOff size={16} />}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onSettings}
          title="Grid settings"
        >
          <Settings size={16} />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRemove}
          title="Remove grid"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}