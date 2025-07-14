import React, { useState } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import Toast from '../../components/Toast';
import { formatCurrencyINR } from '../../utils/formatCurrencyINR';
import { BarChart3, Package } from 'lucide-react';

const mockListings = [
  { id: 'LIST-001', name: 'Carbon Steel Coils', type: 'Carbon', quantity: 50, price: formatCurrencyINR(850), status: 'Available' },
  { id: 'LIST-002', name: 'Stainless Steel 316L', type: 'Stainless', quantity: 25, price: formatCurrencyINR(2200), status: 'Available' },
  { id: 'LIST-003', name: 'Alloy Steel Bars', type: 'Alloy', quantity: 40, price: formatCurrencyINR(1200), status: 'Available' },
];

const mockCategories = [
  { name: 'Carbon', value: 45 },
  { name: 'Stainless', value: 28 },
  { name: 'Alloy', value: 22 },
  { name: 'Structural', value: 18 },
];

const Listings: React.FC = () => {
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({ open: false, message: '', type: 'success' });
  const [exportModal, setExportModal] = useState(false);

  const handleExport = () => setExportModal(true);
  const confirmExport = () => {
    setExportModal(false);
    setToast({ open: true, message: 'Data exported successfully.', type: 'success' });
    // Simulate export logic here
  };
  const cancelExport = () => setExportModal(false);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Steel Listings Analytics</h1>
      <div className="flex justify-end mb-4">
        <button onClick={handleExport} className="btn btn-secondary">Export Data</button>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <div className="text-sm text-gray-600 mb-1">Total Listings</div>
          <div className="text-2xl font-bold text-yellow-700">156</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <div className="text-sm text-gray-600 mb-1">Available Types</div>
          <div className="text-2xl font-bold text-blue-700">4</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <div className="text-sm text-gray-600 mb-1">Avg. Price/Ton</div>
          <div className="text-2xl font-bold text-green-700">{formatCurrencyINR(1350)}</div>
        </div>
      </div>
      {/* Category Breakdown (mock chart) */}
      <div className="bg-white border rounded p-4 mb-8">
        <div className="font-semibold mb-2">Category Breakdown (Mock Chart)</div>
        <div className="flex items-end h-32 space-x-2">
          {mockCategories.map((cat, i) => (
            <div key={cat.name} className="flex flex-col items-center flex-1">
              <div className="w-8 rounded-t" style={{ height: `${cat.value * 3}px`, background: ['#fbbf24','#60a5fa','#34d399','#a78bfa'][i] }}></div>
              <span className="text-xs mt-1">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Listings Table */}
      <div className="bg-white border rounded p-4">
        <div className="font-semibold mb-2">Listings</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-1">ID</th>
              <th className="py-1">Name</th>
              <th className="py-1">Type</th>
              <th className="py-1">Quantity (tons)</th>
              <th className="py-1">Price/Ton</th>
              <th className="py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockListings.map((l) => (
              <tr key={l.id}>
                <td className="py-1">{l.id}</td>
                <td className="py-1">{l.name}</td>
                <td className="py-1">{l.type}</td>
                <td className="py-1">{l.quantity}</td>
                <td className="py-1">{l.price}</td>
                <td className="py-1">{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={exportModal}
        title="Export Data"
        description="Export the current listings analytics data as a CSV file?"
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

export default Listings; 