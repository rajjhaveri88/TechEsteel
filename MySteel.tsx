import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Package, 
  Edit, 
  Trash2, 
  Plus, 
  Award, 
  Shield, 
  FileText, 
  Image, 
  Upload,
  Eye,
  Download,
  Gavel,
  Store,
  Settings,
  Camera,
  Grid3X3,
  List,
  Filter,
  Search,
  MapPin
} from 'lucide-react'
import DetailModal from '../components/DetailModal'

interface Steel {
  id: string
  name: string
  grade: string
  specification: string
  type: string
  form: string
  quantity: number
  unit: string
  price: number
  location: string
  seller: string
  description: string
  status: 'available' | 'auction' | 'marketplace' | 'sold'
  warehouse: string
  images: string[]
  documents: {
    name: string
    type: string
    url: string
    size: string
  }[]
  specifications: {
    thickness?: string
    width?: string
    length?: string
    diameter?: string
    yieldStrength?: string
    tensileStrength?: string
    elongation?: string
    hardness?: string
  }
  chemicalComposition: {
    carbon?: string
    manganese?: string
    phosphorus?: string
    sulfur?: string
    silicon?: string
    chromium?: string
    nickel?: string
    molybdenum?: string
  }
  certifications: string[]
  qualityAssurance: {
    millTestReport: boolean
    thirdPartyInspection: boolean
    ultrasonicTesting: boolean
    magneticParticleTesting: boolean
  }
  packaging: string
  deliveryTerms: string
  paymentTerms: string
  minimumOrder: number
  leadTime: string
  condition: string
  surfaceFinish: string
  tolerance: string
  applications: string[]
  createdAt: string
}

