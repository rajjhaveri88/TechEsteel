import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Star, 
  Package, 
  Gavel, 
  Eye, 
  Trash2, 
  MapPin, 
  DollarSign, 
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Building,
  Award,
  Scale,
  Truck
} from 'lucide-react'

interface FavoriteItem {
  id: string
  type: 'steel' | 'auction'
  title: string
  supplier: string
  location: string
  price: string
  status: string
  addedDate: string
  image: string
  steelDetails?: {
    type: string
    grade: string
    quantity: string
    specifications: string[]
  }
  auctionDetails?: {
    endTime: string
    currentBids: number
    timeLeft: string
  }
}

const Favorites: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'steel' | 'auctions'>('all')
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: '1',
      type: 'steel',
      title: 'Premium Carbon Steel Sheets - 50 tons',
      supplier: 'Tata Steel Ltd',
      location: 'Mumbai, India',
      price: '$45,000',
      status: 'Available',
      addedDate: '2024-01-15',
      image: 'steel-sheet-1.jpg',
      steelDetails: {
        type: 'Carbon Steel',
        grade: 'A36',
        quantity: '50 tons',
        specifications: [
          'Tensile Strength: 58,000-80,000 PSI',
          'Yield Strength: 36,000 PSI minimum',
          'Carbon Content: 0.26% max'
        ]
      }
    },
    {
      id: '2',
      type: 'auction',
      title: 'Stainless Steel 304 Coils - 25 tons',
      supplier: 'Jindal Stainless',
      location: 'Chennai, India',
      price: '$58,000',
      status: 'Active',
      addedDate: '2024-01-20',
      image: 'stainless-coil-1.jpg',
      auctionDetails: {
        endTime: '2024-02-15T18:00:00',
        currentBids: 12,
        timeLeft: '3 days 5 hours'
      }
    },
    {
      id: '3',
      type: 'steel',
      title: 'Structural Steel Beams - 100 tons',
      supplier: 'SAIL',
      location: 'Delhi, India',
      price: '$82,000',
      status: 'Available',
      addedDate: '2024-01-25',
      image: 'structural-beam-1.jpg',
      steelDetails: {
        type: 'Structural Steel',
        grade: 'A992',
        quantity: '100 tons',
        specifications: [
          'Tensile Strength: 65,000 PSI minimum',
          'Yield Strength: 50,000 PSI minimum',
          'Elongation: 21% minimum'
        ]
      }
    },
    {
      id: '4',
      type: 'auction',
      title: 'Tool Steel Round Bars - 15 tons',
      supplier: 'Bharat Forge',
      location: 'Bangalore, India',
      price: '$52,500',
      status: 'Active',
      addedDate: '2024-01-30',
      image: 'tool-steel-1.jpg',
      auctionDetails: {
        endTime: '2024-02-20T12:00:00',
        currentBids: 5,
        timeLeft: '8 days 23 hours'
      }
    }
  ])

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id))
  }

  const filteredFavorites = favorites.filter(item => {
    if (activeTab === 'all') return true
    return item.type === activeTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return <span className="status-badge status-success">Available</span>
      case 'Active':
        return <span className="status-badge status-active">Active</span>
      case 'Sold':
        return <span className="status-badge status-danger">Sold</span>
      default:
        return <span className="status-badge status-inactive">{status}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
              <p className="text-gray-600 mt-2">Your saved steel listings and auctions</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/marketplace" className="btn btn-secondary">
                <Package className="w-4 h-4 mr-2" />
                Browse Steel
              </Link>
              <Link to="/auctions" className="btn btn-primary">
                <Gavel className="w-4 h-4 mr-2" />
                Browse Auctions
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Favorites</p>
                  <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Steel Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{favorites.filter(f => f.type === 'steel').length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Gavel className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Auctions</p>
                  <p className="text-2xl font-bold text-gray-900">{favorites.filter(f => f.type === 'auction').length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">$237.5K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white shadow-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'all', name: 'All Favorites', count: favorites.length },
                  { id: 'steel', name: 'Steel Listings', count: favorites.filter(f => f.type === 'steel').length },
                  { id: 'auctions', name: 'Auctions', count: favorites.filter(f => f.type === 'auction').length }
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

        {/* Favorites List */}
        <div className="space-y-4">
          {filteredFavorites.length === 0 ? (
            <div className="card p-12 text-center border border-gray-200 shadow-sm">
              <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-600 mb-6">Start adding steel listings and auctions to your favorites to track them here.</p>
              <div className="flex items-center justify-center space-x-3">
                <Link to="/marketplace" className="btn btn-secondary">
                  <Package className="w-4 h-4 mr-2" />
                  Browse Steel
                </Link>
                <Link to="/auctions" className="btn btn-primary">
                  <Gavel className="w-4 h-4 mr-2" />
                  Browse Auctions
                </Link>
              </div>
            </div>
          ) : (
            filteredFavorites.map((item) => (
              <div key={item.id} className="card hover-lift border border-gray-200 shadow-sm">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          {item.type === 'steel' ? (
                            <Package className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Gavel className="w-5 h-5 text-green-600" />
                          )}
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        </div>
                        {getStatusBadge(item.status)}
                        <span className="text-sm text-gray-500">Added {new Date(item.addedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span>{item.supplier}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center font-medium text-gray-900">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {item.price}
                        </span>
                      </div>
                      
                      {/* Steel Details */}
                      {item.type === 'steel' && item.steelDetails && (
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Scale className="w-4 h-4 mr-1" />
                            {item.steelDetails.type} {item.steelDetails.grade}
                          </span>
                          <span>•</span>
                          <span>{item.steelDetails.quantity}</span>
                          <span>•</span>
                          <span>{item.steelDetails.specifications.length} specifications</span>
                        </div>
                      )}

                      {/* Auction Details */}
                      {item.type === 'auction' && item.auctionDetails && (
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Ends: {new Date(item.auctionDetails.endTime).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {item.auctionDetails.currentBids} bids
                          </span>
                          <span>•</span>
                          <span className="flex items-center text-orange-600 font-medium">
                            <Clock className="w-4 h-4 mr-1" />
                            {item.auctionDetails.timeLeft}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={item.type === 'steel' ? `/marketplace/${item.id}` : `/auctions/${item.id}`}
                        className="btn btn-secondary"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                      {item.type === 'auction' && (
                        <button className="btn btn-primary">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Place Bid
                        </button>
                      )}
                      {item.type === 'steel' && (
                        <button className="btn btn-primary">
                          <Package className="w-4 h-4 mr-2" />
                          Contact Seller
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="btn btn-danger"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </button>
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

export default Favorites 