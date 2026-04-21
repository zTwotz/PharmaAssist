'use client';

import React from 'react';

interface ReportFiltersProps {
  startDate: string;
  endDate: string;
  status: string;
  onFilterChange: (key: string, value: string) => void;
  onApply: () => void;
}

export default function ReportFilters({
  startDate,
  endDate,
  status,
  onFilterChange,
  onApply
}: ReportFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap items-end gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onFilterChange('startDate', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#024ad8] focus:border-[#024ad8]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onFilterChange('endDate', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#024ad8] focus:border-[#024ad8]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Order Status
        </label>
        <select
          value={status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#024ad8] focus:border-[#024ad8]"
        >
          <option value="">All Statuses</option>
          <option value="PAID">PAID</option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
      </div>

      <button
        onClick={onApply}
        className="px-4 py-2 bg-[#024ad8] text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:ring-offset-2 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}
