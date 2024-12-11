import { GridGroup } from '../types/dggrid';
import { yamlUtils } from './yaml';

export const groupUtils = {
  saveGroupToYaml(group: GridGroup, grids: Record<string, any>): void {
    // Create a complete group object including grid data
    const groupData = {
      ...group,
      grids: group.gridIds.map(id => grids[id]).filter(Boolean)
    };
    
    yamlUtils.downloadYaml(groupData, `${group.name}-group.yaml`);
  },

  loadGroupFromYaml(file: File): Promise<{
    group: GridGroup;
    grids: Record<string, any>;
  }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = yamlUtils.yamlToSpec(content);
          
          // Extract group and grid data
          const { id, name, grids: gridData } = data;
          
          // Create grid records
          const grids = {};
          const gridIds = [];
          
          gridData.forEach(grid => {
            const gridId = grid.id || crypto.randomUUID();
            gridIds.push(gridId);
            grids[gridId] = {
              ...grid,
              id: gridId,
              visible: true
            };
          });
          
          // Create group object
          const group: GridGroup = {
            id: id || crypto.randomUUID(),
            name: name || 'Imported Group',
            gridIds
          };
          
          resolve({ group, grids });
        } catch (error) {
          reject(new Error('Invalid group file format'));
        }
      };
      
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  }
};