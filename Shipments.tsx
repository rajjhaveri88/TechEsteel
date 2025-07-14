import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Eye,
  MessageSquare,
  Download,
  X
} from 'lucide-react'

const Shipments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'in-transit' | 'delivered' | 'delayed'>('all')
  const [showContactModal, setShowContactModal] = useState<{carrier: string, tracking: string} | null>(null)
  const [showScheduleModal, setShowScheduleModal] = useState<{tracking: string, current: string} | null>(null)
  const [showLabelModal, setShowLabelModal] = useState<{tracking: string} | null>(null)
  const [showTrackLiveModal, setShowTrackLiveModal] = useState<{tracking: string} | null>(null)
  const [message, setMessage] = useState('')
  const [messageSent, setMessageSent] = useState(false)
  const [newSchedule, setNewSchedule] = useState('')
  const [scheduleUpdated, setScheduleUpdated] = useState(false)

  // Mock data for shipments
  const shipments = [
    {
      id: 1,
      trackingNumber: "TRK-2024-001",
      orderNumber: "ORD-2024-001",
      customer: "ABC Manufacturing Co.",
      productTitle: "Stainless Steel 304 Coils - 25 tons",
      status: "delivered",
      origin: "Chennai, India",
      destination: "Mumbai, India",
      carrier: "Blue Dart Express",
      scheduledDate: "2024-02-10",
      actualDate: "2024-02-10",
      estimatedDelivery: "2024-02-15",
      actualDelivery: "2024-02-12"
    },
    {
      id: 2,
      trackingNumber: "TRK-2024-002",
      orderNumber: "ORD-2024-002",
      customer: "XYZ Steel Works",
      productTitle: "Carbon Steel Sheets - 10 tons",
      status: "in-transit",
      origin: "Mumbai, India",
      destination: "Delhi, India",
      carrier: "DTDC Express",
      scheduledDate: "2024-02-15",
      actualDate: "2024-02-15",
      estimatedDelivery: "2024-02-20",
      actualDelivery: null
    },
    {
      id: 3,
      trackingNumber: "TRK-2024-003",
      orderNumber: "ORD-2024-003",
      customer: "DEF Construction Ltd",
      productTitle: "Structural Steel Beams - 50 tons",
      status: "scheduled",
      origin: "Delhi, India",
      destination: "Bangalore, India",
      carrier: "FedEx Express",
      scheduledDate: "2024-03-01",
      actualDate: null,
      estimatedDelivery: "2024-03-05",
      actualDelivery: null
    },
    {
      id: 4,
      trackingNumber: "TRK-2024-004",
      orderNumber: "ORD-2024-004",
      customer: "GHI Engineering",
      productTitle: "Tool Steel Round Bars - 5 tons",
      status: "delayed",
      origin: "Bangalore, India",
      destination: "Pune, India",
      carrier: "Aramex",
      scheduledDate: "2024-02-20",
      actualDate: "2024-02-22",
      estimatedDelivery: "2024-02-25",
      actualDelivery: null
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <span className="status-badge status-pending">Scheduled</span>
      case 'in-transit':
        return <span className="status-badge status-auction">In Transit</span>
      case 'delivered':
        return <span className="status-badge status-success">Delivered</span>
      case 'delayed':
        return <span className="status-badge status-danger">Delayed</span>
      default:
        return <span className="status-badge status-inactive">Unknown</span>
    }
  }

  const filteredShipments = activeTab === 'all' ? shipments : shipments.filter(s => s.status === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shipments</h1>
              <p className="text-gray-600 mt-2">Track and manage your shipments</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Shipments</p>
                  <p className="text-2xl font-bold text-gray-900">{shipments.length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Transit</p>
                  <p className="text-2xl font-bold text-gray-900">{shipments.filter(s => s.status === 'in-transit').length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900">{shipments.filter(s => s.status === 'delivered').length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Delayed</p>
                  <p className="text-2xl font-bold text-gray-900">{shipments.filter(s => s.status === 'delayed').length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white shadow-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'all', name: 'All Shipments', count: shipments.length },
                  { id: 'scheduled', name: 'Scheduled', count: shipments.filter(s => s.status === 'scheduled').length },
                  { id: 'in-transit', name: 'In Transit', count: shipments.filter(s => s.status === 'in-transit').length },
                  { id: 'delivered', name: 'Delivered', count: shipments.filter(s => s.status === 'delivered').length },
                  { id: 'delayed', name: 'Delayed', count: shipments.filter(s => s.status === 'delayed').length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`tab-button ${activeTab === tab.id ? 'tab-button-active' : ''}`}
                  >
                    {tab.name}
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Shipments List */}
        <div className="space-y-4">
          {filteredShipments.length === 0 ? (
            <div className="card p-12 text-center">
              <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} shipments</h3>
              <p className="text-gray-600 mb-6">You don't have any {activeTab} shipments at the moment.</p>
            </div>
          ) : (
            filteredShipments.map((shipment) => (
              <div key={shipment.id} className="card hover-lift">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{shipment.productTitle}</h3>
                        {getStatusBadge(shipment.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span>Tracking: {shipment.trackingNumber}</span>
                        <span>•</span>
                        <span>Order: {shipment.orderNumber}</span>
                        <span>•</span>
                        <span>Carrier: {shipment.carrier}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {shipment.origin} → {shipment.destination}
                        </span>
                        <span>•</span>
                        <span>Customer: {shipment.customer}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Scheduled Date</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(shipment.scheduledDate).toLocaleDateString()}
                      </p>
                      {shipment.actualDate && (
                        <p className="text-sm text-gray-500">
                          Shipped: {new Date(shipment.actualDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Estimated Delivery</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                      </p>
                      {shipment.actualDelivery && (
                        <p className="text-sm text-green-600 font-medium">
                          Delivered: {new Date(shipment.actualDelivery).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
                      <div className="flex items-center">
                        {getStatusBadge(shipment.status)}
                      </div>
                      {shipment.status === 'delayed' && (
                        <p className="text-sm text-red-600 mt-1">2 days behind schedule</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/shipments/${shipment.trackingNumber}`}
                        className="btn btn-secondary"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Track Details
                      </Link>
                      <button className="btn btn-secondary" onClick={() => setShowLabelModal({tracking: shipment.trackingNumber})}>
                        <Download className="w-4 h-4 mr-2" />
                        Shipping Label
                      </button>
                      <button className="btn btn-secondary" onClick={() => setShowContactModal({carrier: shipment.carrier, tracking: shipment.trackingNumber})}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Carrier
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="btn btn-secondary" onClick={() => setShowScheduleModal({tracking: shipment.trackingNumber, current: shipment.scheduledDate})}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Update Schedule
                      </button>
                      <button className="btn btn-primary" onClick={() => setShowTrackLiveModal({tracking: shipment.trackingNumber})}>
                        <Truck className="w-4 h-4 mr-2" />
                        Track Live
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Contact Carrier Modal */}
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Contact Carrier ({showContactModal.carrier})</h2>
                <button onClick={() => setShowContactModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4">
                <textarea
                  className="form-textarea w-full"
                  rows={4}
                  placeholder={`Type your message to ${showContactModal.carrier}...`}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  disabled={messageSent}
                />
              </div>
              {messageSent ? (
                <div className="text-green-600 text-center font-medium mb-2">Message sent!</div>
              ) : null}
              <div className="flex justify-end space-x-2">
                <button className="btn btn-secondary" onClick={() => setShowContactModal(null)} disabled={messageSent}>Cancel</button>
                <button className="btn btn-primary" onClick={() => { setMessageSent(true); setTimeout(() => { setShowContactModal(null); setMessageSent(false); setMessage(''); }, 1500); }} disabled={!message || messageSent}>Send</button>
              </div>
            </div>
          </div>
        )}
        {/* Update Schedule Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Update Schedule</h2>
                <button onClick={() => setShowScheduleModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4 text-gray-700">Current Scheduled Date: <span className="font-semibold">{showScheduleModal.current}</span></div>
              <input
                type="date"
                className="form-input w-full mb-4"
                value={newSchedule}
                onChange={e => setNewSchedule(e.target.value)}
                disabled={scheduleUpdated}
              />
              {scheduleUpdated ? (
                <div className="text-green-600 text-center font-medium mb-2">Schedule updated!</div>
              ) : null}
              <div className="flex justify-end space-x-2">
                <button className="btn btn-secondary" onClick={() => setShowScheduleModal(null)} disabled={scheduleUpdated}>Cancel</button>
                <button className="btn btn-primary" onClick={() => { setScheduleUpdated(true); setTimeout(() => { setShowScheduleModal(null); setScheduleUpdated(false); setNewSchedule(''); }, 1500); }} disabled={!newSchedule || scheduleUpdated}>Update</button>
              </div>
            </div>
          </div>
        )}
        {/* Shipping Label Modal */}
        {showLabelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Shipping Label</h2>
                <button onClick={() => setShowLabelModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4 text-gray-700">Download the shipping label for tracking <span className="font-semibold">{showLabelModal.tracking}</span>.</div>
              <div className="flex justify-end">
                <a href="#" download className="btn btn-primary">Download PDF</a>
              </div>
            </div>
          </div>
        )}
        {/* Track Live Modal */}
        {showTrackLiveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Live Tracking</h2>
                <button onClick={() => setShowTrackLiveModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4 text-gray-700">Live tracking for shipment <span className="font-semibold">{showTrackLiveModal.tracking}</span> (mock map below):</div>
              <div className="bg-gray-100 rounded h-48 flex items-center justify-center text-gray-400">[Live Map Placeholder]</div>
              <div className="flex justify-end mt-4">
                <button className="btn btn-secondary" onClick={() => setShowTrackLiveModal(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Shipments 