import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { 
  Package, MapPin, DollarSign, Award, Shield, FileText, 
  Thermometer, Zap, Ruler, HardDrive, Clock, Truck, CreditCard,
  ArrowLeft, Eye, Download, Edit, Trash2
} from 'lucide-react'

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
  specifications: {
    thickness?: string
    width?: string
    length?: string
    diameter?: string
    yieldStrength?: string
    tensileStrength?: string
    elongation?: string
    hardness?: string
    density?: string
    thermalConductivity?: string
    electricalResistivity?: string
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
    vanadium?: string
    nitrogen?: string
    copper?: string
  }
  certifications: string[]
  qualityAssurance: {
    millTestReport: boolean
    thirdPartyInspection: boolean
    ultrasonicTesting: boolean
    magneticParticleTesting: boolean
    chemicalAnalysis: boolean
    mechanicalTesting: boolean
    dimensionalInspection: boolean
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

const SteelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [steel, setSteel] = useState<Steel | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (id) {
      fetchSteel()
    }
  }, [id])

  const fetchSteel = async () => {
    try {
      const response = await fetch(`/api/steel/${id}`)
      const data = await response.json()
      setSteel(data)
    } catch (error) {
      console.error('Error fetching steel:', error)
      toast.error('Failed to load steel details')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Package },
    { id: 'specifications', name: 'Specifications', icon: Ruler },
    { id: 'chemical', name: 'Chemical Composition', icon: Thermometer },
    { id: 'quality', name: 'Quality & Certifications', icon: Shield },
    { id: 'commercial', name: 'Commercial Terms', icon: CreditCard }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!steel) {
    return (
      <div className="space-y-6">
        <div className="card p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Steel Not Found</h2>
          <p className="text-gray-600">The steel listing you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Link to="/my-steel" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to My Steel</span>
              </Link>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-xl font-bold text-gray-900">{steel.name}</h1>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full border border-blue-200">
                    {steel.grade}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-green-200">
                    {steel.type}
                  </span>
                </div>
                <p className="text-gray-600 text-lg">{steel.description}</p>
              </div>
              <div className="mt-4 lg:mt-0 flex space-x-3">
                <button className="btn btn-secondary">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="btn btn-danger">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">{steel.quantity}</div>
              <div className="text-sm text-gray-600">{steel.unit} Available</div>
            </div>
            <div className="card p-6 text-center border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">${steel.price}</div>
              <div className="text-sm text-gray-600">Per {steel.unit}</div>
            </div>
            <div className="card p-6 text-center border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{steel.location}</div>
              <div className="text-sm text-gray-600">Location</div>
            </div>
            <div className="card p-6 text-center border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{steel.leadTime}</div>
              <div className="text-sm text-gray-600">Lead Time</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="card border border-gray-200 shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Steel Type:</span>
                          <span className="font-medium">{steel.type}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Form:</span>
                          <span className="font-medium">{steel.form}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Condition:</span>
                          <span className="font-medium">{steel.condition}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Surface Finish:</span>
                          <span className="font-medium">{steel.surfaceFinish}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Tolerance:</span>
                          <span className="font-medium">{steel.tolerance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
                      <div className="flex flex-wrap gap-2">
                        {steel.applications.map((app, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200">
                            {app}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mt-6">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {steel.certifications.map((cert, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full border border-blue-200">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Physical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steel.specifications.thickness && (
                      <div className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <Ruler className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-600">Thickness</div>
                            <div className="font-semibold">{steel.specifications.thickness}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {steel.specifications.width && (
                      <div className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <Ruler className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="text-sm text-gray-600">Width</div>
                            <div className="font-semibold">{steel.specifications.width}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {steel.specifications.length && (
                      <div className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <Ruler className="w-5 h-5 text-purple-600" />
                          <div>
                            <div className="text-sm text-gray-600">Length</div>
                            <div className="font-semibold">{steel.specifications.length}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {steel.specifications.diameter && (
                      <div className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <Ruler className="w-5 h-5 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-600">Diameter</div>
                            <div className="font-semibold">{steel.specifications.diameter}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-8">Mechanical Properties</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steel.specifications.yieldStrength && (
                      <div className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <Zap className="w-5 h-5 text-yellow-600" />
                          <div>
                            <div className="text-sm text-gray-600">Yield Strength</div>
                            <div className="font-semibold">{steel.specifications.yieldStrength}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {steel.specifications.tensileStrength && (
                      <div className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <Zap className="w-5 h-5 text-orange-600" />
                          <div>
                            <div className="text-sm text-gray-600">Tensile Strength</div>
                            <div className="font-semibold">{steel.specifications.tensileStrength}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {steel.specifications.elongation && (
                      <div className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <Zap className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="text-sm text-gray-600">Elongation</div>
                            <div className="font-semibold">{steel.specifications.elongation}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {steel.specifications.hardness && (
                      <div className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <HardDrive className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-600">Hardness</div>
                            <div className="font-semibold">{steel.specifications.hardness}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Chemical Composition Tab */}
              {activeTab === 'chemical' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Chemical Composition</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(steel.chemicalComposition).map(([element, value]) => (
                      <div key={element} className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <Thermometer className="w-5 h-5 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-600 capitalize">{element}</div>
                            <div className="font-semibold">{value}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quality & Certifications Tab */}
              {activeTab === 'quality' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Quality Assurance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(steel.qualityAssurance).map(([test, available]) => (
                      <div key={test} className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-blue-600" />
                            <span className="font-medium capitalize">{test.replace(/([A-Z])/g, ' $1').trim()}</span>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            available 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                            {available ? 'Available' : 'Not Available'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Commercial Terms Tab */}
              {activeTab === 'commercial' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Commercial Terms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3 mb-3">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold">Pricing</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price per {steel.unit}:</span>
                            <span className="font-medium">${steel.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Minimum Order:</span>
                            <span className="font-medium">{steel.minimumOrder} {steel.unit}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3 mb-3">
                          <Truck className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold">Delivery</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Terms:</span>
                            <span className="font-medium">{steel.deliveryTerms}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Lead Time:</span>
                            <span className="font-medium">{steel.leadTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Packaging:</span>
                            <span className="font-medium">{steel.packaging}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="card p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3 mb-3">
                          <CreditCard className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold">Payment</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Terms:</span>
                            <span className="font-medium">{steel.paymentTerms}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SteelDetail 