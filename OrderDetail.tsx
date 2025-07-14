import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, MessageSquare, X } from 'lucide-react';

const mockOrder = {
  id: 'SO-1001',
  product: 'Prime Hot Rolled Steel Coil',
  buyer: 'SteelBuyer1',
  quantity: 10,
  unit: 'MT',
  price: 52000,
  status: 'Confirmed',
  orderDate: '2025-07-10',
  deliveryDate: '2025-07-20',
  warehouse: 'Mumbai',
};

const OrderDetail: React.FC = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(mockOrder.status);
  const [success, setSuccess] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState<{action: string, nextStatus: string} | null>(null);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleAction = (newStatus: string) => {
    setStatus(newStatus);
    setSuccess(`Order marked as ${newStatus}`);
    setTimeout(() => setSuccess(''), 2000);
    setShowConfirmModal(null);
  };

  const openConfirmModal = (action: string, nextStatus: string) => {
    setShowConfirmModal({action, nextStatus});
  };

  const handleSendMessage = () => {
    setMessageSent(true);
    setTimeout(() => {
      setShowContactModal(false);
      setMessageSent(false);
      setMessage('');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white border rounded p-6 mb-4">
        <div className="mb-2 text-gray-600">Order ID: <span className="font-semibold text-gray-900">{id}</span></div>
        <div className="mb-2">Product: <span className="font-semibold">{mockOrder.product}</span></div>
        <div className="mb-2">Buyer: <span className="font-semibold">{mockOrder.buyer}</span></div>
        <div className="mb-2">Quantity: <span className="font-semibold">{mockOrder.quantity} {mockOrder.unit}</span></div>
        <div className="mb-2">Price: <span className="font-semibold">₹{mockOrder.price.toLocaleString()}</span></div>
        <div className="mb-2">Warehouse: <span className="font-semibold">{mockOrder.warehouse}</span></div>
        <div className="mb-2">Order Date: <span className="font-semibold">{mockOrder.orderDate}</span></div>
        <div className="mb-2">Delivery Date: <span className="font-semibold">{mockOrder.deliveryDate}</span></div>
        <div className="mb-2">Status: <span className="font-semibold text-blue-700">{status}</span></div>
      </div>
      {success && <div className="bg-green-50 border border-green-200 rounded p-3 mb-4 text-green-700">{success}</div>}
      <div className="flex flex-wrap gap-3 mb-4">
        {status === 'Pending' && (
          <button className="btn btn-primary" onClick={() => openConfirmModal('Confirm Order', 'Confirmed')}><CheckCircle className="w-4 h-4 mr-2" />Confirm Order</button>
        )}
        {status === 'Confirmed' && (
          <button className="btn btn-primary" onClick={() => openConfirmModal('Start Processing', 'Processing')}><Package className="w-4 h-4 mr-2" />Start Processing</button>
        )}
        {status === 'Processing' && (
          <button className="btn btn-primary" onClick={() => openConfirmModal('Mark Shipped', 'Shipped')}><Truck className="w-4 h-4 mr-2" />Mark Shipped</button>
        )}
        {status === 'Shipped' && (
          <button className="btn btn-success" onClick={() => openConfirmModal('Mark Delivered', 'Delivered')}><CheckCircle className="w-4 h-4 mr-2" />Mark Delivered</button>
        )}
        <button className="btn btn-secondary" onClick={() => setShowContactModal(true)}><MessageSquare className="w-4 h-4 mr-2" />Contact Buyer</button>
      </div>

      {/* Contact Buyer Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Contact Buyer</h2>
              <button onClick={() => setShowContactModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="mb-4">
              <textarea
                className="form-textarea w-full"
                rows={4}
                placeholder="Type your message to the buyer..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={messageSent}
              />
            </div>
            {messageSent ? (
              <div className="text-green-600 text-center font-medium mb-2">Message sent!</div>
            ) : null}
            <div className="flex justify-end space-x-2">
              <button className="btn btn-secondary" onClick={() => setShowContactModal(false)} disabled={messageSent}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSendMessage} disabled={!message || messageSent}>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Status Actions */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{showConfirmModal.action}</h2>
              <button onClick={() => setShowConfirmModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="mb-4 text-gray-700">Are you sure you want to <span className="font-semibold">{showConfirmModal.action.toLowerCase()}</span> this order?</div>
            <div className="flex justify-end space-x-2">
              <button className="btn btn-secondary" onClick={() => setShowConfirmModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => handleAction(showConfirmModal.nextStatus)}>Yes, {showConfirmModal.action}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail; 