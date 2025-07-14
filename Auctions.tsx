import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Gavel, 
  Clock, 
  DollarSign, 
  Users, 
  Eye, 
  TrendingUp,
  Star,
  MapPin,
  Calendar,
  Package,
  ArrowUpRight,
  Grid3X3,
  List,
  Sliders,
  Info,
  CheckCircle,
  AlertCircle,
  Warehouse,
  Truck,
  FileText,
  X,
  User,
  Award,
  Thermometer,
  Zap,
  Ruler,
  HardDrive,
  CreditCard,
  Shield,
  Heart
} from 'lucide-react'
import DetailModal from '../components/DetailModal'
import BiddingModal from '../components/BiddingModal'
import { formatCurrencyINR } from '../utils/formatCurrencyINR';

const Auctions: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [sortBy, setSortBy] = useState('ending-soon')
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    location: 'all',
    warehouse: 'all'
  })
  const [selectedAuction, setSelectedAuction] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [isBiddingModalOpen, setIsBiddingModalOpen] = useState(false)
  const [selectedBiddingAuction, setSelectedBiddingAuction] = useState<any>(null)

  const toggleFavorite = (auctionId: number) => {
    setFavorites(prev => 
      prev.includes(auctionId) 
        ? prev.filter(id => id !== auctionId)
        : [...prev, auctionId]
    )
  }

  const handlePlaceBid = async (bidAmount: number, isAutoBid: boolean, maxBid?: number) => {
    // Simulate API call
    console.log('Placing bid:', { bidAmount, isAutoBid, maxBid, auction: selectedBiddingAuction })
    
    // Here you would make an API call to place the bid
    // For now, we'll just show a success message
    alert(`Bid placed successfully! Amount: $${bidAmount}${isAutoBid ? ` (Auto-bid up to $${maxBid})` : ''}`)
  }

  const openBiddingModal = (auction: any) => {
    setSelectedBiddingAuction(auction)
    setIsBiddingModalOpen(true)
  }

  // Mock auction data - replace with actual data from API
  const auctions = [
    {
      id: 1,
      title: 'Premium Carbon Steel Coils - Grade A',
      description: 'High-quality carbon steel coils suitable for automotive and construction applications. Manufactured to ASTM A36 standards with excellent weldability and formability.',
      currentBid: 45000,
      startingBid: 40000,
      reservePrice: 42000,
      bids: 12,
      timeLeft: '2h 15m',
      endDate: '2023-12-15T18:00:00Z',
      location: 'New York, NY',
      warehouse: 'NYC Warehouse A',
      category: 'Carbon Steel',
      quantity: '50 tons',
      dimensions: '0.125" x 48" x 240"',
      grade: 'A36',
      certifications: ['ASTM A36', 'ISO 9001', 'CE Mark'],
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
      seller: {
        name: 'SteelCorp Inc.',
        rating: 4.8,
        verified: true,
        location: 'New York, NY',
        totalSales: 1250
      },
      status: 'active',
      featured: true,
      specifications: {
        tensileStrength: '58,000 - 80,000 psi',
        yieldStrength: '36,000 psi min',
        elongation: '23% min',
        hardness: '137 HB max',
        chemicalComposition: {
          carbon: '0.26% max',
          manganese: '0.75% max',
          phosphorus: '0.04% max',
          sulfur: '0.05% max'
        }
      },
      shipping: {
        method: 'FOB Factory',
        leadTime: '5-7 business days',
        packaging: 'Wooden crates',
        insurance: 'Included'
      }
    },
    {
      id: 2,
      title: 'Stainless Steel Sheets 304 - Industrial Grade',
      description: 'Premium 304 stainless steel sheets with excellent corrosion resistance. Perfect for food processing, chemical processing, and architectural applications.',
      currentBid: 32500,
      startingBid: 30000,
      reservePrice: 31000,
      bids: 8,
      timeLeft: '5h 30m',
      endDate: '2023-12-15T21:00:00Z',
      location: 'Chicago, IL',
      warehouse: 'Chicago Distribution Center',
      category: 'Stainless Steel',
      quantity: '25 tons',
      dimensions: '0.187" x 60" x 120"',
      grade: '304',
      certifications: ['ASTM A240', 'ASME SA240', 'ISO 9001'],
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
      seller: {
        name: 'MetalWorks Ltd.',
        rating: 4.6,
        verified: true,
        location: 'Chicago, IL',
        totalSales: 890
      },
      status: 'ending',
      featured: false,
      specifications: {
        tensileStrength: '75,000 psi min',
        yieldStrength: '30,000 psi min',
        elongation: '40% min',
        hardness: '201 HB max',
        chemicalComposition: {
          carbon: '0.08% max',
          manganese: '2.00% max',
          phosphorus: '0.045% max',
          sulfur: '0.030% max',
          silicon: '1.00% max',
          chromium: '18.00-20.00%',
          nickel: '8.00-10.50%'
        }
      },
      shipping: {
        method: 'FOB Factory',
        leadTime: '3-5 business days',
        packaging: 'Plastic wrap + wooden pallets',
        insurance: 'Included'
      }
    },
    {
      id: 3,
      title: 'Alloy Steel Plates - High Strength',
      description: 'High-strength alloy steel plates for heavy machinery and structural applications. Designed for demanding industrial environments.',
      currentBid: 28900,
      startingBid: 25000,
      reservePrice: 26000,
      bids: 15,
      timeLeft: '1h 45m',
      endDate: '2023-12-15T17:15:00Z',
      location: 'Houston, TX',
      warehouse: 'Houston Steel Hub',
      category: 'Alloy Steel',
      quantity: '30 tons',
      dimensions: '0.5" x 96" x 240"',
      grade: '4140',
      certifications: ['ASTM A829', 'ISO 9001', 'API 5L'],
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
      seller: {
        name: 'IronSource Co.',
        rating: 4.9,
        verified: true,
        location: 'Houston, TX',
        totalSales: 1560
      },
      status: 'ending',
      featured: true,
      specifications: {
        tensileStrength: '95,000 - 120,000 psi',
        yieldStrength: '60,000 psi min',
        elongation: '20% min',
        hardness: '197-235 HB',
        chemicalComposition: {
          carbon: '0.38-0.43%',
          manganese: '0.75-1.00%',
          phosphorus: '0.035% max',
          sulfur: '0.040% max',
          silicon: '0.15-0.35%',
          chromium: '0.80-1.10%',
          molybdenum: '0.15-0.25%'
        }
      },
      shipping: {
        method: 'FOB Factory',
        leadTime: '7-10 business days',
        packaging: 'Steel strapping + wooden pallets',
        insurance: 'Included'
      }
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', count: auctions.length },
    { id: 'carbon', name: 'Carbon Steel', count: 1 },
    { id: 'stainless', name: 'Stainless Steel', count: 1 },
    { id: 'alloy', name: 'Alloy Steel', count: 1 }
  ]

  const priceRanges = [
    'All Prices',
    'Under $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    'Over $100,000'
  ]

  const locations = [
    'All Locations',
    'New York, NY',
    'Chicago, IL',
    'Houston, TX',
    'Los Angeles, CA'
  ]

  const warehouses = [
    'All Warehouses',
    'NYC Warehouse A',
    'Chicago Distribution Center',
    'Houston Steel Hub',
    'LA Metal Storage'
  ]

  const formatTimeLeft = (timeLeft: string) => {
    return timeLeft
  }

  const formatPrice = (price: number) => formatCurrencyINR(price);

  const getAuctionDetails = (auctionId: number) => {
    return auctions.find(auction => auction.id === auctionId)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="status-badge status-active">Active</span>
      case 'ending':
        return <span className="status-badge status-warning">Ending Soon</span>
      case 'ended':
        return <span className="status-badge status-inactive">Ended</span>
      default:
        return <span className="status-badge status-inactive">Unknown</span>
    }
  }

  const filteredAuctions = auctions.filter(auction => {
    const matchesCategory = filters.category === 'all' || auction.category.toLowerCase().includes(filters.category.toLowerCase())
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.grade.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="card p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Steel Auctions</h1>
                <p className="text-gray-600 mt-1">Bid on premium steel products from verified suppliers</p>
              </div>
              <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-white text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
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
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Gavel className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Auctions</p>
                  <p className="text-2xl font-bold text-gray-900">{auctions.length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bids</p>
                  <p className="text-2xl font-bold text-gray-900">{auctions.reduce((sum, auction) => sum + auction.bids, 0)}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Current Bid</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatPrice(Math.round(auctions.reduce((sum, auction) => sum + auction.currentBid, 0) / auctions.length))}
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Featured Auctions</p>
                  <p className="text-2xl font-bold text-gray-900">{auctions.filter(a => a.featured).length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="card p-6 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search auctions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              {/* Price Range Filter */}
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured Auctions */}
          {auctions.filter(a => a.featured).length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Featured Auctions</h2>
                <span className="text-sm text-gray-500">Premium listings</span>
              </div>
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {auctions.filter(a => a.featured).map((auction) => (
                  <div key={auction.id} className="card border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    {viewMode === 'grid' ? (
                      // Grid View
                      <div>
                        <div className="relative">
                          <img
                            src={auction.image}
                            alt={auction.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 right-4 flex flex-col space-y-1">
                            {auction.featured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full border border-yellow-200">
                                Featured
                              </span>
                            )}
                            {getStatusBadge(auction.status)}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{auction.title}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium text-gray-900">{auction.seller.rating}</span>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Package className="w-4 h-4 mr-2" />
                              <span className="font-medium">Grade:</span>
                              <span className="ml-1">{auction.grade}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{auction.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>Ends in {formatTimeLeft(auction.timeLeft)}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-2xl font-bold text-blue-600">{formatPrice(auction.currentBid)}</p>
                              <p className="text-sm text-gray-500">{auction.bids} bids</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">{auction.quantity}</p>
                              <p className="text-sm text-gray-500">Available</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => {
                                setSelectedAuction(auction)
                                setIsModalOpen(true)
                              }}
                              className="btn btn-secondary flex-1 mr-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Details</span>
                            </button>
                            <button className="btn btn-primary">
                              <Gavel className="w-4 h-4" />
                              <span>Bid Now</span>
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
                            src={auction.image}
                            alt={auction.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="absolute -top-1 -right-1 flex flex-col space-y-1">
                            {auction.featured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full border border-yellow-200">
                                Featured
                              </span>
                            )}
                            {getStatusBadge(auction.status)}
                          </div>
                        </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{auction.title}</h3>
                                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    {auction.grade}
                                  </span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                    Auction
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{auction.seller.name}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <span>{auction.quantity}</span>
                                  <span className="text-green-600 font-semibold">{formatPrice(auction.currentBid)}</span>
                                  <span>{auction.location}</span>
                                  <span>Ends in {formatTimeLeft(auction.timeLeft)}</span>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                    <span>{auction.seller.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedAuction(auction)
                                setIsModalOpen(true)
                              }}
                              className="btn btn-secondary text-sm"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => toggleFavorite(auction.id)}
                              className={`btn text-sm ${favorites.includes(auction.id) ? 'btn-danger' : 'btn-secondary'}`}
                            >
                              <Heart className={`w-4 h-4 ${favorites.includes(auction.id) ? 'fill-current' : ''}`} />
                              <span>{favorites.includes(auction.id) ? 'Favorited' : 'Favorite'}</span>
                            </button>
                            <button 
                              onClick={() => openBiddingModal(auction)}
                              className="btn btn-primary text-sm"
                            >
                              <Gavel className="w-4 h-4" />
                              <span>Bid</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Auctions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">All Auctions</h2>
              <span className="text-sm text-gray-500">{filteredAuctions.length} auctions found</span>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredAuctions.map((auction) => (
                <div key={auction.id} className="card border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  {viewMode === 'grid' ? (
                    // Grid View
                    <div>
                      <div className="relative">
                        <img
                          src={auction.image}
                          alt={auction.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4 flex flex-col space-y-1">
                          {auction.featured && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full border border-yellow-200">
                              Featured
                            </span>
                          )}
                          {getStatusBadge(auction.status)}
                          <button
                            onClick={() => toggleFavorite(auction.id)}
                            className={`p-2 rounded-full transition-all duration-200 ${
                              favorites.includes(auction.id)
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-white text-gray-400 hover:text-red-500 hover:bg-white'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${favorites.includes(auction.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{auction.title}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900">{auction.seller.rating}</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Package className="w-4 h-4 mr-2" />
                            <span className="font-medium">Grade:</span>
                            <span className="ml-1">{auction.grade}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{auction.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>Ends in {formatTimeLeft(auction.timeLeft)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{formatPrice(auction.currentBid)}</p>
                            <p className="text-sm text-gray-500">{auction.bids} bids</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{auction.quantity}</p>
                            <p className="text-sm text-gray-500">Available</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => {
                              setSelectedAuction(auction)
                              setIsModalOpen(true)
                            }}
                            className="btn btn-secondary flex-1 mr-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          <button
                            onClick={() => toggleFavorite(auction.id)}
                            className={`btn ${favorites.includes(auction.id) ? 'btn-danger' : 'btn-secondary'} mr-2`}
                          >
                            <Heart className={`w-4 h-4 ${favorites.includes(auction.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button 
                            onClick={() => openBiddingModal(auction)}
                            className="btn btn-primary"
                          >
                            <Gavel className="w-4 h-4" />
                            <span>Bid</span>
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
                            src={auction.image}
                            alt={auction.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="absolute -top-1 -right-1 flex flex-col space-y-1">
                            {auction.featured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full border border-yellow-200">
                                Featured
                              </span>
                            )}
                            {getStatusBadge(auction.status)}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{auction.title}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {auction.grade}
                                </span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                  Auction
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{auction.seller.name}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{auction.quantity}</span>
                                <span className="text-green-600 font-semibold">{formatPrice(auction.currentBid)}</span>
                                <span>{auction.location}</span>
                                <span>Ends in {formatTimeLeft(auction.timeLeft)}</span>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span>{auction.seller.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedAuction(auction)
                              setIsModalOpen(true)
                            }}
                            className="btn btn-secondary text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => toggleFavorite(auction.id)}
                            className={`btn text-sm ${favorites.includes(auction.id) ? 'btn-danger' : 'btn-secondary'}`}
                          >
                            <Heart className={`w-4 h-4 ${favorites.includes(auction.id) ? 'fill-current' : ''}`} />
                            <span>{favorites.includes(auction.id) ? 'Favorited' : 'Favorite'}</span>
                          </button>
                          <button 
                            onClick={() => openBiddingModal(auction)}
                            className="btn btn-primary text-sm"
                          >
                            <Gavel className="w-4 h-4" />
                            <span>Bid</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center">
            <button className="btn btn-secondary">
              Load More Auctions
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="auction"
        data={selectedAuction}
      />

      {/* Bidding Modal */}
      <BiddingModal
        isOpen={isBiddingModalOpen}
        onClose={() => setIsBiddingModalOpen(false)}
        auction={selectedBiddingAuction}
        onPlaceBid={handlePlaceBid}
      />
    </div>
  )
}

export default Auctions
