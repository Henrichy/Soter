'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/mock-api/client';
import type { AidPackage, PaginatedResponse, GlobalStats } from '@/types/aid-package';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function fetchAidPackages(page = 1, limit = 10): Promise<PaginatedResponse<AidPackage>> {
  const response = await fetchClient(`${API_URL}/aid?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch aid packages: ${response.status}`);
  }
  return response.json();
}

export function useAidPackages(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['aid-packages', page, limit],
    queryFn: () => fetchAidPackages(page, limit),
  });
}

async function fetchGlobalStats(): Promise<GlobalStats> {
  const response = await fetchClient(`${API_URL}/analytics/global-stats`);
  if (!response.ok) {
    throw new Error(`Failed to fetch global stats: ${response.status}`);
  }
  return response.json();
}

export function useGlobalStats() {
  return useQuery({
    queryKey: ['global-stats'],
    queryFn: fetchGlobalStats,
  });
}
