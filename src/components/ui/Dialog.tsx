import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface DialogProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Dialog({ title, children, onClose }: DialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X size={16} />
        </Button>

        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}