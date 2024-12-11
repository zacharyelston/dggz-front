import React from 'react';
import { ChevronDown, ChevronUp, Folder, FolderOpen, Trash2, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { useGridStore } from '../../store/gridStore';
import { GridGroup } from '../../types/dggrid';

interface GroupItemProps {
  group: GridGroup;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onSave: () => void;
}

export function GroupItem({
  group,
  isExpanded,
  onToggle,
  onDelete,
  onSave,
}: GroupItemProps) {
  const { grids } = useGridStore();

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-gray-50">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 flex-1"
        >
          {isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />}
          <span className="font-medium">{group.name}</span>
          <span className="text-sm text-gray-500">
            ({group.gridIds.length} grids)
          </span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            title="Save group"
          >
            <Download size={16} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            title="Delete group"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-2 space-y-1 bg-gray-50/50">
          {group.gridIds.map((gridId) => {
            const grid = grids[gridId];
            if (!grid) return null;
            return (
              <div
                key={gridId}
                className="flex items-center gap-2 px-2 py-1 text-sm"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: grid.color }}
                />
                <span>{grid.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}