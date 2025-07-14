import React, { useState, useEffect } from 'react'
import { 
  X, 
  Package, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Gavel, 
  Star,
  Award,
  Shield,
  Truck,
  FileText,
  Download,
  Eye,
  Thermometer,
  Zap,
  Ruler,
  HardDrive,
  CreditCard,
  User,
  CheckCircle,
  Calendar,
  Warehouse,
  TrendingUp,
  AlertCircle,
  Settings,
  Info,
  BarChart3,
  Layers,
  Tag,
  Globe,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Timer,
  Target,
  Scale,
  TestTube,
  FileCheck,
  Lock,
  Unlock,
  Edit3,
  Share2,
  Bookmark,
  Heart
} from 'lucide-react'
import { formatCurrencyINR } from '../utils/formatCurrencyINR';

interface DetailModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'steel' | 'auction' | 'marketplace'
  data: any
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, type, data }) => {
  const [activeTab, setActiveTab] = useState('overview')
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const formatPrice = (price: number) => formatCurrencyINR(price);

  const formatTimeLeft = (timeLeft: string) => {
    return timeLeft
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'available':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          Active
        </span>
      case 'ending':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
          Ending Soon
        </span>
      case 'auction':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
          In Auction
        </span>
      case 'marketplace':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
          In Marketplace
        </span>
      case 'sold':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
          Sold
        </span>
      case 'limited':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
          Limited Stock
        </span>
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
          {status}
        </span>
    }
  }

  const getTabs = () => {
    const baseTabs = [
      { id: 'overview', name: 'Overview', icon: Info },
      { id: 'specifications', name: 'Specifications', icon: Settings },
      { id: 'chemical', name: 'Chemical Analysis', icon: TestTube },
               { id: 'certifications', name: 'Certifications', icon: FileCheck },
      { id: 'commercial', name: 'Commercial Terms', icon: CreditCard },
      { id: 'shipping', name: 'Shipping & Delivery', icon: Truck }
    ]

    if (type === 'auction') {
      const tabs = [
        { id: 'overview', name: 'Auction Overview', icon: Gavel },
        { id: 'specifications', name: 'Steel Specifications', icon: Settings },
        { id: 'chemical', name: 'Chemical Analysis', icon: TestTube },
        { id: 'bidding', name: 'Bidding History', icon: BarChart3 },
        { id: 'certifications', name: 'Certifications', icon: FileCheck },
        { id: 'shipping', name: 'Shipping & Delivery', icon: Truck }
      ]
      
      // Add management tab for seller's own auctions
      if (data?.seller === 'John Doe') {
        tabs.push({ id: 'management', name: 'Auction Management', icon: Settings })
      }
      
      return tabs
    }

    return baseTabs
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={data.image || data.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80'}
                alt={data.title || data.name}
                className="w-full h-full object-cover"
              />
              {data.images && data.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {data.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {data.images && data.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {data.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  {data?.title || data?.name || 'Product Details'}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {data?.description || 'No description available'}
              </p>
            </div>

            {/* Status and Badges */}
            <div className="flex items-center space-x-3">
              {getStatusBadge(data?.status || 'unknown')}
              {data?.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </span>
              )}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {type === 'auction' ? (
                <>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Current Bid</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{formatPrice(data?.currentPrice || 0)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Total Bids</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">{data?.bidCount || 0}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Package className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Available</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {data.quantity} {data.unit}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Price</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      {type === 'marketplace' ? data.price : formatPrice(data.price)}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Auction Timer */}
            {type === 'auction' && (
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Timer className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-700">Time Remaining</span>
                </div>
                <div className="text-xl font-bold text-red-900">
                  {formatTimeLeft(data.timeLeft)}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex space-x-3">
              {type === 'auction' && data.seller !== 'John Doe' ? (
                <button className="flex-1 btn btn-primary">
                  <Gavel className="w-4 h-4" />
                  <span>Place Bid</span>
                </button>
              ) : type === 'auction' && data.seller === 'John Doe' ? (
                <button className="flex-1 btn btn-secondary">
                  <Eye className="w-4 h-4" />
                  <span>View Bids</span>
                </button>
              ) : type === 'marketplace' ? (
                <button className="flex-1 btn btn-primary">
                  <Phone className="w-4 h-4" />
                  <span>Contact Supplier</span>
                </button>
              ) : (
                <button className="flex-1 btn btn-primary">
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Listing</span>
                </button>
              )}
              <button className="btn btn-secondary">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="btn btn-secondary">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Tag className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Product Details</h4>
              <p className="text-sm text-gray-600">Basic specifications</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Grade:</span>
              <span className="font-medium">{data.grade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{data.type || data.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Form:</span>
              <span className="font-medium">{data.form || 'Standard'}</span>
            </div>
            {data.dimensions && (
              <div className="flex justify-between">
                <span className="text-gray-600">Dimensions:</span>
                <span className="font-medium">{data.dimensions}</span>
              </div>
            )}
          </div>
        </div>

        <div className="card p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Location</h4>
              <p className="text-sm text-gray-600">Storage & pickup</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{data.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Warehouse:</span>
              <span className="font-medium">{data.warehouse}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Available:</span>
              <span className="font-medium">{data.quantity} {data.unit}</span>
            </div>
          </div>
        </div>

        <div className="card p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Seller Info</h4>
              <p className="text-sm text-gray-600">Company details</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">
                {typeof data.seller === 'string' ? data.seller : data.seller?.name || data.supplier}
              </span>
            </div>
            {data.seller?.rating && (
              <div className="flex justify-between">
                <span className="text-gray-600">Rating:</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{data.seller.rating}</span>
                </div>
              </div>
            )}
            {data.seller?.verified && (
              <div className="flex justify-between">
                <span className="text-gray-600">Verified:</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderSpecifications = () => (
    <div className="space-y-8">
      {/* Mechanical Properties */}
      <div className="card p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Zap className="w-4 h-4 text-blue-600 mr-2" />
          Mechanical Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.specifications?.tensileStrength && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Tensile Strength</span>
              </div>
              <div className="text-lg font-bold text-blue-900">{data.specifications.tensileStrength}</div>
            </div>
          )}
          {data.specifications?.yieldStrength && (
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Yield Strength</span>
              </div>
              <div className="text-lg font-bold text-green-900">{data.specifications.yieldStrength}</div>
            </div>
          )}
          {data.specifications?.elongation && (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Ruler className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Elongation</span>
              </div>
              <div className="text-lg font-bold text-purple-900">{data.specifications.elongation}</div>
            </div>
          )}
          {data.specifications?.hardness && (
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <HardDrive className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">Hardness</span>
              </div>
              <div className="text-lg font-bold text-orange-900">{data.specifications.hardness}</div>
            </div>
          )}
        </div>
      </div>

      {/* Physical Properties */}
      <div className="card p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Layers className="w-4 h-4 text-green-600 mr-2" />
          Physical Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.specifications?.thickness && (
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-center space-x-2 mb-2">
                <Ruler className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">Thickness</span>
              </div>
              <div className="text-lg font-bold text-indigo-900">{data.specifications.thickness}</div>
            </div>
          )}
          {data.specifications?.width && (
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <Ruler className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">Width</span>
              </div>
              <div className="text-lg font-bold text-red-900">{data.specifications.width}</div>
            </div>
          )}
          {data.specifications?.length && (
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <Ruler className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">Length</span>
              </div>
              <div className="text-lg font-bold text-yellow-900">{data.specifications.length}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderChemicalAnalysis = () => (
    <div className="space-y-8">
      <div className="card p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <TestTube className="w-4 h-4 text-purple-600 mr-2" />
          Chemical Composition
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.chemicalComposition && Object.entries(data.chemicalComposition).map(([element, percentage]) => (
            <div key={element} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700 capitalize">{element}</span>
              </div>
              <div className="text-lg font-bold text-gray-900">{String(percentage)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCertifications = () => (
    <div className="space-y-8">
      <div className="card p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <FileCheck className="w-4 h-4 text-green-600 mr-2" />
          Certifications & Standards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.certifications && data.certifications.map((cert: string, index: number) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <FileCheck className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-800">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Assurance */}
      {data.qualityAssurance && (
        <div className="card p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="w-4 h-4 text-blue-600 mr-2" />
            Quality Assurance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data.qualityAssurance).map(([test, available]) => (
              <div key={test} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="font-medium text-gray-700 capitalize">
                  {test.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {available ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderCommercialTerms = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <CreditCard className="w-4 h-4 text-blue-600 mr-2" />
            Payment Terms
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Terms:</span>
              <span className="font-medium">{data.paymentTerms || 'TBD'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Minimum Order:</span>
              <span className="font-medium">{data.minimumOrder || data.minOrder} {data.unit}</span>
            </div>
            {type === 'marketplace' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-medium">{data.reviews}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{data.rating}/5</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Clock className="w-4 h-4 text-green-600 mr-2" />
            Delivery Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Lead Time:</span>
              <span className="font-medium">{data.leadTime || data.delivery}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Terms:</span>
              <span className="font-medium">{data.deliveryTerms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Packaging:</span>
              <span className="font-medium">{data.packaging}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderShipping = () => (
    <div className="space-y-8">
      <div className="card p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Truck className="w-4 h-4 text-blue-600 mr-2" />
          Shipping & Delivery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Truck className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-sm text-gray-600">Method</div>
                <div className="font-semibold">{data.shipping?.method || 'Standard'}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-green-600" />
              <div>
                <div className="text-sm text-gray-600">Lead Time</div>
                <div className="font-semibold">{data.shipping?.leadTime || data.leadTime}</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Package className="w-4 h-4 text-purple-600" />
              <div>
                <div className="text-sm text-gray-600">Packaging</div>
                <div className="font-semibold">{data.shipping?.packaging || data.packaging}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-4 h-4 text-orange-600" />
              <div>
                <div className="text-sm text-gray-600">Insurance</div>
                <div className="font-semibold">{data.shipping?.insurance || 'Included'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderBiddingHistory = () => (
    <div className="space-y-8">
      <div className="card p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="w-4 h-4 text-blue-600 mr-2" />
          Bidding History
        </h3>
        {data.bids && data.bids.length > 0 ? (
          <div className="space-y-4">
            {data?.bids?.map((bid: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <div className="font-medium text-gray-900">{bid?.bidder || 'Unknown Bidder'}</div>
                  <div className="text-sm text-gray-600">
                    {bid?.time || bid?.timestamp ? new Date(bid.time || bid.timestamp).toLocaleString() : 'Unknown time'}
                  </div>
                </div>
                <div className="text-lg font-bold text-green-600">
                  {formatPrice(bid?.amount || 0)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No bids yet. Be the first to bid!</p>
          </div>
        )}
      </div>
    </div>
  )

  const renderAuctionManagement = () => (
    <div className="space-y-8">
      {/* Auction Statistics */}
      <div className="card p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="w-4 h-4 text-blue-600 mr-2" />
          Auction Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{data.bidCount || 0}</div>
            <div className="text-sm text-blue-700">Total Bids</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">{data.viewCount || 0}</div>
            <div className="text-sm text-green-700">Total Views</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">{formatPrice(data.currentPrice)}</div>
            <div className="text-sm text-purple-700">Current Bid</div>
          </div>
        </div>
      </div>

      {/* Auction Actions */}
      <div className="card p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Settings className="w-4 h-4 text-blue-600 mr-2" />
          Auction Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn btn-secondary flex items-center justify-center space-x-2">
            <Edit3 className="w-4 h-4" />
            <span>Edit Auction</span>
          </button>
          <button className="btn btn-secondary flex items-center justify-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Promote Auction</span>
          </button>
          <button className="btn btn-warning flex items-center justify-center space-x-2">
            <Pause className="w-4 h-4" />
            <span>Pause Auction</span>
          </button>
          <button className="btn btn-danger flex items-center justify-center space-x-2">
            <X className="w-4 h-4" />
            <span>Cancel Auction</span>
          </button>
        </div>
      </div>

      {/* Reserve Price Management */}
      <div className="card p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Target className="w-4 h-4 text-blue-600 mr-2" />
          Reserve Price Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Current Reserve Price</div>
              <div className="text-sm text-gray-600">Minimum acceptable bid</div>
            </div>
            <div className="text-lg font-bold text-blue-600">
              {formatPrice(data.reservePrice)}
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <div className="font-medium text-green-900">Reserve Met</div>
              <div className="text-sm text-green-700">
                {data.currentPrice >= data.reservePrice ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="text-sm text-green-600">
              {data.currentPrice >= data.reservePrice ? '✅' : '❌'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'specifications':
        return renderSpecifications()
      case 'chemical':
        return renderChemicalAnalysis()
      case 'certifications':
        return renderCertifications()
      case 'commercial':
        return renderCommercialTerms()
      case 'shipping':
        return renderShipping()
      case 'bidding':
        return renderBiddingHistory()
      case 'management':
        return renderAuctionManagement()
      default:
        return renderOverview()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {type === 'auction' ? (
                  <Gavel className="w-6 h-6 text-white" />
                ) : (
                  <Package className="w-6 h-6 text-white" />
                )}
                <h2 className="text-lg font-bold text-white">
                  {type === 'auction' ? 'Auction Details' : 'Steel Product Details'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-1 overflow-x-auto px-6">
              {getTabs().map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-3 px-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {renderTabContent()}
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <button className="btn btn-secondary">
                  <Download className="w-4 h-4" />
                  <span>Download Specs</span>
                </button>
                <button className="btn btn-secondary">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
              <div className="flex space-x-3">
                {type === 'auction' && data?.seller !== 'John Doe' && (
                  <button className="btn btn-primary">
                    <Gavel className="w-4 h-4" />
                    <span>Place Bid</span>
                  </button>
                )}
                {type === 'auction' && data?.seller === 'John Doe' && (
                  <button className="btn btn-secondary">
                    <Eye className="w-4 h-4" />
                    <span>View Bids</span>
                  </button>
                )}
                {type === 'marketplace' && (
                  <button className="btn btn-primary">
                    <Phone className="w-4 h-4" />
                    <span>Contact Supplier</span>
                  </button>
                )}
                <button onClick={onClose} className="btn btn-secondary">
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailModal 