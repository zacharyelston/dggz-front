# Architecture

## Core Components

### 1. Grid Visualization
- Three.js-based 3D rendering
- Custom camera controls
- Grid mesh generation
- Interactive viewport

### 2. State Management
- Centralized state using Zustand
- Grid data management
- Group management
- UI state handling

### 3. Grid Analysis
- Real-time metric calculations
- Statistical analysis
- Coverage computation
- Geometric measurements

## Data Flow

```
User Input → State Store → 3D Renderer
     ↑          ↓            ↓
   API ← State Updates ← Analysis Tools
```

## Key Design Decisions

1. **Component Isolation**: Each component is self-contained with clear responsibilities
2. **State Centralization**: Single source of truth for application state
3. **Performance Optimization**: Efficient 3D rendering and calculations
4. **Type Safety**: Comprehensive TypeScript types