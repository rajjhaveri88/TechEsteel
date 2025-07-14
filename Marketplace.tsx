import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  MapPin, 
  Package, 
  DollarSign,
  Calendar,
  Eye,
  Heart,
  Share2,
  Truck,
  Award,
  CheckCircle,
  Clock,
  TrendingUp,
  RefreshCw,
  ShoppingCart,
  X
} from 'lucide-react'
import DetailModal from '../components/DetailModal'

const Marketplace: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedSteel, setSelectedSteel] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showContactModal, setShowContactModal] = useState<any>(null)
  const [showShareModal, setShowShareModal] = useState<any>(null)
  const [showCartModal, setShowCartModal] = useState<any>(null)
  const [favoriteFeedback, setFavoriteFeedback] = useState<string | null>(null)
  const [cartQuantity, setCartQuantity] = useState(1)
  const [cartSubmitted, setCartSubmitted] = useState(false)
  const [message, setMessage] = useState('')
  const [messageSent, setMessageSent] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  const toggleFavorite = (steelId: number) => {
    setFavorites(prev => 
      prev.includes(steelId) 
        ? prev.filter(id => id !== steelId)
        : [...prev, steelId]
    )
    setFavoriteFeedback(prev => prev ? null : 'Favorite updated!')
    setTimeout(() => setFavoriteFeedback(null), 1200)
  }

  // Mock data for steel listings
  const steelListings = [
    {
      id: 1,
      title: "Premium Carbon Steel Sheets",
      grade: "AISI 1018",
      quantity: "50 tons",
      price: "$850/ton",
      location: "Mumbai, India",
      supplier: "Tata Steel Ltd",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
      status: "available",
      certifications: ["ISO 9001", "ASTM A36"],
      delivery: "2-3 weeks",
      minOrder: "5 tons"
    },
    {
      id: 2,
      title: "Stainless Steel 304 Coils",
      grade: "AISI 304",
      quantity: "25 tons",
      price: "$2,200/ton",
      location: "Chennai, India",
      supplier: "Jindal Stainless",
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
      status: "limited",
      certifications: ["ISO 14001", "ASTM A240"],
      delivery: "1-2 weeks",
      minOrder: "2 tons"
    },
    {
      id: 3,
      title: "Structural Steel Beams",
      grade: "ASTM A36",
      quantity: "100 tons",
      price: "$750/ton",
      location: "Delhi, India",
      supplier: "SAIL",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
      status: "available",
      certifications: ["ISO 9001", "ASTM A36"],
      delivery: "3-4 weeks",
      minOrder: "10 tons"
    },
    {
      id: 4,
      title: "Tool Steel Round Bars",
      grade: "AISI D2",
      quantity: "15 tons",
      price: "$3,500/ton",
      location: "Bangalore, India",
      supplier: "Bharat Forge",
      rating: 4.6,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
      status: "available",
      certifications: ["ISO 9001", "ASTM A681"],
      delivery: "2-3 weeks",
      minOrder: "1 ton"
    },
    {
      id: 5,
      title: "Alloy Steel Plates",
      grade: "AISI 4140",
      quantity: "30 tons",
      price: "$1,200/ton",
      location: "Pune, India",
      supplier: "Essar Steel",
      rating: 4.5,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
      status: "limited",
      certifications: ["ISO 9001", "ASTM A29"],
      delivery: "2-3 weeks",
      minOrder: "3 tons"
    },
    {
      id: 6,
      title: "Galvanized Steel Sheets",
      grade: "ASTM A653",
      quantity: "75 tons",
      price: "$950/ton",
      location: "Ahmedabad, India",
      supplier: "JSW Steel",
      rating: 4.8,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
      status: "available",
      certifications: ["ISO 9001", "ASTM A653"],
      delivery: "1-2 weeks",
      minOrder: "5 tons"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', count: steelListings.length },
    { id: 'carbon', name: 'Carbon Steel', count: 2 },
    { id: 'stainless', name: 'Stainless Steel', count: 1 },
    { id: 'structural', name: 'Structural Steel', count: 1 },
    { id: 'tool', name: 'Tool Steel', count: 1 },
    { id: 'alloy', name: 'Alloy Steel', count: 1 }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="status-badge status-active">Available</span>
      case 'limited':
        return <span className="status-badge status-warning">Limited Stock</span>
      case 'out':
        return <span className="status-badge status-inactive">Out of Stock</span>
      default:
        return <span className="status-badge status-inactive">Unknown</span>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Steel Marketplace</h1>
              <p className="text-gray-600 mt-2">Discover premium steel products from verified suppliers</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-white text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-white text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white shadow-lg border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search steel products..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>

              {/* Filter Button */}
              <button className="btn btn-secondary">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">{steelListings.length}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900">$1,450</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Certified Products</p>
                <p className="text-2xl font-bold text-gray-900">98%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Listings */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {steelListings.map((steel) => (
            <div key={steel.id} className="card border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              {viewMode === 'grid' ? (
                // Grid View
                <div>
                  <div className="relative">
                    <img
                      src={steel.image}
                      alt={steel.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 flex flex-col space-y-1">
                      {getStatusBadge(steel.status)}
                      <button
                        onClick={() => toggleFavorite(steel.id)}
                        className={`p-2 rounded-full transition-all duration-200 ${
                          favorites.includes(steel.id)
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-white text-gray-400 hover:text-red-500 hover:bg-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(steel.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{steel.title}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{steel.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Package className="w-4 h-4 mr-2" />
                        <span className="font-medium">Grade:</span>
                        <span className="ml-1">{steel.grade}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{steel.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Truck className="w-4 h-4 mr-2" />
                        <span>Delivery: {steel.delivery}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{steel.price}</p>
                        <p className="text-sm text-gray-500">Min Order: {steel.minOrder}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{steel.quantity}</p>
                        <p className="text-sm text-gray-500">Available</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedSteel(steel)
                          setIsModalOpen(true)
                        }}
                        className="btn btn-primary flex-1 mr-2"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                      <button
                        onClick={() => toggleFavorite(steel.id)}
                        className={`btn ${favorites.includes(steel.id) ? 'btn-danger' : 'btn-secondary'} mr-2`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(steel.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="btn btn-secondary">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // List View
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={steel.image}
                        alt={steel.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="absolute -top-1 -right-1 flex flex-col space-y-1">
                        {getStatusBadge(steel.status)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{steel.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {steel.grade}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                              Steel
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{steel.supplier}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{steel.quantity}</span>
                            <span className="text-green-600 font-semibold">{steel.price}</span>
                            <span>{steel.location}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{steel.rating}</span>
                              <span className="text-gray-500">({steel.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedSteel(steel)
                          setIsModalOpen(true)
                        }}
                        className="btn btn-secondary text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => toggleFavorite(steel.id)}
                        className={`btn text-sm ${favorites.includes(steel.id) ? 'btn-danger' : 'btn-secondary'}`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(steel.id) ? 'fill-current' : ''}`} />
                        <span>{favorites.includes(steel.id) ? 'Favorited' : 'Favorite'}</span>
                      </button>
                      <button
                        onClick={() => setShowContactModal(steel)}
                        className="btn btn-secondary text-sm"
                      >
                        <Award className="w-4 h-4" />
                        <span>Contact Seller</span>
                      </button>
                      <button
                        onClick={() => setShowShareModal(steel)}
                        className="btn btn-secondary text-sm"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      <button
                        onClick={() => setShowCartModal(steel)}
                        className="btn btn-primary text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Detail Modal */}
        <DetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="marketplace"
          data={selectedSteel}
        />
        {/* Contact Seller Modal */}
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Contact Seller ({showContactModal.supplier})</h2>
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
        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Share Listing</h2>
                <button onClick={() => setShowShareModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4 text-gray-700">Share <span className="font-semibold">{showShareModal.title}</span> with others:</div>
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  className="form-input flex-1 mr-2"
                  value={window.location.origin + '/marketplace/' + showShareModal.id}
                  readOnly
                />
                <button className="btn btn-secondary" onClick={() => { navigator.clipboard.writeText(window.location.origin + '/marketplace/' + showShareModal.id); setShareCopied(true); setTimeout(() => setShareCopied(false), 1200); }}>
                  Copy
                </button>
              </div>
              {shareCopied && <div className="text-green-600 text-center font-medium mb-2">Link copied!</div>}
              <div className="flex justify-end">
                <button className="btn btn-secondary" onClick={() => setShowShareModal(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
        {/* Add to Cart/Buy Modal */}
        {showCartModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Add to Cart</h2>
                <button onClick={() => setShowCartModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4 text-gray-700">How many <span className="font-semibold">{showCartModal.title}</span> ({showCartModal.grade}) would you like to add to your cart?</div>
              <input
                type="number"
                className="form-input w-full mb-4"
                min={1}
                value={cartQuantity}
                onChange={e => setCartQuantity(Number(e.target.value))}
                disabled={cartSubmitted}
              />
              {cartSubmitted ? (
                <div className="text-green-600 text-center font-medium mb-2">Added to cart!</div>
              ) : null}
              <div className="flex justify-end space-x-2">
                <button className="btn btn-secondary" onClick={() => setShowCartModal(null)} disabled={cartSubmitted}>Cancel</button>
                <button className="btn btn-primary" onClick={() => { setCartSubmitted(true); setTimeout(() => { setShowCartModal(null); setCartSubmitted(false); setCartQuantity(1); }, 1500); }} disabled={cartQuantity < 1 || cartSubmitted}>Add to Cart</button>
              </div>
            </div>
          </div>
        )}
        {/* Favorite Feedback Toast */}
        {favoriteFeedback && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-green-600 text-white px-6 py-3 rounded shadow-lg font-medium">{favoriteFeedback}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Marketplace 