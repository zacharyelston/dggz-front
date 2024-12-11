import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, Ruler, BarChart2 } from 'lucide-react';
import { useGridStore } from '../../store/gridStore';
import { Button } from '../ui/Button';
import { GridMetrics } from './GridMetrics';

export function GridAnalysisTools() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'metrics' | 'distribution'>('metrics');
  const { grids } = useGridStore();
  const activeGrids = Object.values(grids).filter(g => g.visible);

  return (
    <div className="absolute top-24 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden max-w-md">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <span className="flex items-center gap-2">
          <Calculator size={16} />
          Grid Analysis
        </span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isExpanded && (
        <div className="divide-y">
          <div className="flex border-b">
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                selectedTab === 'metrics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setSelectedTab('metrics')}
            >
              <Ruler size={16} className="inline mr-2" />
              Metrics
            </button>
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                selectedTab === 'distribution' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setSelectedTab('distribution')}
            >
              <BarChart2 size={16} className="inline mr-2" />
              Distribution
            </button>
          </div>

          <div className="p-4 space-y-6">
            {activeGrids.length === 0 ? (
              <p className="text-sm text-gray-500">No visible grids to analyze</p>
            ) : (
              activeGrids.map(grid => (
                <div key={grid.id} className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: grid.color }}
                    />
                    <h3 className="font-medium">{grid.name}</h3>
                  </div>

                  {selectedTab === 'metrics' ? (
                    <GridMetrics gridId={grid.id} />
                  ) : (
                    <div className="text-sm text-gray-500">
                      Distribution analysis coming soon...
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}