import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Gavel, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp,
  Star,
  MapPin,
  Calendar,
  Package,
  Grid3X3,
  List,
  Search,
  Filter,
  Award,
  AlertCircle,
  CheckCircle,
  X,
  BarChart3,
  Activity,
  Target,
  Zap,
  Info
} from 'lucide-react'
import DetailModal from '../components/DetailModal'
import { formatCurrencyINR } from '../utils/formatCurrencyINR';

interface Auction {
  id: string
  title: string
  steelName: string
  steelId: string
  startingPrice: number
  currentPrice: number
  reservePrice: number
  quantity: number
  unit: string
  status: 'active' | 'ending' | 'ended' | 'cancelled' | 'sold'
  endTime: string
  startTime: string
  seller: string
  bidCount: number
  viewCount: number
  location: string
  warehouse: string
  category: string
  grade: string
  image: string
  description: string
  featured: boolean
  minimumBid: number
  bidIncrement: number
  timeLeft: string
  highestBidder: string
  specifications: {
    thickness?: string
    width?: string
    length?: string
    yieldStrength?: string
    tensileStrength?: string
  }
  chemicalComposition: {
    carbon?: string
    manganese?: string
    phosphorus?: string
    sulfur?: string
  }
  certifications: string[]
  shipping: {
    method: string
    leadTime: string
    packaging: string
    insurance: string
  }
  bids: {
    id: string
    bidder: string
    amount: number
    time: string
    status: 'active' | 'outbid'
  }[]
}

