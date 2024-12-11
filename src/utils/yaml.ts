import yaml from 'js-yaml';
import { DGGRIDSpec } from '../types/dggrid';

export const yamlUtils = {
  specToYaml(specs: DGGRIDSpec): string {
    return yaml.dump(specs);
  },

  yamlToSpec(yamlStr: string): DGGRIDSpec {
    return yaml.load(yamlStr) as DGGRIDSpec;
  },

  downloadYaml(specs: DGGRIDSpec, filename: string = 'dggrid-specs.yaml'): void {
    const yamlStr = yamlUtils.specToYaml(specs);
    const blob = new Blob([yamlStr], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },
};