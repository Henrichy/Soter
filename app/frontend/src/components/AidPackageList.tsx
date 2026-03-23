'use client';

import React, { useState } from 'react';
import { useAidPackages } from '@/hooks/useAidPackages';

export const AidPackageList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useAidPackages(page, 10);

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-700">
        Error loading packages: {error.message}
      </div>
    );
  }

  const packages = data?.data;

  if (!packages || packages.length === 0) {
    return <div className="text-gray-500">No aid packages found.</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Available Aid Packages</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{pkg.title || pkg.name}</h4>
                <p className="text-sm text-gray-500">ID: {pkg.id}</p>
                {pkg.region && <p className="text-sm text-gray-500">{pkg.region}</p>}
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  pkg.status === 'delivered' || pkg.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : pkg.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {pkg.status}
              </span>
            </div>
            {(pkg.amount || pkg.recipients) && (
              <div className="mt-2 text-sm text-gray-600 flex gap-4">
                {pkg.amount && <span>{pkg.amount}</span>}
                {pkg.recipients && <span>{pkg.recipients} recipients</span>}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Pagination Controls */}
      {data?.meta && (
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {data.meta.page} of {data.meta.totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(data.meta.totalPages, p + 1))}
            disabled={page === data.meta.totalPages}
            className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
