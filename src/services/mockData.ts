// Temporary mock data for development
export const generateMockGridData = (specs: any) => {
  const cells = [];
  const resolution = specs.resolution || 7;
  const cellCount = Math.pow(3, resolution);
  const heightFromCenter = specs.heightFromCenter || 0;
  
  // Generate mock hexagonal cells around the globe
  for (let i = 0; i < cellCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / cellCount);
    const theta = Math.sqrt(cellCount * Math.PI) * phi;
    
    // Create hexagon vertices
    const vertices = [];
    const radius = 0.1; // Size of each hexagon
    for (let j = 0; j < 6; j++) {
      const angle = (j * Math.PI * 2) / 6;
      const x = Math.sin(phi) * Math.cos(theta) + radius * Math.cos(angle);
      const y = Math.sin(phi) * Math.sin(theta) + radius * Math.sin(angle);
      const z = Math.cos(phi);
      
      // Normalize to sphere surface
      const length = Math.sqrt(x * x + y * y + z * z);
      vertices.push([x/length, y/length, z/length]);
    }
    
    cells.push({
      id: i,
      vertices,
      center: [
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      ]
    });
  }
  
  return {
    id: specs.id,
    name: specs.name,
    cells,
    metadata: {
      projection: specs.projection,
      resolution: specs.resolution,
      cellCount,
      heightFromCenter
    },
    visible: true,
    color: '#4488ff',
    opacity: 0.8
  };
};