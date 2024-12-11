import React from 'react';
import { Dialog } from '../ui/Dialog';
import { HelpCircle } from 'lucide-react';

interface HelpSection {
  title: string;
  content: string[];
}

const helpSections: HelpSection[] = [
  {
    title: 'Basic Settings',
    content: [
      'Grid Name: A unique identifier for your grid',
      'Projection: Choose between ISEA (Icosahedral Snyder Equal Area) or Fuller projection',
      'Topology: Select cell shape - Hexagon, Triangle, or Diamond'
    ]
  },
  {
    title: 'Resolution Settings',
    content: [
      'Resolution: Controls grid density (1-20). Higher values create more cells',
      'Aperture: Number of cells per parent cell (3 or 4)',
      'Height from Center: Distance from globe surface (0-2)'
    ]
  },
  {
    title: 'Orientation Settings',
    content: [
      'Latitude/Longitude: Set the grid\'s reference point (-90° to 90° / -180° to 180°)',
      'Azimuth: Rotation around the reference axis (-360° to 360°)'
    ]
  },
  {
    title: 'Advanced Settings',
    content: [
      'Max Cells: Maximum number of cells to generate',
      'Meters per Unit: Scale factor for real-world measurements',
      'Clip to Ellipsoid: Constrain grid to Earth\'s surface',
      'Output Options: Choose to generate cell and/or vertex data'
    ]
  }
];

export function HelpDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog title="DGGRID Settings Help" onClose={onClose}>
      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {helpSections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <HelpCircle size={18} className="text-blue-500" />
              {section.title}
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              {section.content.map((item) => (
                <li key={item} className="list-disc ml-4">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Dialog>
  );
}