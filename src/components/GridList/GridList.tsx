import React, { useState } from 'react';
import { useGridStore } from '../../store/gridStore';
import { GridItem } from './GridItem';
import { GridSettings } from './GridSettings';
import { GroupDialog } from './GroupDialog';
import { GroupItem } from './GroupItem';
import { GroupActions } from './GroupActions';
import { Button } from '../ui/Button';
import { Globe } from 'lucide-react';
import { groupUtils } from '../../utils/groupUtils';

export function GridList() {
  const {
    grids,
    groups,
    removeGrid,
    toggleGridVisibility,
    baseGridVisible,
    toggleBaseGrid,
    removeGroup
  } = useGridStore();
  
  const [selectedGridId, setSelectedGridId] = useState<string | null>(null);
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleGroupDelete = (groupId: string) => {
    removeGroup(groupId);
  };

  const handleGroupSave = (group: GridGroup) => {
    groupUtils.saveGroupToYaml(group, grids);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Grids</h2>
        <GroupActions onCreateGroup={() => setShowGroupDialog(true)} />
      </div>

      <div className="space-y-2">
        {/* Base Grid Item */}
        <div className="flex items-center justify-between p-2 hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 opacity-30" />
            <span className="font-medium">Base Grid</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleBaseGrid}
            title={baseGridVisible ? 'Hide base grid' : 'Show base grid'}
          >
            <Globe size={16} className={baseGridVisible ? '' : 'opacity-50'} />
          </Button>
        </div>

        {/* Groups */}
        {Object.values(groups).map((group) => (
          <GroupItem
            key={group.id}
            group={group}
            isExpanded={expandedGroups.includes(group.id)}
            onToggle={() => toggleGroup(group.id)}
            onDelete={() => handleGroupDelete(group.id)}
            onSave={() => handleGroupSave(group)}
          />
        ))}

        {/* Individual Grids */}
        {Object.values(grids).map((grid) => (
          <GridItem
            key={grid.id}
            grid={grid}
            onToggleVisibility={() => toggleGridVisibility(grid.id)}
            onRemove={() => removeGrid(grid.id)}
            onSettings={() => setSelectedGridId(grid.id)}
          />
        ))}
      </div>

      {selectedGridId && (
        <GridSettings
          gridId={selectedGridId}
          onClose={() => setSelectedGridId(null)}
        />
      )}

      {showGroupDialog && (
        <GroupDialog onClose={() => setShowGroupDialog(false)} />
      )}
    </div>
  );
}