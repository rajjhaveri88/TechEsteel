import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Calendar,
  MapPin,
  Star,
  Eye,
  Download,
  MessageSquare,
  Award,
  X
} from 'lucide-react'

const MyPurchases: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'shipped' | 'delivered' | 'completed'>('all')
  const [showInvoiceModal, setShowInvoiceModal] = useState<{invoice: string, order: string} | null>(null)
  const [showReviewModal, setShowReviewModal] = useState<{order: string, product: string} | null>(null)
  const [showContactModal, setShowContactModal] = useState<{supplier: string, order: string} | null>(null)
  const [showReportModal, setShowReportModal] = useState<{order: string, product: string} | null>(null)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [message, setMessage] = useState('')
  const [messageSent, setMessageSent] = useState(false)
  const [issueText, setIssueText] = useState('')
  const [issueSubmitted, setIssueSubmitted] = useState(false)

  // Mock data for purchases
  const purchases = [
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      productTitle: "Stainless Steel 304 Coils - 25 tons",
      supplier: "Jindal Stainless",
      quantity: "25 tons",
      price: "$55,000",
      status: "delivered",
      orderDate: "2024-01-15",
      deliveryDate: "2024-02-10",
      location: "Chennai, India",
      rating: 5,
      review: "Excellent quality and timely delivery",
      invoice: "INV-2024-001.pdf"
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      productTitle: "Carbon Steel Sheets - 10 tons",
      supplier: "Tata Steel Ltd",
      quantity: "10 tons",
      price: "$8,500",
      status: "shipped",
      orderDate: "2024-02-01",
      deliveryDate: "2024-02-20",
      location: "Mumbai, India",
      rating: null,
      review: null,
      invoice: "INV-2024-002.pdf"
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      productTitle: "Structural Steel Beams - 50 tons",
      supplier: "SAIL",
      quantity: "50 tons",
      price: "$37,500",
      status: "pending",
      orderDate: "2024-02-05",
      deliveryDate: "2024-03-05",
      location: "Delhi, India",
      rating: null,
      review: null,
      invoice: null
    },
    {
      id: 4,
      orderNumber: "ORD-2024-004",
      productTitle: "Tool Steel Round Bars - 5 tons",
      supplier: "Bharat Forge",
      quantity: "5 tons",
      price: "$17,500",
      status: "completed",
      orderDate: "2024-01-20",
      deliveryDate: "2024-02-15",
      location: "Bangalore, India",
      rating: 4,
      review: "Good quality, slightly delayed delivery",
      invoice: "INV-2024-004.pdf"
    },
    {
      id: 5,
      orderNumber: "ORD-2024-005",
      productTitle: "Alloy Steel Plates - 15 tons",
      supplier: "Essar Steel",
      quantity: "15 tons",
      price: "$18,000",
      status: "completed",
      orderDate: "2024-01-10",
      deliveryDate: "2024-02-01",
      location: "Pune, India",
      rating: 5,
      review: "Perfect quality and service",
      invoice: "INV-2024-005.pdf"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge status-pending">Pending</span>
      case 'shipped':
        return <span className="status-badge status-auction">Shipped</span>
      case 'delivered':
        return <span className="status-badge status-active">Delivered</span>
      case 'completed':
        return <span className="status-badge status-success">Completed</span>
      default:
        return <span className="status-badge status-inactive">Unknown</span>
    }
  }

  const filteredPurchases = activeTab === 'all' ? purchases : purchases.filter(p => p.status === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Purchases</h1>
              <p className="text-gray-600 mt-2">Track your purchase history and order status</p>
            </div>
            <Link
              to="/marketplace"
              className="btn btn-primary"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Browse Marketplace
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{purchases.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{purchases.filter(p => p.status === 'pending').length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{purchases.filter(p => p.status === 'shipped').length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">$136.5K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white shadow-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'all', name: 'All Orders', count: purchases.length },
                  { id: 'pending', name: 'Pending', count: purchases.filter(p => p.status === 'pending').length },
                  { id: 'shipped', name: 'Shipped', count: purchases.filter(p => p.status === 'shipped').length },
                  { id: 'delivered', name: 'Delivered', count: purchases.filter(p => p.status === 'delivered').length },
                  { id: 'completed', name: 'Completed', count: purchases.filter(p => p.status === 'completed').length }
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

        {/* Purchases List */}
        <div className="space-y-4">
          {filteredPurchases.length === 0 ? (
            <div className="card p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} purchases</h3>
              <p className="text-gray-600 mb-6">You don't have any {activeTab} purchases at the moment.</p>
              <Link to="/marketplace" className="btn btn-primary">
                Browse Marketplace
              </Link>
            </div>
          ) : (
            filteredPurchases.map((purchase) => (
              <div key={purchase.id} className="card hover-lift">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{purchase.productTitle}</h3>
                        {getStatusBadge(purchase.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span>Order: {purchase.orderNumber}</span>
                        <span>•</span>
                        <span>{purchase.supplier}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {purchase.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Ordered: {new Date(purchase.orderDate).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Truck className="w-4 h-4 mr-1" />
                          Expected: {new Date(purchase.deliveryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Quantity</p>
                      <p className="text-xl font-bold text-gray-900">{purchase.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Price</p>
                      <p className="text-xl font-bold text-blue-600">{purchase.price}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Rating</p>
                      <div className="flex items-center">
                        {purchase.rating ? (
                          <>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < purchase.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">({purchase.rating}/5)</span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">Not rated yet</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {purchase.review && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 italic">"{purchase.review}"</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/orders/${purchase.orderNumber}`}
                        className="btn btn-secondary"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Order
                      </Link>
                      {purchase.invoice && (
                        <button className="btn btn-secondary" onClick={() => setShowInvoiceModal({invoice: purchase.invoice, order: purchase.orderNumber})}>
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </button>
                      )}
                      {purchase.status === 'delivered' && !purchase.rating && (
                        <button className="btn btn-primary" onClick={() => setShowReviewModal({order: purchase.orderNumber, product: purchase.productTitle})}>
                          <Star className="w-4 h-4 mr-2" />
                          Rate & Review
                        </button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="btn btn-secondary" onClick={() => setShowContactModal({supplier: purchase.supplier, order: purchase.orderNumber})}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Supplier
                      </button>
                      <button className="btn btn-secondary" onClick={() => setShowReportModal({order: purchase.orderNumber, product: purchase.productTitle})}>
                        <Award className="w-4 h-4 mr-2" />
                        Report Issue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Download Invoice Modal */}
        {showInvoiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Invoice for Order {showInvoiceModal.order}</h2>
                <button onClick={() => setShowInvoiceModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4 text-gray-700">Download or preview the invoice <span className="font-semibold">{showInvoiceModal.invoice}</span>.</div>
              <div className="flex justify-end space-x-2">
                <a href={`/${showInvoiceModal.invoice}`} download className="btn btn-primary">Download PDF</a>
                <a href={`/${showInvoiceModal.invoice}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Preview</a>
              </div>
            </div>
          </div>
        )}
        {/* Rate & Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Rate & Review</h2>
                <button onClick={() => setShowReviewModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4 text-gray-700">How would you rate your purchase of <span className="font-semibold">{showReviewModal.product}</span>?</div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 cursor-pointer ${i < reviewRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    onClick={() => setReviewRating(i + 1)}
                  />
                ))}
                <span className="ml-2 text-lg text-gray-700">{reviewRating}/5</span>
              </div>
              <textarea
                className="form-textarea w-full mb-4"
                rows={3}
                placeholder="Write your review..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                disabled={reviewSubmitted}
              />
              {reviewSubmitted ? (
                <div className="text-green-600 text-center font-medium mb-2">Review submitted!</div>
              ) : null}
              <div className="flex justify-end space-x-2">
                <button className="btn btn-secondary" onClick={() => setShowReviewModal(null)} disabled={reviewSubmitted}>Cancel</button>
                <button className="btn btn-primary" onClick={() => { setReviewSubmitted(true); setTimeout(() => { setShowReviewModal(null); setReviewSubmitted(false); setReviewRating(0); setReviewText(''); }, 1500); }} disabled={!reviewRating || !reviewText || reviewSubmitted}>Submit</button>
              </div>
            </div>
          </div>
        )}
        {/* Contact Supplier Modal */}
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Contact Supplier ({showContactModal.supplier})</h2>
                <button onClick={() => setShowContactModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4">
                <textarea
                  className="form-textarea w-full"
                  rows={4}
                  placeholder={`Type your message to ${showContactModal.supplier}...`}
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
        {/* Report Issue Modal */}
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Report Issue</h2>
                <button onClick={() => setShowReportModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4 text-gray-700">Describe the issue with your purchase of <span className="font-semibold">{showReportModal.product}</span> (Order {showReportModal.order}):</div>
              <textarea
                className="form-textarea w-full mb-4"
                rows={4}
                placeholder="Describe the issue..."
                value={issueText}
                onChange={e => setIssueText(e.target.value)}
                disabled={issueSubmitted}
              />
              {issueSubmitted ? (
                <div className="text-green-600 text-center font-medium mb-2">Issue reported!</div>
              ) : null}
              <div className="flex justify-end space-x-2">
                <button className="btn btn-secondary" onClick={() => setShowReportModal(null)} disabled={issueSubmitted}>Cancel</button>
                <button className="btn btn-primary" onClick={() => { setIssueSubmitted(true); setTimeout(() => { setShowReportModal(null); setIssueSubmitted(false); setIssueText(''); }, 1500); }} disabled={!issueText || issueSubmitted}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyPurchases 