import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mouse, MousePointer } from 'lucide-react';

export function ControlsGuide() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute bottom-24 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <span>Viewer Controls</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isExpanded && (
        <div className="px-4 py-3 space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <Mouse className="w-5 h-5 mt-1 text-gray-400" />
            <div>
              <p><strong>Left Button + Drag:</strong> Rotate view</p>
              <p><strong>Right Button + Drag:</strong> Pan view</p>
              <p><strong>Scroll Wheel:</strong> Zoom in/out</p>
              <p><strong>Middle Button + Drag:</strong> Alternative pan</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MousePointer className="w-5 h-5 mt-1 text-gray-400" />
            <div>
              <p><strong>Double Click:</strong> Reset camera position</p>
              <p><strong>Pinch:</strong> Touch zoom (mobile)</p>
              <p><strong>Two-finger Pan:</strong> Touch rotate (mobile)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}