import React from 'react';
import { Upload, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ControlsProps {
  onFileUpload: (file: File) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function Controls({ onFileUpload, onZoomIn, onZoomOut, onReset }: ControlsProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 flex gap-4">
      <label className="btn flex items-center gap-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        <Upload size={20} />
        <span>Load Grid</span>
        <input
          type="file"
          accept=".txt,.csv,.json"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      
      <button
        onClick={onZoomIn}
        className="btn bg-gray-100 p-2 rounded hover:bg-gray-200"
        title="Zoom In"
      >
        <ZoomIn size={20} />
      </button>
      
      <button
        onClick={onZoomOut}
        className="btn bg-gray-100 p-2 rounded hover:bg-gray-200"
        title="Zoom Out"
      >
        <ZoomOut size={20} />
      </button>
      
      <button
        onClick={onReset}
        className="btn bg-gray-100 p-2 rounded hover:bg-gray-200"
        title="Reset View"
      >
        <RotateCcw size={20} />
      </button>
    </div>
  );
}