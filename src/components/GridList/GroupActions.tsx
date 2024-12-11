import React, { useRef } from 'react';
import { Download, Upload, FolderPlus } from 'lucide-react';
import { Button } from '../ui/Button';
import { useGridStore } from '../../store/gridStore';
import { groupUtils } from '../../utils/groupUtils';

interface GroupActionsProps {
  onCreateGroup: () => void;
}

export function GroupActions({ onCreateGroup }: GroupActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { groups, grids, addGrid, createGroup } = useGridStore();
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const { group, grids: loadedGrids } = await groupUtils.loadGroupFromYaml(file);
      
      // Add all grids first
      Object.values(loadedGrids).forEach(grid => {
        addGrid(grid);
      });
      
      // Create the group
      createGroup(group.name, group.gridIds);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error loading group:', error);
      // TODO: Show error message to user
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".yaml,.yml"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        title="Load group"
      >
        <Upload size={16} className="mr-1" />
        Load
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onCreateGroup}
      >
        <FolderPlus size={16} className="mr-1" />
        New
      </Button>
    </div>
  );
}