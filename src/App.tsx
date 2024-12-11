import React from 'react';
import { Scene } from './components/Scene';
import { SpecForm } from './components/SpecEditor/SpecForm';
import { GridList } from './components/GridList/GridList';
import { useGridStore } from './store/gridStore';
import { api } from './services/api';
import { yamlUtils } from './utils/yaml';
import { DGGRIDSpec } from './types/dggrid';

function App() {
  const { setSpecs, addGrid, setLoading, setError } = useGridStore();

  const handleSpecSubmit = async (data: DGGRIDSpec) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add unique ID and name if not provided
      const specWithId = {
        ...data,
        id: data.id || crypto.randomUUID(),
        name: data.name || `Grid ${Object.keys(useGridStore.getState().grids).length + 1}`,
      };
      
      // Save specs
      await api.saveSpecs(specWithId);
      setSpecs(specWithId);
      
      // Generate grid
      const gridData = await api.generateGrid(specWithId);
      addGrid(gridData);
      
      // Save specs to YAML
      yamlUtils.downloadYaml(specWithId);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-80 p-4 bg-white shadow-lg overflow-y-auto flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">DGGRID Viewer</h1>
          <SpecForm onSubmit={handleSpecSubmit} />
        </div>
        
        <GridList />
      </div>
      
      <div className="flex-1 relative">
        <Scene />
      </div>
    </div>
  );
}

export default App;