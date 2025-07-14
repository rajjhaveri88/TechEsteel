import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Calendar,
  MapPin,
  Eye,
  Download,
  MessageSquare,
  AlertCircle,
  Plus
} from 'lucide-react'

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered'>('all')

  // Mock data for orders
  const salesOrders = [
    {
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
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'SO-1002',
      product: 'Galvanized Steel Sheet',
      buyer: 'SteelBuyer2',
      quantity: 5,
      unit: 'MT',
      price: 43000,
      status: 'Shipped',
      orderDate: '2025-07-12',
      deliveryDate: '2025-07-22',
      warehouse: 'Chennai',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'SO-1003',
      product: 'Cold Rolled Steel Coil',
      buyer: 'SteelBuyer3',
      quantity: 8,
      unit: 'MT',
      price: 61000,
      status: 'Pending',
      orderDate: '2025-07-14',
      deliveryDate: '2025-07-24',
      warehouse: 'Delhi',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge status-pending">Pending</span>
      case 'confirmed':
        return <span className="status-badge status-auction">Confirmed</span>
      case 'processing':
        return <span className="status-badge status-warning">Processing</span>
      case 'shipped':
        return <span className="status-badge status-auction">Shipped</span>
      case 'delivered':
        return <span className="status-badge status-success">Delivered</span>
      default:
        return <span className="status-badge status-inactive">Unknown</span>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Paid</span>
      case 'pending':
        return <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
      default:
        return <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  const filteredOrders = activeTab === 'all' ? salesOrders : salesOrders.filter(o => o.status === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">My Sales Orders</h1>
              <p className="text-gray-600 mb-6">These are orders placed by buyers for your steel products.</p>
            </div>
            <Link
              to="/orders/new"
              className="btn btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Order
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{salesOrders.length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{salesOrders.filter(o => o.status === 'pending').length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Transit</p>
                  <p className="text-2xl font-bold text-gray-900">{salesOrders.filter(o => o.status === 'shipped').length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$136K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white shadow-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'all', name: 'All Orders', count: salesOrders.length },
                  { id: 'pending', name: 'Pending', count: salesOrders.filter(o => o.status === 'pending').length },
                  { id: 'confirmed', name: 'Confirmed', count: salesOrders.filter(o => o.status === 'confirmed').length },
                  { id: 'processing', name: 'Processing', count: salesOrders.filter(o => o.status === 'processing').length },
                  { id: 'shipped', name: 'Shipped', count: salesOrders.filter(o => o.status === 'shipped').length },
                  { id: 'delivered', name: 'Delivered', count: salesOrders.filter(o => o.status === 'delivered').length }
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

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="card p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} orders</h3>
              <p className="text-gray-600 mb-6">You don't have any {activeTab} orders at the moment.</p>
              <Link to="/orders/new" className="btn btn-primary">
                Create Order
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="card hover-lift">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{order.product}</h3>
                        {getStatusBadge(order.status)}
                        {getPaymentStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span>Order: {order.id}</span>
                        <span>•</span>
                        <span>Buyer: {order.buyer}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {order.warehouse}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Ordered: {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Truck className="w-4 h-4 mr-1" />
                          Expected: {new Date(order.deliveryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Quantity</p>
                      <p className="text-xl font-bold text-gray-900">{order.quantity} {order.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Price</p>
                      <p className="text-xl font-bold text-blue-600">₹{order.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Payment</p>
                      <div className="flex items-center">
                        {getPaymentStatusBadge(order.status)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/orders/${order.id}`}
                        className="btn btn-secondary"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                      {/* Assuming invoice is not applicable for sales orders in this context */}
                      {/* {order.invoice && (
                        <button className="btn btn-secondary">
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </button>
                      )} */}
                      <button className="btn btn-secondary">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Buyer
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {order.status === 'pending' && (
                        <button className="btn btn-primary">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirm Order
                        </button>
                      )}
                      {order.status === 'confirmed' && (
                        <button className="btn btn-primary">
                          <Package className="w-4 h-4 mr-2" />
                          Start Processing
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button className="btn btn-primary">
                          <Truck className="w-4 h-4 mr-2" />
                          Mark Shipped
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button className="btn btn-success">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Delivered
                        </button>
                      )}
                      <button className="btn btn-secondary">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders 