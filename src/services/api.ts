import axios from 'axios';
import { DGGRIDSpec, GridData } from '../types/dggrid';
import { generateMockGridData } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const USE_MOCK = true; // Toggle this to switch between mock and real API

export const api = {
  async generateGrid(specs: DGGRIDSpec): Promise<GridData> {
    if (USE_MOCK) {
      return generateMockGridData(specs);
    }
    const response = await axios.post(`${API_BASE_URL}/generate`, specs);
    return response.data;
  },

  async loadGrid(id: string): Promise<GridData> {
    if (USE_MOCK) {
      throw new Error('Mock load grid not implemented');
    }
    const response = await axios.get(`${API_BASE_URL}/grids/${id}`);
    return response.data;
  },

  async saveSpecs(specs: DGGRIDSpec): Promise<{ id: string }> {
    if (USE_MOCK) {
      return { id: specs.id || crypto.randomUUID() };
    }
    const response = await axios.post(`${API_BASE_URL}/specs`, specs);
    return response.data;
  },
};