const MySteel: React.FC = () => {
  const [steelListings, setSteelListings] = useState<Steel[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'available' | 'auction' | 'marketplace' | 'sold'>('all')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSteel, setSelectedSteel] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Add state for edit and delete modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editSteel, setEditSteel] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMySteel()
  }, [])

  const fetchMySteel = async () => {
    try {
      // Mock data with enhanced features
      const mockSteel: Steel[] = [
        {
          id: "STEEL-001",
          name: "Premium Carbon Steel Sheets",
          grade: "AISI 1018",
          specification: "ASTM A36",
          type: "Carbon Steel",
          form: "Sheet",
          quantity: 50,
          unit: "tons",
          price: 850,
          location: "Mumbai, India",
          seller: "John Doe",
          description: "High-quality carbon steel sheets suitable for structural applications",
          status: "available",
          warehouse: "Mumbai Central Warehouse",
          images: [
            "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
          ],
          documents: [
            {
              name: "Mill Test Report.pdf",
              type: "pdf",
              url: "#",
              size: "2.3 MB"
            },
            {
              name: "Packing List.pdf",
              type: "pdf", 
              url: "#",
              size: "1.1 MB"
            }
          ],
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
          certifications: ["ISO 9001", "ASTM A36"],
          qualityAssurance: {
            millTestReport: true,
            thirdPartyInspection: true,
            ultrasonicTesting: false,
            magneticParticleTesting: false
          },
          packaging: "Standard wooden crates",
          deliveryTerms: "FOB Mumbai",
          paymentTerms: "30 days after delivery",
          minimumOrder: 5,
          leadTime: "2-3 weeks",
          condition: "New",
          surfaceFinish: "Hot rolled",
          tolerance: "±0.5mm",
          applications: ["Construction", "Manufacturing", "Infrastructure"],
          createdAt: "2024-01-15"
        },
        {
          id: "STEEL-002",
          name: "Stainless Steel 304 Coils",
          grade: "AISI 304",
          specification: "ASTM A240",
          type: "Stainless Steel",
          form: "Coil",
          quantity: 25,
          unit: "tons",
          price: 2200,
          location: "Chennai, India",
          seller: "John Doe",
          description: "Premium stainless steel coils for corrosion-resistant applications",
          status: "auction",
          warehouse: "Chennai Port Warehouse",
          images: [
            "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
          ],
          documents: [
            {
              name: "Certificate of Analysis.pdf",
              type: "pdf",
              url: "#",
              size: "3.1 MB"
            }
          ],
          specifications: {
            thickness: "2mm",
            width: "1000mm",
            yieldStrength: "205 MPa",
            tensileStrength: "520 MPa"
          },
          chemicalComposition: {
            carbon: "0.08%",
            manganese: "2.0%",
            chromium: "18.0%",
            nickel: "8.0%"
          },
          certifications: ["ISO 14001", "ASTM A240"],
          qualityAssurance: {
            millTestReport: true,
            thirdPartyInspection: true,
            ultrasonicTesting: true,
            magneticParticleTesting: false
          },
          packaging: "Plastic wrapped coils",
          deliveryTerms: "FOB Chennai",
          paymentTerms: "Letter of Credit",
          minimumOrder: 2,
          leadTime: "1-2 weeks",
          condition: "New",
          surfaceFinish: "2B finish",
          tolerance: "±0.3mm",
          applications: ["Food Processing", "Chemical Industry", "Medical Equipment"],
          createdAt: "2024-01-20"
        }
      ]
      
      setSteelListings(mockSteel)
    } catch (error) {
      console.error('Error fetching steel listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="status-badge status-active">Available</span>
      case 'auction':
        return <span className="status-badge status-auction">In Auction</span>
      case 'marketplace':
        return <span className="status-badge status-marketplace">Marketplace</span>
      case 'sold':
        return <span className="status-badge status-success">Sold</span>
      default:
        return <span className="status-badge status-inactive">Unknown</span>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Package className="w-4 h-4" />
      case 'auction':
        return <Gavel className="w-4 h-4" />
      case 'marketplace':
        return <Store className="w-4 h-4" />
      case 'sold':
        return <Award className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const filteredSteel = steelListings.filter(steel => {
    const matchesStatus = selectedStatus === 'all' || steel.status === selectedStatus
    const matchesSearch = steel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         steel.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         steel.type.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Steel</h1>
              <p className="mt-2 text-gray-600">Manage your steel listings</p>
            </div>
            <div className="card p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-20 bg-gray-200 rounded"></div>
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
                <h1 className="text-3xl font-bold text-gray-900">My Steel Inventory</h1>
                <p className="text-gray-600 mt-1">Manage your steel listings and track their status</p>
              </div>
              <div className="mt-4 lg:mt-0 flex space-x-3">
                <Link to="/create-steel" className="btn btn-primary">
                  <Plus className="w-4 h-4" />
                  <span>Add Steel</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="card p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search steel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="auction">In Auction</option>
                  <option value="marketplace">In Marketplace</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              {/* Layout Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">View:</span>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setLayout('grid')}
                    className={`p-2 transition-colors ${
                      layout === 'grid' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    className={`p-2 transition-colors ${
                      layout === 'list' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Steel Listings */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 border border-gray-200 shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredSteel.length === 0 ? (
            <div className="card p-12 text-center border border-gray-200 shadow-sm">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Steel Found</h3>
              <p className="text-gray-600 mb-6">You haven't added any steel listings yet.</p>
              <Link to="/create-steel" className="btn btn-primary">
                <Plus className="w-4 h-4" />
                <span>Add Your First Steel</span>
              </Link>
            </div>
          ) : (
            <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredSteel.map((steel) => (
                <div key={steel.id} className={`card border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${layout === 'list' ? 'p-6' : 'p-6'}`}>
                  {layout === 'grid' ? (
                    // Grid Layout
                    <>
                      {/* Image Section */}
                      <div className="relative mb-4">
                        <img
                          src={steel.images[0] || 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80'}
                          alt={steel.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 flex flex-col space-y-1">
                          {getStatusBadge(steel.status)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{steel.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {steel.grade}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                              {steel.type}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Quantity:</span>
                            <div className="font-semibold">{steel.quantity} {steel.unit}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Price:</span>
                            <div className="font-semibold text-green-600">${steel.price}/{steel.unit}</div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{steel.warehouse}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => {
                              setSelectedSteel(steel)
                              setIsModalOpen(true)
                            }}
                            className="flex-1 btn btn-secondary text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          <button
                            onClick={() => {
                              navigate(`/edit-steel/${steel.id}`, { state: { initialValues: steel, mode: 'edit' } });
                            }}
                            className="btn btn-secondary text-sm"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="btn btn-danger text-sm"
                            onClick={() => {
                              setEditSteel(steel);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Restore the original list layout
                    <div className="flex items-center space-x-4">
                      {/* Image */}
                      <div className="relative">
                        <img
                          src={steel.images[0] || 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80'}
                          alt={steel.name}
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
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{steel.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {steel.grade}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                {steel.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{steel.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{steel.quantity} {steel.unit}</span>
                              <span className="text-green-600 font-semibold">${steel.price}/{steel.unit}</span>
                              <span>{steel.warehouse}</span>
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
                          onClick={() => {
                            navigate(`/edit-steel/${steel.id}`, { state: { initialValues: steel, mode: 'edit' } });
                          }}
                          className="btn btn-secondary text-sm"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="btn btn-danger text-sm"
                          onClick={() => {
                            setEditSteel(steel);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="steel"
        data={selectedSteel}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && editSteel && (
        <DetailModal
          isOpen={true} // Always open for deletion
          onClose={() => setIsDeleteModalOpen(false)}
          type="delete"
          data={editSteel}
        />
      )}
    </div>
  )
}

export default MySteel