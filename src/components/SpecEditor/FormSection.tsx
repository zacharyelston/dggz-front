import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FormSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function FormSection({ title, isExpanded, onToggle, children }: FormSectionProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        type="button"
        className="w-full px-4 py-2 flex items-center justify-between bg-gray-50"
        onClick={onToggle}
      >
        <span className="font-medium">{title}</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}