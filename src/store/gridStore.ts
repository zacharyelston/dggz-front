import { create } from 'zustand';
import { DGGRIDSpec, GridData, GridGroup } from '../types/dggrid';
import { generateRandomColor } from '../utils/colors';

interface GridStore {
  specs: Record<string, DGGRIDSpec>;
  grids: Record<string, GridData>;
  groups: Record<string, GridGroup>;
  activeGroupId: string | null;
  isLoading: boolean;
  error: string | null;
  baseGridVisible: boolean;
  
  // Base Grid Actions
  toggleBaseGrid: () => void;
  
  // Grid Actions
  addGrid: (grid: GridData) => void;
  updateGrid: (id: string, updates: Partial<GridData>) => void;
  removeGrid: (id: string) => void;
  toggleGridVisibility: (id: string) => void;
  setGridColor: (id: string, color: string) => void;
  setGridOpacity: (id: string, opacity: number) => void;
  
  // Group Actions
  createGroup: (name: string, gridIds: string[]) => void;
  removeGroup: (groupId: string) => void;
  addToGroup: (groupId: string, gridId: string) => void;
  removeFromGroup: (groupId: string, gridId: string) => void;
  setActiveGroup: (groupId: string | null) => void;
  
  // State Actions
  setSpecs: (specs: DGGRIDSpec) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useGridStore = create<GridStore>((set) => ({
  specs: {},
  grids: {},
  groups: {},
  activeGroupId: null,
  isLoading: false,
  error: null,
  baseGridVisible: true,

  toggleBaseGrid: () => set((state) => ({
    baseGridVisible: !state.baseGridVisible
  })),

  addGrid: (grid) => set((state) => ({
    grids: {
      ...state.grids,
      [grid.id]: {
        ...grid,
        visible: true,
        color: grid.color || generateRandomColor(),
        opacity: grid.opacity || 0.8,
      },
    },
  })),

  updateGrid: (id, updates) => set((state) => ({
    grids: {
      ...state.grids,
      [id]: { ...state.grids[id], ...updates },
    },
  })),

  removeGrid: (id) => set((state) => {
    const { [id]: removed, ...remaining } = state.grids;
    
    // Remove grid from all groups
    const updatedGroups = Object.entries(state.groups).reduce((acc, [groupId, group]) => {
      if (group.gridIds.includes(id)) {
        acc[groupId] = {
          ...group,
          gridIds: group.gridIds.filter(gid => gid !== id)
        };
      } else {
        acc[groupId] = group;
      }
      return acc;
    }, {} as Record<string, GridGroup>);
    
    return {
      grids: remaining,
      groups: updatedGroups
    };
  }),

  toggleGridVisibility: (id) => set((state) => ({
    grids: {
      ...state.grids,
      [id]: { ...state.grids[id], visible: !state.grids[id].visible },
    },
  })),

  setGridColor: (id, color) => set((state) => ({
    grids: {
      ...state.grids,
      [id]: { ...state.grids[id], color },
    },
  })),

  setGridOpacity: (id, opacity) => set((state) => ({
    grids: {
      ...state.grids,
      [id]: { ...state.grids[id], opacity },
    },
  })),

  createGroup: (name, gridIds) => set((state) => {
    const groupId = crypto.randomUUID();
    return {
      groups: {
        ...state.groups,
        [groupId]: { id: groupId, name, gridIds },
      },
    };
  }),

  removeGroup: (groupId) => set((state) => {
    const { [groupId]: removed, ...remaining } = state.groups;
    return { groups: remaining };
  }),

  addToGroup: (groupId, gridId) => set((state) => ({
    groups: {
      ...state.groups,
      [groupId]: {
        ...state.groups[groupId],
        gridIds: [...state.groups[groupId].gridIds, gridId],
      },
    },
  })),

  removeFromGroup: (groupId, gridId) => set((state) => ({
    groups: {
      ...state.groups,
      [groupId]: {
        ...state.groups[groupId],
        gridIds: state.groups[groupId].gridIds.filter(id => id !== gridId),
      },
    },
  })),

  setActiveGroup: (groupId) => set({ activeGroupId: groupId }),

  setSpecs: (specs) => set((state) => ({
    specs: {
      ...state.specs,
      [specs.id!]: specs,
    },
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}));