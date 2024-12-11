import React, { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { useGridStore } from '../../store/gridStore';
import { Check } from 'lucide-react';

interface GroupDialogProps {
  onClose: () => void;
}

export function GroupDialog({ onClose }: GroupDialogProps) {
  const { grids, createGroup } = useGridStore();
  const [groupName, setGroupName] = useState('');
  const [selectedGrids, setSelectedGrids] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName && selectedGrids.size > 0) {
      createGroup(groupName, Array.from(selectedGrids));
      onClose();
    }
  };

  const toggleGridSelection = (gridId: string) => {
    setSelectedGrids(prev => {
      const next = new Set(prev);
      if (next.has(gridId)) {
        next.delete(gridId);
      } else {
        next.add(gridId);
      }
      return next;
    });
  };

  const gridList = Object.values(grids);

  return (
    <Dialog title="Create Grid Group" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Group Name
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm p-2"
            placeholder="Enter group name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Grids ({selectedGrids.size} selected)
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-2">
            {gridList.length === 0 ? (
              <p className="text-sm text-gray-500 p-2">No grids available</p>
            ) : (
              gridList.map((grid) => (
                <button
                  key={grid.id}
                  type="button"
                  onClick={() => toggleGridSelection(grid.id)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded w-full text-left"
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      selectedGrids.has(grid.id)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedGrids.has(grid.id) && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: grid.color }}
                    />
                    <span className="text-sm">{grid.name}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!groupName || selectedGrids.size === 0}
          >
            Create Group
          </Button>
        </div>
      </form>
    </Dialog>
  );
}