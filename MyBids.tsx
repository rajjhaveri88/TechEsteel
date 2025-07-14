import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Gavel, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Calendar,
  MapPin,
  Package,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Users,
  Award,
  FileText,
  Truck,
  Building,
  Scale,
  Thermometer,
  Zap,
  Shield,
  Globe,
  Tag,
  Info
} from 'lucide-react'

interface Bid {
  id: number
  auctionTitle: string
  auctionId: string
  bidAmount: string
  maxBid: string
  currentPrice: string
  status: string
  endTime: string
  location: string
  supplier: string
  myPosition: number
  totalBids: number
  timeLeft: string
  steelDetails?: {
    type: string
    grade: string
    quantity: string
    dimensions: string
    specifications: string[]
    certifications: string[]
    warehouse: string
    images: string[]
  }
}

const MyBids: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'won' | 'lost' | 'expired'>('active')
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showBidModal, setShowBidModal] = useState<Bid | null>(null)
  const [showAlertModal, setShowAlertModal] = useState<Bid | null>(null)
  const [bidAmount, setBidAmount] = useState('')
  const [bidSubmitted, setBidSubmitted] = useState(false)
  const [alertType, setAlertType] = useState('price')
  const [alertValue, setAlertValue] = useState('')
  const [alertSubmitted, setAlertSubmitted] = useState(false)

  // Mock data for bids with enhanced steel details
  const bids: Bid[] = [
    {
      id: 1,
      auctionTitle: "Premium Carbon Steel Sheets - 50 tons",
      auctionId: "AUCT-001",
      bidAmount: "$45,000",
      maxBid: "$50,000",
      currentPrice: "$42,500",
      status: "active",
      endTime: "2024-02-15T18:00:00",
      location: "Mumbai, India",
      supplier: "Tata Steel Ltd",
      myPosition: 2,
      totalBids: 8,
      timeLeft: "2 days 5 hours",
      steelDetails: {
        type: "Carbon Steel",
        grade: "A36",
        quantity: "50 tons",
        dimensions: "4' x 8' x 0.25\"",
        specifications: [
          "Tensile Strength: 58,000-80,000 PSI",
          "Yield Strength: 36,000 PSI minimum",
          "Elongation: 23% minimum",
          "Carbon Content: 0.26% max",
          "Manganese: 0.75-1.20%"
        ],
        certifications: [
          "ASTM A36 Certification",
          "ISO 9001:2015",
          "CE Marking",
          "RoHS Compliance"
        ],
        warehouse: "Mumbai Central Warehouse",
        images: ["steel-sheet-1.jpg", "steel-sheet-2.jpg"]
      }
    },
    {
      id: 2,
      auctionTitle: "Stainless Steel 304 Coils - 25 tons",
      auctionId: "AUCT-002",
      bidAmount: "$55,000",
      maxBid: "$60,000",
      currentPrice: "$58,000",
      status: "won",
      endTime: "2024-02-10T15:30:00",
      location: "Chennai, India",
      supplier: "Jindal Stainless",
      myPosition: 1,
      totalBids: 12,
      timeLeft: "Completed",
      steelDetails: {
        type: "Stainless Steel",
        grade: "304",
        quantity: "25 tons",
        dimensions: "48\" x 0.125\" x 2000'",
        specifications: [
          "Chromium: 18-20%",
          "Nickel: 8-10.5%",
          "Carbon: 0.08% max",
          "Manganese: 2% max",
          "Silicon: 1% max",
          "Phosphorus: 0.045% max",
          "Sulfur: 0.03% max"
        ],
        certifications: [
          "ASTM A240 Certification",
          "ASME SA240",
          "ISO 9001:2015",
          "PED Certification"
        ],
        warehouse: "Chennai Port Warehouse",
        images: ["stainless-coil-1.jpg", "stainless-coil-2.jpg"]
      }
    },
    {
      id: 3,
      auctionTitle: "Structural Steel Beams - 100 tons",
      auctionId: "AUCT-003",
      bidAmount: "$75,000",
      maxBid: "$80,000",
      currentPrice: "$82,000",
      status: "lost",
      endTime: "2024-02-08T20:00:00",
      location: "Delhi, India",
      supplier: "SAIL",
      myPosition: 3,
      totalBids: 15,
      timeLeft: "Completed",
      steelDetails: {
        type: "Structural Steel",
        grade: "A992",
        quantity: "100 tons",
        dimensions: "W12x26, 40' lengths",
        specifications: [
          "Tensile Strength: 65,000 PSI minimum",
          "Yield Strength: 50,000 PSI minimum",
          "Elongation: 21% minimum",
          "Carbon: 0.23% max",
          "Manganese: 0.50-1.50%",
          "Phosphorus: 0.035% max",
          "Sulfur: 0.04% max"
        ],
        certifications: [
          "ASTM A992 Certification",
          "AISC Certification",
          "ISO 9001:2015",
          "CE Marking"
        ],
        warehouse: "Delhi Industrial Zone",
        images: ["structural-beam-1.jpg", "structural-beam-2.jpg"]
      }
    },
    {
      id: 4,
      auctionTitle: "Tool Steel Round Bars - 15 tons",
      auctionId: "AUCT-004",
      bidAmount: "$52,500",
      maxBid: "$55,000",
      currentPrice: "$52,500",
      status: "active",
      endTime: "2024-02-20T12:00:00",
      location: "Bangalore, India",
      supplier: "Bharat Forge",
      myPosition: 1,
      totalBids: 5,
      timeLeft: "6 days 23 hours",
      steelDetails: {
        type: "Tool Steel",
        grade: "D2",
        quantity: "15 tons",
        dimensions: "2\" diameter x 12' lengths",
        specifications: [
          "Carbon: 1.40-1.60%",
          "Chromium: 11.00-13.00%",
          "Molybdenum: 0.70-1.20%",
          "Vanadium: 0.50-1.10%",
          "Manganese: 0.60% max",
          "Silicon: 0.60% max"
        ],
        certifications: [
          "ASTM A681 Certification",
          "ISO 9001:2015",
          "Heat Treatment Certificate",
          "Material Test Report"
        ],
        warehouse: "Bangalore Manufacturing Hub",
        images: ["tool-steel-1.jpg", "tool-steel-2.jpg"]
      }
    },
    {
      id: 5,
      auctionTitle: "Alloy Steel Plates - 30 tons",
      auctionId: "AUCT-005",
      bidAmount: "$36,000",
      maxBid: "$40,000",
      currentPrice: "$38,500",
      status: "expired",
      endTime: "2024-02-05T10:00:00",
      location: "Pune, India",
      supplier: "Essar Steel",
      myPosition: 4,
      totalBids: 9,
      timeLeft: "Expired",
      steelDetails: {
        type: "Alloy Steel",
        grade: "4140",
        quantity: "30 tons",
        dimensions: "6' x 20' x 1\"",
        specifications: [
          "Carbon: 0.38-0.43%",
          "Chromium: 0.80-1.10%",
          "Molybdenum: 0.15-0.25%",
          "Manganese: 0.75-1.00%",
          "Silicon: 0.15-0.35%",
          "Phosphorus: 0.035% max",
          "Sulfur: 0.040% max"
        ],
        certifications: [
          "ASTM A829 Certification",
          "ISO 9001:2015",
          "Material Test Report",
          "Heat Treatment Certificate"
        ],
        warehouse: "Pune Industrial Estate",
        images: ["alloy-plate-1.jpg", "alloy-plate-2.jpg"]
      }
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="status-badge status-active">Active</span>
      case 'won':
        return <span className="status-badge status-success">Won</span>
      case 'lost':
        return <span className="status-badge status-danger">Lost</span>
      case 'expired':
        return <span className="status-badge status-inactive">Expired</span>
      default:
        return <span className="status-badge status-inactive">Unknown</span>
    }
  }

  const getPositionBadge = (position: number) => {
    if (position === 1) {
      return <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">1st</span>
    } else if (position === 2) {
      return <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">2nd</span>
    } else if (position === 3) {
      return <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">3rd</span>
    } else {
      return <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{position}th</span>
    }
  }

  const openModal = (bid: Bid) => {
    setSelectedBid(bid)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBid(null)
  }

  const filteredBids = bids.filter(bid => bid.status === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Bids</h1>
              <p className="text-gray-600 mt-2">Track your auction bids and bidding history</p>
            </div>
            <Link
              to="/auctions"
              className="btn btn-primary"
            >
              <Gavel className="w-4 h-4 mr-2" />
              Browse Auctions
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Gavel className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Bids</p>
                  <p className="text-2xl font-bold text-gray-900">{bids.filter(b => b.status === 'active').length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Won Auctions</p>
                  <p className="text-2xl font-bold text-gray-900">{bids.filter(b => b.status === 'won').length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Lost Auctions</p>
                  <p className="text-2xl font-bold text-gray-900">{bids.filter(b => b.status === 'lost').length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">$55K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white shadow-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'active', name: 'Active Bids', count: bids.filter(b => b.status === 'active').length },
                  { id: 'won', name: 'Won', count: bids.filter(b => b.status === 'won').length },
                  { id: 'lost', name: 'Lost', count: bids.filter(b => b.status === 'lost').length },
                  { id: 'expired', name: 'Expired', count: bids.filter(b => b.status === 'expired').length }
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

        {/* Bids List */}
        <div className="space-y-4">
          {filteredBids.length === 0 ? (
            <div className="card p-12 text-center border border-gray-200 shadow-sm">
              <Gavel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} bids</h3>
              <p className="text-gray-600 mb-6">You don't have any {activeTab} bids at the moment.</p>
              <Link to="/auctions" className="btn btn-primary">
                Browse Auctions
              </Link>
            </div>
          ) : (
            filteredBids.map((bid) => (
              <div key={bid.id} className="card hover-lift border border-gray-200 shadow-sm">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{bid.auctionTitle}</h3>
                        {getStatusBadge(bid.status)}
                        {getPositionBadge(bid.myPosition)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span>Auction ID: {bid.auctionId}</span>
                        <span>•</span>
                        <span>{bid.supplier}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {bid.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Ends: {new Date(bid.endTime).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{bid.totalBids} total bids</span>
                        {bid.status === 'active' && (
                          <>
                            <span>•</span>
                            <span className="flex items-center text-orange-600 font-medium">
                              <Clock className="w-4 h-4 mr-1" />
                              {bid.timeLeft}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Your Bid</p>
                      <p className="text-xl font-bold text-blue-600">{bid.bidAmount}</p>
                      <p className="text-sm text-gray-500">Max: {bid.maxBid}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Current Price</p>
                      <p className="text-xl font-bold text-gray-900">{bid.currentPrice}</p>
                      <div className="flex items-center text-sm">
                        {parseFloat(bid.currentPrice.replace(/[^0-9.]/g, '')) > parseFloat(bid.bidAmount.replace(/[^0-9.]/g, '')) ? (
                          <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                        )}
                        <span className={parseFloat(bid.currentPrice.replace(/[^0-9.]/g, '')) > parseFloat(bid.bidAmount.replace(/[^0-9.]/g, '')) ? 'text-red-500' : 'text-green-500'}>
                          {parseFloat(bid.currentPrice.replace(/[^0-9.]/g, '')) > parseFloat(bid.bidAmount.replace(/[^0-9.]/g, '')) ? 'Above your bid' : 'Below your bid'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Your Position</p>
                      <p className="text-xl font-bold text-gray-900">#{bid.myPosition}</p>
                      <p className="text-sm text-gray-500">of {bid.totalBids} bidders</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openModal(bid)}
                        className="btn btn-secondary"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                      {bid.status === 'won' && (
                        <Link
                          to={`/orders/new?auction=${bid.auctionId}`}
                          className="btn btn-success"
                        >
                          <Package className="w-4 h-4 mr-2" />
                          Place Order
                        </Link>
                      )}
                    </div>
                    {bid.status === 'active' && (
                      <div className="flex items-center space-x-2">
                        <button className="btn btn-primary" onClick={() => setShowBidModal(bid)}>
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Increase Bid
                        </button>
                        <button className="btn btn-secondary" onClick={() => setShowAlertModal(bid)}>
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Set Alert
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Increase Bid Modal */}
        {showBidModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Increase Bid</h2>
                <button onClick={() => setShowBidModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4 text-gray-700">Enter your new maximum bid for <span className="font-semibold">{showBidModal.auctionTitle}</span>:</div>
              <input
                type="number"
                className="form-input w-full mb-4"
                placeholder="Enter new max bid"
                value={bidAmount}
                onChange={e => setBidAmount(e.target.value)}
                disabled={bidSubmitted}
              />
              {bidSubmitted ? (
                <div className="text-green-600 text-center font-medium mb-2">Bid updated!</div>
              ) : null}
              <div className="flex justify-end space-x-2">
                <button className="btn btn-secondary" onClick={() => setShowBidModal(null)} disabled={bidSubmitted}>Cancel</button>
                <button className="btn btn-primary" onClick={() => { setBidSubmitted(true); setTimeout(() => { setShowBidModal(null); setBidSubmitted(false); setBidAmount(''); }, 1500); }} disabled={!bidAmount || bidSubmitted}>Submit</button>
              </div>
            </div>
          </div>
        )}
        {/* Set Alert Modal */}
        {showAlertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Set Alert</h2>
                <button onClick={() => setShowAlertModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-4 text-gray-700">Set an alert for <span className="font-semibold">{showAlertModal.auctionTitle}</span>:</div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Alert Type</label>
                <select
                  className="form-select w-full"
                  value={alertType}
                  onChange={e => setAlertType(e.target.value)}
                  disabled={alertSubmitted}
                >
                  <option value="price">Price drops below</option>
                  <option value="position">My position is above</option>
                </select>
              </div>
              <input
                type="number"
                className="form-input w-full mb-4"
                placeholder={alertType === 'price' ? 'Enter price' : 'Enter position'}
                value={alertValue}
                onChange={e => setAlertValue(e.target.value)}
                disabled={alertSubmitted}
              />
              {alertSubmitted ? (
                <div className="text-green-600 text-center font-medium mb-2">Alert set!</div>
              ) : null}
              <div className="flex justify-end space-x-2">
                <button className="btn btn-secondary" onClick={() => setShowAlertModal(null)} disabled={alertSubmitted}>Cancel</button>
                <button className="btn btn-primary" onClick={() => { setAlertSubmitted(true); setTimeout(() => { setShowAlertModal(null); setAlertSubmitted(false); setAlertValue(''); }, 1500); }} disabled={!alertValue || alertSubmitted}>Set Alert</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auction Detail Modal */}
      {isModalOpen && selectedBid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Auction Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Header Info */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedBid.auctionTitle}</h3>
                  {getStatusBadge(selectedBid.status)}
                  {getPositionBadge(selectedBid.myPosition)}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Auction ID: {selectedBid.auctionId}</span>
                  <span>•</span>
                  <span>{selectedBid.supplier}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedBid.location}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {['General Info', 'Steel Details', 'Bidding Info', 'Warehouse & Delivery'].map((tab) => (
                    <button
                      key={tab}
                      className="py-2 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {/* General Info Tab */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">General Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">End Date</p>
                          <p className="text-gray-900">{new Date(selectedBid.endTime).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">Time Left</p>
                          <p className="text-gray-900">{selectedBid.timeLeft}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Bidders</p>
                          <p className="text-gray-900">{selectedBid.totalBids}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Building className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">Supplier</p>
                          <p className="text-gray-900">{selectedBid.supplier}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">Location</p>
                          <p className="text-gray-900">{selectedBid.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Tag className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">Status</p>
                          <p className="text-gray-900 capitalize">{selectedBid.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Steel Details Tab */}
                {selectedBid.steelDetails && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Steel Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Basic Information</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="font-medium">{selectedBid.steelDetails.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Grade:</span>
                              <span className="font-medium">{selectedBid.steelDetails.grade}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Quantity:</span>
                              <span className="font-medium">{selectedBid.steelDetails.quantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Dimensions:</span>
                              <span className="font-medium">{selectedBid.steelDetails.dimensions}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Specifications</h5>
                          <ul className="space-y-1">
                            {selectedBid.steelDetails.specifications.map((spec, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <Scale className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Certifications</h5>
                          <ul className="space-y-1">
                            {selectedBid.steelDetails.certifications.map((cert, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <Award className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                                {cert}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Warehouse & Storage</h5>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{selectedBid.steelDetails.warehouse}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Truck className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Available for pickup/delivery</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Product Images</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedBid.steelDetails.images.map((image, index) => (
                              <div key={index} className="bg-gray-100 rounded-lg p-2 text-center">
                                <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center">
                                  <span className="text-xs text-gray-500">Image {index + 1}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bidding Info Tab */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Bidding Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-2">Your Bid</h5>
                      <p className="text-2xl font-bold text-blue-600">{selectedBid.bidAmount}</p>
                      <p className="text-sm text-gray-500">Max: {selectedBid.maxBid}</p>
                    </div>
                    <div className="card p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-2">Current Price</h5>
                      <p className="text-2xl font-bold text-gray-900">{selectedBid.currentPrice}</p>
                      <div className="flex items-center text-sm mt-1">
                        {parseFloat(selectedBid.currentPrice.replace(/[^0-9.]/g, '')) > parseFloat(selectedBid.bidAmount.replace(/[^0-9.]/g, '')) ? (
                          <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                        )}
                        <span className={parseFloat(selectedBid.currentPrice.replace(/[^0-9.]/g, '')) > parseFloat(selectedBid.bidAmount.replace(/[^0-9.]/g, '')) ? 'text-red-500' : 'text-green-500'}>
                          {parseFloat(selectedBid.currentPrice.replace(/[^0-9.]/g, '')) > parseFloat(selectedBid.bidAmount.replace(/[^0-9.]/g, '')) ? 'Above your bid' : 'Below your bid'}
                        </span>
                      </div>
                    </div>
                    <div className="card p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-2">Your Position</h5>
                      <p className="text-2xl font-bold text-gray-900">#{selectedBid.myPosition}</p>
                      <p className="text-sm text-gray-500">of {selectedBid.totalBids} bidders</p>
                    </div>
                  </div>
                </div>

                {/* Warehouse & Delivery Tab */}
                {selectedBid.steelDetails && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Warehouse & Delivery Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Warehouse Details</h5>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{selectedBid.steelDetails.warehouse}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{selectedBid.location}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Delivery Options</h5>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Truck className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Standard delivery (3-5 business days)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Zap className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Express delivery (1-2 business days)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Package className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Self pickup available</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Payment Terms</h5>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Net 30 days</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Shield className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Escrow protection available</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Quality Assurance</h5>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600">Material test reports included</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600">Quality inspection available</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600">Return policy: 7 days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
                <div className="flex items-center space-x-2">
                  {selectedBid.status === 'won' && (
                    <Link
                      to={`/orders/new?auction=${selectedBid.auctionId}`}
                      className="btn btn-success"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Place Order
                    </Link>
                  )}
                  {selectedBid.status === 'active' && (
                    <button className="btn btn-primary">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Increase Bid
                    </button>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBids 