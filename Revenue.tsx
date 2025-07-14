import React, { useState } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import Toast from '../../components/Toast';
import { formatCurrencyINR } from '../../utils/formatCurrencyINR';
import { BarChart3 } from 'lucide-react';

const mockRevenueData = [
  { month: 'Jan', revenue: 200000 },
  { month: 'Feb', revenue: 220000 },
  { month: 'Mar', revenue: 250000 },
  { month: 'Apr', revenue: 230000 },
  { month: 'May', revenue: 270000 },
  { month: 'Jun', revenue: 240000 },
];

const mockBreakdown = [
  { source: 'Auctions', amount: 800000 },
  { source: 'Marketplace', amount: 600000 },
  { source: 'Direct Sales', amount: 400000 },
];

const Revenue: React.FC = () => {
  const [range, setRange] = useState('6m');
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({ open: false, message: '', type: 'success' });
  const [exportModal, setExportModal] = useState(false);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRange(e.target.value);
    setToast({ open: true, message: 'Date range updated.', type: 'success' });
  };

  const handleExport = () => {
    setExportModal(true);
  };

  const confirmExport = () => {
    setExportModal(false);
    setToast({ open: true, message: 'Data exported successfully.', type: 'success' });
    // Simulate export logic here
  };

  const cancelExport = () => setExportModal(false);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Revenue Analytics</h1>
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-gray-600">Date Range:</span>
        <select value={range} onChange={handleRangeChange} className="border rounded px-2 py-1">
          <option value="1m">Last Month</option>
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="1y">Last Year</option>
        </select>
        <button onClick={handleExport} className="btn btn-secondary ml-4">
          Export Data
        </button>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-green-700">{formatCurrencyINR(2400000)}</div>
          <BarChart3 className="mt-2 text-green-500" />
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <div className="text-sm text-gray-600 mb-1">Revenue Growth</div>
          <div className="text-2xl font-bold text-blue-700">+12.5%</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <div className="text-sm text-gray-600 mb-1">Top Source</div>
          <div className="text-2xl font-bold text-yellow-700">Auctions</div>
        </div>
      </div>
      {/* Trend Chart (mock) */}
      <div className="bg-white border rounded p-4 mb-8">
        <div className="font-semibold mb-2">Revenue Trend (Mock Chart)</div>
        <div className="flex items-end h-32 space-x-2">
          {mockRevenueData.map((d, i) => (
            <div key={d.month} className="flex flex-col items-center flex-1">
              <div className="w-8 bg-green-400 rounded-t" style={{ height: `${d.revenue / 4000}px` }}></div>
              <span className="text-xs mt-1">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Breakdown Table */}
      <div className="bg-white border rounded p-4">
        <div className="font-semibold mb-2">Revenue Breakdown</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-1">Source</th>
              <th className="py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockBreakdown.map((row) => (
              <tr key={row.source}>
                <td className="py-1">{row.source}</td>
                <td className="py-1">{formatCurrencyINR(row.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={exportModal}
        title="Export Data"
        description="Export the current revenue analytics data as a CSV file?"
        confirmText="Export"
        cancelText="Cancel"
        onConfirm={confirmExport}
        onCancel={cancelExport}
      />
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
};

export default Revenue; 