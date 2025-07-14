import React, { useState } from 'react'
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Calendar, User } from 'lucide-react'

const Reviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'received' | 'given'>('received')

  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      type: 'received',
      productTitle: "Stainless Steel 304 Coils - 25 tons",
      customer: "ABC Manufacturing Co.",
      rating: 5,
      review: "Excellent quality and timely delivery. The steel met all our specifications and the supplier was very professional throughout the process.",
      date: "2024-02-10",
      helpful: 3,
      response: "Thank you for your business! We're glad to hear you're satisfied with the quality and service."
    },
    {
      id: 2,
      type: 'received',
      productTitle: "Carbon Steel Sheets - 10 tons",
      customer: "XYZ Steel Works",
      rating: 4,
      review: "Good quality steel, delivery was slightly delayed but communication was excellent. Would recommend.",
      date: "2024-02-08",
      helpful: 1,
      response: null
    },
    {
      id: 3,
      type: 'given',
      productTitle: "Tool Steel Round Bars - 5 tons",
      supplier: "Bharat Forge",
      rating: 4,
      review: "Good quality, slightly delayed delivery but overall satisfied with the product.",
      date: "2024-02-15",
      helpful: 2,
      response: null
    }
  ]

  const filteredReviews = reviews.filter(r => r.type === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
              <p className="text-gray-600 mt-2">Manage your reviews and ratings</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.3/5</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <ThumbsUp className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Helpful Votes</p>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white shadow-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'received', name: 'Reviews Received', count: reviews.filter(r => r.type === 'received').length },
                  { id: 'given', name: 'Reviews Given', count: reviews.filter(r => r.type === 'given').length }
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

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="card p-12 text-center">
              <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} reviews</h3>
              <p className="text-gray-600 mb-6">You don't have any {activeTab} reviews at the moment.</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="card hover-lift">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.productTitle}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {activeTab === 'received' ? review.customer : review.supplier}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-gray-600">({review.rating}/5)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700">{review.review}</p>
                  </div>

                  {review.response && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">Your Response:</p>
                      <p className="text-sm text-blue-700">{review.response}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600">
                        <ThumbsDown className="w-4 h-4" />
                        <span>Not Helpful</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {activeTab === 'received' && !review.response && (
                        <button className="btn btn-primary">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Respond
                        </button>
                      )}
                      <button className="btn btn-secondary">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact
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

export default Reviews 