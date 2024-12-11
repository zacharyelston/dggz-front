import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DGGRIDSpec } from '../../types/dggrid';
import { Button } from '../ui/Button';
import { useGridStore } from '../../store/gridStore';
import { HelpCircle } from 'lucide-react';
import { HelpDialog } from '../Help/HelpDialog';
import { FormSection } from './FormSection';
import { FormField } from './FormField';

interface SpecFormProps {
  initialData?: Partial<DGGRIDSpec>;
  onSubmit: (data: DGGRIDSpec) => void;
}

export function SpecForm({ initialData, onSubmit }: SpecFormProps) {
  const { isLoading, error } = useGridStore();
  const [expandedSection, setExpandedSection] = useState<string | null>('basic');
  const [showHelp, setShowHelp] = useState(false);

  const { register, handleSubmit } = useForm<DGGRIDSpec>({
    defaultValues: {
      name: '',
      projection: 'ISEA',
      topology: 'HEXAGON',
      resolution: 7,
      aperture: 3,
      precision: 7,
      outputFormat: 'GeoJSON',
      outputFilename: 'grid',
      cellOutput: true,
      vertexOutput: true,
      heightFromCenter: 0,
      orientationLatitude: 0,
      orientationLongitude: 0,
      azimuthDegrees: 0,
      maxCells: undefined,
      clipToEllipsoid: false,
      metersPerUnit: 1,
      ...initialData
    }
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Grid Settings</h2>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => setShowHelp(true)}
          className="flex items-center gap-1"
        >
          <HelpCircle size={16} />
          <span>Help</span>
        </Button>
      </div>

      <FormSection
        title="Basic Settings"
        isExpanded={expandedSection === 'basic'}
        onToggle={() => toggleSection('basic')}
      >
        <FormField
          label="Grid Name"
          name="name"
          register={register}
        />
        <FormField
          label="Projection"
          name="projection"
          type="select"
          register={register}
          options={[
            { value: 'ISEA', label: 'ISEA' },
            { value: 'FULLER', label: 'Fuller' }
          ]}
        />
        <FormField
          label="Topology"
          name="topology"
          type="select"
          register={register}
          options={[
            { value: 'HEXAGON', label: 'Hexagon' },
            { value: 'TRIANGLE', label: 'Triangle' },
            { value: 'DIAMOND', label: 'Diamond' }
          ]}
        />
      </FormSection>

      <FormSection
        title="Resolution Settings"
        isExpanded={expandedSection === 'resolution'}
        onToggle={() => toggleSection('resolution')}
      >
        <FormField
          label="Resolution"
          name="resolution"
          type="number"
          register={register}
          min={1}
          max={20}
        />
        <FormField
          label="Aperture"
          name="aperture"
          type="select"
          register={register}
          options={[
            { value: 3, label: '3' },
            { value: 4, label: '4' }
          ]}
        />
        <FormField
          label="Height from Center"
          name="heightFromCenter"
          type="number"
          register={register}
          min={0}
          max={2}
          step={0.1}
        />
      </FormSection>

      <FormSection
        title="Orientation Settings"
        isExpanded={expandedSection === 'orientation'}
        onToggle={() => toggleSection('orientation')}
      >
        <FormField
          label="Orientation Latitude"
          name="orientationLatitude"
          type="number"
          register={register}
          min={-90}
          max={90}
          step={0.1}
        />
        <FormField
          label="Orientation Longitude"
          name="orientationLongitude"
          type="number"
          register={register}
          min={-180}
          max={180}
          step={0.1}
        />
        <FormField
          label="Azimuth (degrees)"
          name="azimuthDegrees"
          type="number"
          register={register}
          min={-360}
          max={360}
          step={0.1}
        />
      </FormSection>

      <FormSection
        title="Advanced Settings"
        isExpanded={expandedSection === 'advanced'}
        onToggle={() => toggleSection('advanced')}
      >
        <FormField
          label="Maximum Cells"
          name="maxCells"
          type="number"
          register={register}
          min={1}
          hint="Leave empty for unlimited"
        />
        <FormField
          label="Meters per Unit"
          name="metersPerUnit"
          type="number"
          register={register}
          min={0}
          step={0.1}
        />
        <FormField
          label="Clip to Ellipsoid"
          name="clipToEllipsoid"
          type="checkbox"
          register={register}
        />
        <FormField
          label="Generate Cell Output"
          name="cellOutput"
          type="checkbox"
          register={register}
        />
        <FormField
          label="Generate Vertex Output"
          name="vertexOutput"
          type="checkbox"
          register={register}
        />
      </FormSection>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Generating...' : 'Generate Grid'}
      </Button>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {showHelp && <HelpDialog onClose={() => setShowHelp(false)} />}
    </form>
  );
}