import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { DGGRIDSpec } from '../../types/dggrid';

interface FormFieldProps {
  label: string;
  name: keyof DGGRIDSpec;
  type?: 'text' | 'number' | 'select' | 'checkbox';
  register: UseFormRegister<DGGRIDSpec>;
  options?: { value: string | number; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}

export function FormField({
  label,
  name,
  type = 'text',
  register,
  options,
  min,
  max,
  step,
  hint
}: FormFieldProps) {
  if (type === 'checkbox') {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register(name)}
          className="rounded border-gray-300"
        />
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === 'select' ? (
        <select
          {...register(name)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          {options?.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      ) : (
        <>
          <input
            type={type}
            {...register(name, {
              valueAsNumber: type === 'number',
              ...(min !== undefined && { min }),
              ...(max !== undefined && { max })
            })}
            step={step}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
        </>
      )}
    </div>
  );
}