import { api } from './api';
import { Harvest } from '@/types';

export interface HarvestData {
  harvestDate: string;
  wetWeight?: number;
  trimMethod?: string;
  harvestNotes?: string;
  harvestImages?: string[];
  dryingStartDate?: string;
  dryingEndDate?: string;
  dryingTemp?: number;
  dryingHumidity?: number;
  dryWeight?: number;
  dryingNotes?: string;
  curingStartDate?: string;
  curingMethod?: string;
  jarCount?: number;
  burpingSchedule?: string;
  curingHumidity?: number;
  curingNotes?: string;
  finalWeight?: number;
  qualityRating?: number;
  qualityNotes?: string;
}

export const harvestApi = {
  // Create harvest data for a run
  create: async (runId: string, data: HarvestData): Promise<Harvest> => {
    const response = await api.post(`/runs/${runId}/harvest`, data);
    return response.data;
  },

  // Get harvest data for a run
  getByRunId: async (runId: string): Promise<Harvest | null> => {
    try {
      const response = await api.get(`/runs/${runId}/harvest`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  // Update harvest data
  update: async (runId: string, data: Partial<HarvestData>): Promise<Harvest> => {
    const response = await api.put(`/runs/${runId}/harvest`, data);
    return response.data;
  },

  // Delete harvest data
  delete: async (runId: string): Promise<void> => {
    await api.delete(`/runs/${runId}/harvest`);
  },
};

export default harvestApi;
