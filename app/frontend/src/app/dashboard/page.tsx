'use client';

import { useState } from 'react';
import { useAidPackages, useGlobalStats } from '@/hooks/useAidPackages';

const STATUS: Record<string, string> = {
  Active:
    'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
  Pending:
    'bg-gray-50 text-gray-500 border border-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700',
  Upcoming:
    'bg-gray-50 text-gray-400 border border-gray-100 dark:bg-gray-800/20 dark:text-gray-500 dark:border-gray-800',
  delivered:
    'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800',
  cancelled:
    'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
  pending:
    'bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-300 dark:border-yellow-800',
};

export default function AidDashboard() {
  const [page, setPage] = useState(1);
  const { data: statsData, isLoading: statsLoading } = useGlobalStats();
  const { data: packagesData, isLoading: packagesLoading } = useAidPackages(page, 10);

  const packages = packagesData?.data || [];
  const meta = packagesData?.meta;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50 dark:to-gray-950">
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Aid Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
              Onchain Aid, Fully Transparent
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              This dashboard will display humanitarian aid packages funded via
              Soter on the Stellar / Soroban blockchain every distribution
              anchored onchain and auditable by anyone.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-2">Packages Funded</h3>
              <p className="text-3xl font-bold">
                {statsLoading ? <span className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-16 block rounded"></span> : (statsData?.packagesFunded ?? '—')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Live data
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-2">Total Distributed</h3>
              <p className="text-3xl font-bold">
                {statsLoading ? <span className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-24 block rounded"></span> : (statsData?.totalDistributed ?? '—')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Pulled from API
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-2">Recipients Reached</h3>
              <p className="text-3xl font-bold">
                {statsLoading ? <span className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-20 block rounded"></span> : (statsData?.recipientsReached ?? '—')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Verified claims
              </p>
            </div>
          </div>

          {/* Package list */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Aid Packages</h2>
              <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                Live Data
              </span>
            </div>

            {packagesLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded"></div>
              </div>
            ) : packages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No packages found.</div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800 text-left">
                        {[
                          'ID',
                          'Title',
                          'Region',
                          'Amount',
                          'Recipients',
                          'Status',
                        ].map(h => (
                          <th
                            key={h}
                            className="pb-3 pr-6 font-medium text-gray-400 dark:text-gray-500 text-xs uppercase tracking-widest"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
                      {packages.map(pkg => (
                        <tr
                          key={pkg.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                        >
                          <td className="py-4 pr-6 font-mono text-xs text-gray-400">
                            {pkg.id}
                          </td>
                          <td className="py-4 pr-6 font-medium">{pkg.title || pkg.name}</td>
                          <td className="py-4 pr-6 text-gray-600 dark:text-gray-400">
                            {pkg.region || '—'}
                          </td>
                          <td className="py-4 pr-6 font-semibold">{pkg.amount || '—'}</td>
                          <td className="py-4 pr-6 text-gray-600 dark:text-gray-400">
                            {pkg.recipients || 0}
                          </td>
                          <td className="py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS[pkg.status] || STATUS.Pending}`}
                            >
                              {pkg.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {packages.map(pkg => (
                    <div
                      key={pkg.id}
                      className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-sm leading-snug">
                          {pkg.title || pkg.name}
                        </p>
                        <span
                          className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS[pkg.status] || STATUS.Pending}`}
                        >
                          {pkg.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {pkg.region || '—'}
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span className="font-semibold">{pkg.amount || '—'}</span>
                        <span className="text-gray-500">
                          {pkg.recipients || 0} recipients
                        </span>
                      </div>
                      <p className="text-xs font-mono text-gray-400">{pkg.id}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Pagination Controls */}
            {meta && (
              <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {meta.page} of {meta.totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                  disabled={page === meta.totalPages}
                  className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Notified
            </button>
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
