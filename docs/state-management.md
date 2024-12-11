# State Management

## Store Structure

### Grid Store
```typescript
interface GridStore {
  specs: Record<string, DGGRIDSpec>;
  grids: Record<string, GridData>;
  groups: Record<string, GridGroup>;
  activeGroupId: string | null;
  isLoading: boolean;
  error: string | null;
  baseGridVisible: boolean;
}
```

## Actions

### Grid Actions
- `addGrid`: Add new grid
- `updateGrid`: Update existing grid
- `removeGrid`: Remove grid
- `toggleGridVisibility`: Toggle visibility
- `setGridColor`: Update grid color
- `setGridOpacity`: Update opacity

### Group Actions
- `createGroup`: Create new group
- `removeGroup`: Remove group
- `addToGroup`: Add grid to group
- `removeFromGroup`: Remove grid from group
- `setActiveGroup`: Set active group

### State Actions
- `setSpecs`: Update specifications
- `setLoading`: Set loading state
- `setError`: Set error state