const MyAuctions: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAuction, setSelectedAuction] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState<Auction | null>(null)
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyAuctions()
  }, [])

  const fetchMyAuctions = async () => {
    try {
      // Mock data with enhanced auction information
      const mockAuctions: Auction[] = [
        {
          id: "AUCTION-001",
          title: "Premium Carbon Steel Coils Auction",
          steelName: "Premium Carbon Steel Sheets",
          steelId: "STEEL-001",
          startingPrice: 40000,
          currentPrice: 45000,
          reservePrice: 42000,
          quantity: 50,
          unit: "tons",
          status: "active",
          endTime: "2024-01-25T18:00:00Z",
          startTime: "2024-01-20T10:00:00Z",
          seller: "John Doe",
          bidCount: 12,
          viewCount: 156,
          location: "Mumbai, India",
          warehouse: "Mumbai Central Warehouse",
          category: "Carbon Steel",
          grade: "AISI 1018",
          image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
          description: "High-quality carbon steel coils suitable for automotive and construction applications. Manufactured to ASTM A36 standards with excellent weldability and formability.",
          featured: true,
          minimumBid: 1000,
          bidIncrement: 500,
          timeLeft: "2h 15m",
          highestBidder: "SteelCorp Ltd",
          specifications: {
            thickness: "3mm",
            width: "1500mm",
            length: "6000mm",
            yieldStrength: "250 MPa",
            tensileStrength: "400 MPa"
          },
          chemicalComposition: {
            carbon: "0.18%",
            manganese: "0.75%",
            phosphorus: "0.04%",
            sulfur: "0.05%"
          },
          certifications: ["ASTM A36", "ISO 9001", "CE Mark"],
          shipping: {
            method: "FOB Factory",
            leadTime: "5-7 business days",
            packaging: "Wooden crates",
            insurance: "Included"
          },
          bids: [
            {
              id: "bid-1",
              bidder: "SteelCorp Ltd",
              amount: 45000,
              time: "2024-01-24T15:30:00Z",
              status: "active"
            },
            {
              id: "bid-2",
              bidder: "MetalWorks Inc",
              amount: 44000,
              time: "2024-01-24T14:20:00Z",
              status: "outbid"
            },
            {
              id: "bid-3",
              bidder: "IronSource Co",
              amount: 43000,
              time: "2024-01-24T13:15:00Z",
              status: "outbid"
            }
          ]
        },
        {
          id: "AUCTION-002",
          title: "Stainless Steel 304 Coils Auction",
          steelName: "Stainless Steel 304 Coils",
          steelId: "STEEL-002",
          startingPrice: 30000,
          currentPrice: 32500,
          reservePrice: 31000,
          quantity: 25,
          unit: "tons",
          status: "ending",
          endTime: "2024-01-24T21:00:00Z",
          startTime: "2024-01-19T10:00:00Z",
          seller: "John Doe",
          bidCount: 8,
          viewCount: 89,
          location: "Chennai, India",
          warehouse: "Chennai Port Warehouse",
          category: "Stainless Steel",
          grade: "AISI 304",
          image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
          description: "Premium 304 stainless steel coils with excellent corrosion resistance. Perfect for food processing, chemical processing, and architectural applications.",
          featured: false,
          minimumBid: 1000,
          bidIncrement: 500,
          timeLeft: "5h 30m",
          highestBidder: "FoodTech Solutions",
          specifications: {
            thickness: "2mm",
            width: "1000mm",
            yieldStrength: "205 MPa",
            tensileStrength: "520 MPa"
          },
          chemicalComposition: {
            carbon: "0.08%",
            manganese: "2.0%",
            phosphorus: "0.045%",
            sulfur: "0.030%"
          },
          certifications: ["ASTM A240", "ASME SA240", "ISO 9001"],
          shipping: {
            method: "FOB Factory",
            leadTime: "3-5 business days",
            packaging: "Plastic wrap + wooden pallets",
            insurance: "Included"
          },
          bids: [
            {
              id: "bid-4",
              bidder: "FoodTech Solutions",
              amount: 32500,
              time: "2024-01-24T16:45:00Z",
              status: "active"
            },
            {
              id: "bid-5",
              bidder: "ChemCorp Ltd",
              amount: 32000,
              time: "2024-01-24T15:30:00Z",
              status: "outbid"
            }
          ]
        },
        {
          id: "AUCTION-003",
          title: "Alloy Steel Plates Auction",
          steelName: "Alloy Steel Plates",
          steelId: "STEEL-003",
          startingPrice: 25000,
          currentPrice: 28900,
          reservePrice: 26000,
          quantity: 30,
          unit: "tons",
          status: "ended",
          endTime: "2024-01-23T17:15:00Z",
          startTime: "2024-01-18T10:00:00Z",
          seller: "John Doe",
          bidCount: 15,
          viewCount: 234,
          location: "Houston, TX",
          warehouse: "Houston Steel Hub",
          category: "Alloy Steel",
          grade: "4140",
          image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
          description: "High-strength alloy steel plates for heavy machinery and structural applications. Designed for demanding industrial environments.",
          featured: true,
          minimumBid: 1000,
          bidIncrement: 500,
          timeLeft: "Ended",
          highestBidder: "HeavyMach Corp",
          specifications: {
            thickness: "0.5\"",
            width: "96\"",
            length: "240\"",
            yieldStrength: "60,000 psi",
            tensileStrength: "95,000 - 120,000 psi"
          },
          chemicalComposition: {
            carbon: "0.38-0.43%",
            manganese: "0.75-1.00%",
            phosphorus: "0.035%",
            sulfur: "0.040%"
          },
          certifications: ["ASTM A829", "ISO 9001", "API 5L"],
          shipping: {
            method: "FOB Factory",
            leadTime: "7-10 business days",
            packaging: "Steel strapping + wooden pallets",
            insurance: "Included"
          },
          bids: [
            {
              id: "bid-6",
              bidder: "HeavyMach Corp",
              amount: 28900,
              time: "2024-01-23T17:14:00Z",
              status: "active"
            },
            {
              id: "bid-7",
              bidder: "Industrial Steel Co",
              amount: 28500,
              time: "2024-01-23T17:10:00Z",
              status: "outbid"
            }
          ]
        }
      ]
      
      setAuctions(mockAuctions)
    } catch (error) {
      console.error('Error fetching auctions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="status-badge status-active">Active</span>
      case 'ending':
        return <span className="status-badge status-warning">Ending Soon</span>
      case 'ended':
        return <span className="status-badge status-inactive">Ended</span>
      case 'cancelled':
        return <span className="status-badge status-danger">Cancelled</span>
      case 'sold':
        return <span className="status-badge status-success">Sold</span>
      default:
        return <span className="status-badge status-inactive">Unknown</span>
    }
  }

  const formatTimeLeft = (timeLeft: string) => {
    if (timeLeft === "Ended") return "Ended"
    return timeLeft
  }

  const formatPrice = (price: number) => formatCurrencyINR(price);

  const filteredAuctions = auctions.filter(auction => {
    const matchesStatus = selectedStatus === 'all' || auction.status === selectedStatus
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.steelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.grade.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatistics = () => {
    const totalAuctions = auctions.length
    const activeAuctions = auctions.filter(a => a.status === 'active').length
    const totalBids = auctions.reduce((sum, auction) => sum + auction.bidCount, 0)
    const totalViews = auctions.reduce((sum, auction) => sum + auction.viewCount, 0)
    const totalValue = auctions.reduce((sum, auction) => sum + auction.currentPrice, 0)

    return { totalAuctions, activeAuctions, totalBids, totalViews, totalValue }
  }

  const stats = getStatistics()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Auctions</h1>
              <p className="mt-2 text-gray-600">Manage your steel auctions</p>
            </div>
            <div className="card p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="card p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Auctions</h1>
                <p className="text-gray-600 mt-1">Manage and monitor your steel auctions</p>
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700">
                      <strong>Note:</strong> You cannot bid on your own auctions. Use the "View Details" button to monitor bids and manage your auctions.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                <Link to="/create-auction" className="btn btn-primary flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Auction</span>
                </Link>

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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Gavel className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Auctions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAuctions}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Auctions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeAuctions}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bids</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBids}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalValue)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="card p-6 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="ending">Ending Soon</option>
                <option value="ended">Ended</option>
                <option value="cancelled">Cancelled</option>
                <option value="sold">Sold</option>
              </select>

              {/* Sort By */}
              <select
                className="px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="ending">Ending Soon</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="bids">Most Bids</option>
                <option value="views">Most Views</option>
              </select>
            </div>
          </div>

          {/* Auctions List */}
          {filteredAuctions.length === 0 ? (
            <div className="card p-12 text-center border border-gray-200 shadow-sm">
              <Gavel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Auctions Found</h3>
              <p className="text-gray-600 mb-6">Start by creating your first auction</p>
              <Link to="/create-auction" className="btn btn-primary">
                <Plus className="w-4 h-4" />
                <span>Create Your First Auction</span>
              </Link>
            </div>
          ) : (
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
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{auction.title}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900">{auction.bidCount}</span>
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
                            <span>{formatTimeLeft(auction.timeLeft)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{formatPrice(auction.currentPrice)}</p>
                            <p className="text-sm text-gray-500">{auction.bidCount} bids</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{auction.quantity} {auction.unit}</p>
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
                            className="btn btn-secondary"
                            onClick={() => navigate(`/edit-auction/${auction.id}`, { state: { initialValues: auction, mode: 'edit' } })}
                          >
                            <Edit className="w-4 h-4" />
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
                                  {auction.category}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{auction.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{auction.quantity} {auction.unit}</span>
                                <span className="text-green-600 font-semibold">{formatPrice(auction.currentPrice)}</span>
                                <span>{auction.location}</span>
                                <span>{formatTimeLeft(auction.timeLeft)}</span>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-3 h-3 text-blue-400" />
                                  <span>{auction.bidCount} bids</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-3 h-3 text-gray-400" />
                                  <span>{auction.viewCount} views</span>
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
                            className="btn btn-secondary text-sm"
                            onClick={() => navigate(`/edit-auction/${auction.id}`, { state: { initialValues: auction, mode: 'edit' } })}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="btn btn-danger text-sm"
                            onClick={() => setShowDeleteModal(auction)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Delete Auction</h2>
                <button onClick={() => setShowDeleteModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4 text-gray-700">Are you sure you want to delete the auction <span className="font-semibold">{showDeleteModal.title}</span>?</div>
              <div className="flex justify-end space-x-2">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={() => { setShowDeleteModal(null); /* Add delete logic here */ }}>Delete</button>
              </div>
            </div>
          </div>
        )}
        {/* Detail Modal */}
        <DetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="auction"
          data={selectedAuction}
        />
      </div>
    </div>
  )
}

export default MyAuctions
