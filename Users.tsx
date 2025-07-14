import React, { useState } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import Toast from '../../components/Toast';
import { BarChart3, Users as UsersIcon } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'John Doe', role: 'Buyer', activity: 'High', joined: '2023-01-15' },
  { id: 2, name: 'Jane Smith', role: 'Seller', activity: 'Medium', joined: '2023-03-22' },
  { id: 3, name: 'SteelCorp Inc.', role: 'Buyer', activity: 'Low', joined: '2023-05-10' },
];

const mockGrowth = [1000, 1100, 1200, 1234, 1300, 1400];

const Users: React.FC = () => {
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
      <h1 className="text-2xl font-bold mb-4">User Analytics</h1>
      <div className="flex justify-end mb-4">
        <button onClick={handleExport} className="btn btn-secondary">Export Data</button>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <div className="text-sm text-gray-600 mb-1">Active Users</div>
          <div className="text-2xl font-bold text-red-700">1,234</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <div className="text-sm text-gray-600 mb-1">New Users (6mo)</div>
          <div className="text-2xl font-bold text-blue-700">400</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <div className="text-sm text-gray-600 mb-1">Avg. Activity</div>
          <div className="text-2xl font-bold text-green-700">Medium</div>
        </div>
      </div>
      {/* User Growth Trend (mock chart) */}
      <div className="bg-white border rounded p-4 mb-8">
        <div className="font-semibold mb-2">User Growth Trend (Mock Chart)</div>
        <div className="flex items-end h-32 space-x-2">
          {mockGrowth.map((val, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className="w-8 bg-red-400 rounded-t" style={{ height: `${val / 20}px` }}></div>
              <span className="text-xs mt-1">{['Jan','Feb','Mar','Apr','May','Jun'][i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Users Table */}
      <div className="bg-white border rounded p-4">
        <div className="font-semibold mb-2">Active Users</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-1">ID</th>
              <th className="py-1">Name</th>
              <th className="py-1">Role</th>
              <th className="py-1">Activity</th>
              <th className="py-1">Joined</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((u) => (
              <tr key={u.id}>
                <td className="py-1">{u.id}</td>
                <td className="py-1">{u.name}</td>
                <td className="py-1">{u.role}</td>
                <td className="py-1">{u.activity}</td>
                <td className="py-1">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={exportModal}
        title="Export Data"
        description="Export the current user analytics data as a CSV file?"
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

export default Users; 