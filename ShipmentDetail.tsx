import React from 'react';
import { useParams } from 'react-router-dom';
import { Truck, MessageSquare, Download, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

const mockShipment = {
  trackingNumber: 'TRK-2024-001',
  orderNumber: 'ORD-2024-001',
  productTitle: 'Stainless Steel 304 Coils - 25 tons',
  customer: 'ABC Manufacturing Co.',
  status: 'Delivered',
  origin: 'Chennai, India',
  destination: 'Mumbai, India',
  carrier: 'Blue Dart Express',
  scheduledDate: '2024-02-10',
  actualDate: '2024-02-10',
  estimatedDelivery: '2024-02-15',
  actualDelivery: '2024-02-12',
};

const ShipmentDetail: React.FC = () => {
  const { trackingNumber } = useParams();
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Shipment Details</h1>
      <div className="bg-white border rounded p-6 mb-4">
        <div className="mb-2 text-gray-600">Tracking Number: <span className="font-semibold text-gray-900">{trackingNumber}</span></div>
        <div className="mb-2">Order Number: <span className="font-semibold">{mockShipment.orderNumber}</span></div>
        <div className="mb-2">Product: <span className="font-semibold">{mockShipment.productTitle}</span></div>
        <div className="mb-2">Customer: <span className="font-semibold">{mockShipment.customer}</span></div>
        <div className="mb-2">Carrier: <span className="font-semibold">{mockShipment.carrier}</span></div>
        <div className="mb-2">Origin: <span className="font-semibold">{mockShipment.origin}</span></div>
        <div className="mb-2">Destination: <span className="font-semibold">{mockShipment.destination}</span></div>
        <div className="mb-2">Scheduled Date: <span className="font-semibold">{mockShipment.scheduledDate}</span></div>
        <div className="mb-2">Estimated Delivery: <span className="font-semibold">{mockShipment.estimatedDelivery}</span></div>
        <div className="mb-2">Status: <span className="font-semibold text-blue-700">{mockShipment.status}</span></div>
      </div>
      {/* Timeline (mock) */}
      <div className="bg-gray-50 border rounded p-4 mb-4">
        <div className="font-semibold mb-2">Status Timeline</div>
        <ul className="space-y-2">
          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Scheduled: {mockShipment.scheduledDate}</li>
          <li className="flex items-center"><Truck className="w-4 h-4 text-blue-600 mr-2" /> Shipped: {mockShipment.actualDate}</li>
          <li className="flex items-center"><AlertCircle className="w-4 h-4 text-yellow-600 mr-2" /> Estimated Delivery: {mockShipment.estimatedDelivery}</li>
          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Delivered: {mockShipment.actualDelivery}</li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <button className="btn btn-primary"><Truck className="w-4 h-4 mr-2" />Track Live</button>
        <button className="btn btn-secondary"><MessageSquare className="w-4 h-4 mr-2" />Contact Carrier</button>
        <button className="btn btn-secondary"><Download className="w-4 h-4 mr-2" />Download Label</button>
      </div>
    </div>
  );
};

export default ShipmentDetail; 