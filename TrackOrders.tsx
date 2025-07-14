import React, { useState } from 'react'
import { Search, Truck, Package, MapPin, Clock, CheckCircle } from 'lucide-react'

const TrackOrders: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = () => {
    // Mock search results
    if (trackingNumber) {
      setSearchResults([
        {
          id: 1,
          trackingNumber: trackingNumber,
          orderNumber: "ORD-2024-001",
          productTitle: "Stainless Steel 304 Coils - 25 tons",
          status: "in-transit",
          origin: "Chennai, India",
          destination: "Mumbai, India",
          carrier: "Blue Dart Express",
          estimatedDelivery: "2024-02-15",
          currentLocation: "Hyderabad, India",
          timeline: [
            { date: "2024-02-10", status: "Order Confirmed", location: "Chennai" },
            { date: "2024-02-12", status: "Picked up by carrier", location: "Chennai" },
            { date: "2024-02-13", status: "In transit", location: "Hyderabad" },
            { date: "2024-02-15", status: "Out for delivery", location: "Mumbai" }
          ]
        }
      ])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Track Orders</h1>
            <p className="text-gray-600 mt-2">Track your orders and shipments in real-time</p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-lg border border-gray-200 p-6">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter tracking number or order number..."
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="btn btn-primary"
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            {searchResults.map((order) => (
              <div key={order.id} className="card">
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{order.productTitle}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Tracking: {order.trackingNumber}</span>
                      <span>•</span>
                      <span>Order: {order.orderNumber}</span>
                      <span>•</span>
                      <span>Carrier: {order.carrier}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Current Status</p>
                      <p className="text-lg font-semibold text-blue-600">{order.status}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Current Location</p>
                      <p className="text-lg font-semibold text-gray-900">{order.currentLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Estimated Delivery</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Timeline</h3>
                    <div className="space-y-4">
                      {order.timeline.map((event, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{event.status}</p>
                            <p className="text-sm text-gray-600">{event.location}</p>
                            <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && trackingNumber === '' && (
          <div className="text-center">
            <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Track Your Orders</h3>
            <p className="text-gray-600">Enter a tracking number or order number to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrackOrders 