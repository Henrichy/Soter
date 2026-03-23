export interface AidPackage {
  id: string;
  name?: string;
  title?: string;
  region: string;
  amount: string;
  recipients: number;
  status: 'Active' | 'Pending' | 'Upcoming' | 'delivered' | 'cancelled' | 'pending';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GlobalStats {
  packagesFunded: number;
  totalDistributed: string;
  recipientsReached: number;
}
