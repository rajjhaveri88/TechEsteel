import React, { useState, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { 
  Package, 
  Save, 
  Plus, 
  X, 
  Upload, 
  Info,
  MapPin,
  Warehouse,
  FileText,
  Award,
  Truck,
  DollarSign,
  Settings,
  CheckCircle,
  AlertCircle,
  Gavel,
  Store
} from 'lucide-react'

interface CreateSteelProps {
  initialValues?: any;
  mode?: 'create' | 'edit';
}

const flattenSteelData = (steel: any) => {
  if (!steel) return {};
  return {
    // Top-level fields
    ...steel,
    // Specifications
    tensileStrength: steel.specifications?.tensileStrength || '',
    yieldStrength: steel.specifications?.yieldStrength || '',
    elongation: steel.specifications?.elongation || '',
    hardness: steel.specifications?.hardness || '',
    thickness: steel.specifications?.thickness || '',
    width: steel.specifications?.width || '',
    length: steel.specifications?.length || '',
    diameter: steel.specifications?.diameter || '',
    // Chemical Composition
    carbon: steel.chemicalComposition?.carbon || '',
    manganese: steel.chemicalComposition?.manganese || '',
    phosphorus: steel.chemicalComposition?.phosphorus || '',
    sulfur: steel.chemicalComposition?.sulfur || '',
    silicon: steel.chemicalComposition?.silicon || '',
    chromium: steel.chemicalComposition?.chromium || '',
    nickel: steel.chemicalComposition?.nickel || '',
    molybdenum: steel.chemicalComposition?.molybdenum || '',
    // Quality Assurance
    millTestReport: steel.qualityAssurance?.millTestReport || false,
    thirdPartyInspection: steel.qualityAssurance?.thirdPartyInspection || false,
    ultrasonicTesting: steel.qualityAssurance?.ultrasonicTesting || false,
    magneticParticleTesting: steel.qualityAssurance?.magneticParticleTesting || false,
  };
};

const CreateSteel: React.FC<CreateSteelProps> = ({ initialValues: propInitialValues, mode = 'create' }) => {
  const location = useLocation();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(mode === 'edit');
  // Prefer navigation state, then prop, then empty
  const navInitialValues = location.state?.initialValues;
  const [formData, setFormData] = useState<any>(
    navInitialValues
      ? flattenSteelData(navInitialValues)
      : propInitialValues
      ? flattenSteelData(propInitialValues)
      : {
          // ... default fields ...
          title: '', description: '', category: '', grade: '', quantity: '', unit: 'tons', dimensions: '',
          warehouse: '', warehouseAddress: '', warehouseContact: '', warehousePhone: '',
          pricePerUnit: '', currency: 'USD', minimumOrder: '', bulkDiscount: false, bulkDiscountPercentage: '',
          tensileStrength: '', yieldStrength: '', elongation: '', hardness: '', thickness: '', width: '', length: '', diameter: '',
          carbon: '', manganese: '', phosphorus: '', sulfur: '', silicon: '', chromium: '', nickel: '', molybdenum: '',
          certifications: [''], millTestReport: false, thirdPartyInspection: false, ultrasonicTesting: false, magneticParticleTesting: false,
          qualityAssurance: '', testingMethods: '', inspectionReport: false, materialTestReport: false,
          packaging: '', deliveryMethod: '', leadTime: '', insurance: false, insuranceAmount: '',
          paymentTerms: '', incoterms: '', warranty: '', returnPolicy: '',
          applications: [''], specialRequirements: '', notes: ''
        }
  );

  const [certifications, setCertifications] = useState([''])
  const [applications, setApplications] = useState([''])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [nextAction, setNextAction] = useState<'auction' | 'marketplace' | 'skip'>('skip')

  // Pre-fill certifications and applications arrays if present
  useEffect(() => {
    if (formData.certifications && Array.isArray(formData.certifications)) {
      setCertifications(formData.certifications);
    }
    if (formData.applications && Array.isArray(formData.applications)) {
      setApplications(formData.applications);
    }
  }, [formData.certifications, formData.applications]);

  // Fetch steel data by ID if in edit mode and no initial values
  useEffect(() => {
    if (mode === 'edit' && !navInitialValues && id) {
      setLoading(true);
      fetch(`/api/steel/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData(flattenSteelData(data));
          if (data.certifications) setCertifications(data.certifications);
          if (data.applications) setApplications(data.applications);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [mode, navInitialValues, id]);

  const categories = [
    'Carbon Steel',
    'Stainless Steel',
    'Alloy Steel',
    'Tool Steel',
    'Galvanized Steel',
    'Spring Steel',
    'Structural Steel',
    'Pipe Steel'
  ]

  const grades = {
    'Carbon Steel': ['A36', 'A572', 'A588', 'A709', 'A992'],
    'Stainless Steel': ['304', '316', '316L', '321', '347', '410', '420'],
    'Alloy Steel': ['4140', '4340', '8620', '9310', '52100'],
    'Tool Steel': ['D2', 'H13', 'M2', 'P20', 'S7'],
    'Galvanized Steel': ['G90', 'G60', 'G40', 'A653'],
    'Spring Steel': ['1074', '1095', '5160', '9260'],
    'Structural Steel': ['A500', 'A501', 'A53', 'A106'],
    'Pipe Steel': ['API 5L', 'ASTM A53', 'ASTM A106', 'ASTM A333']
  }

  const warehouses = [
    {
      id: 1,
      name: 'NYC Warehouse A',
      address: '123 Steel Street, New York, NY 10001',
      contact: 'John Smith',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      name: 'Chicago Distribution Center',
      address: '456 Metal Avenue, Chicago, IL 60601',
      contact: 'Sarah Johnson',
      phone: '+1 (555) 234-5678'
    },
    {
      id: 3,
      name: 'Houston Steel Hub',
      address: '789 Iron Road, Houston, TX 77001',
      contact: 'Mike Davis',
      phone: '+1 (555) 345-6789'
    },
    {
      id: 4,
      name: 'LA Metal Storage',
      address: '321 Alloy Boulevard, Los Angeles, CA 90001',
      contact: 'Lisa Wilson',
      phone: '+1 (555) 456-7890'
    }
  ]

  const deliveryMethods = [
    'FOB Factory',
    'FOB Destination',
    'CIF',
    'CIP',
    'DDP',
    'EXW'
  ]

  const paymentTerms = [
    'Net 30',
    'Net 60',
    'Net 90',
    '50% Advance, 50% on Delivery',
    '100% Advance',
    'Letter of Credit'
  ]

  const incoterms = [
    'EXW - Ex Works',
    'FCA - Free Carrier',
    'CPT - Carriage Paid To',
    'CIP - Carriage and Insurance Paid To',
    'DAP - Delivered at Place',
    'DPU - Delivered at Place Unloaded',
    'DDP - Delivered Duty Paid',
    'FAS - Free Alongside Ship',
    'FOB - Free on Board',
    'CFR - Cost and Freight',
    'CIF - Cost, Insurance and Freight'
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  const addCertification = () => {
    setCertifications([...certifications, ''])
  }

  const removeCertification = (index: number) => {
    const newCertifications = certifications.filter((_, i) => i !== index)
    setCertifications(newCertifications)
    setFormData((prev: any) => ({
      ...prev,
      certifications: newCertifications
    }))
  }

  const updateCertification = (index: number, value: string) => {
    setCertifications((prev: any) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
    setFormData((prev: any) => ({
      ...prev,
      certifications: certifications.map((c, i) => (i === index ? value : c))
    }))
  }

  const addApplication = () => {
    setApplications([...applications, ''])
  }

  const removeApplication = (index: number) => {
    const newApplications = applications.filter((_, i) => i !== index)
    setApplications(newApplications)
    setFormData((prev: any) => ({
      ...prev,
      applications: newApplications
    }))
  }

  const updateApplication = (index: number, value: string) => {
    setApplications((prev: any) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
    setFormData((prev: any) => ({
      ...prev,
      applications: applications.map((a, i) => (i === index ? value : a))
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log('Steel data:', formData)
    setShowSuccessModal(true)
  }

  const handleNextAction = (action: 'auction' | 'marketplace' | 'skip') => {
    setNextAction(action)
    setShowSuccessModal(false)
    
    if (action === 'auction') {
      // Navigate to create auction with steel ID
      window.location.href = '/create-auction?steelId=' + Date.now() // Mock steel ID
    } else if (action === 'marketplace') {
      // Add to marketplace (this would be handled by the backend)
      console.log('Adding steel to marketplace')
      window.location.href = '/my-steel'
    } else {
      // Skip - just go to My Steel
      window.location.href = '/my-steel'
    }
  }

  const tabs = [
    { id: 'basic', name: 'Basic Information', icon: Package },
    { id: 'warehouse', name: 'Warehouse Details', icon: Warehouse },
    { id: 'pricing', name: 'Pricing & Terms', icon: DollarSign },
    { id: 'specifications', name: 'Technical Specs', icon: Settings },
    { id: 'certifications', name: 'Certifications', icon: Award },
    { id: 'quality', name: 'Quality Assurance', icon: CheckCircle },
    { id: 'shipping', name: 'Packaging & Delivery', icon: Truck },
    { id: 'commercial', name: 'Commercial Details', icon: FileText },
    { id: 'applications', name: 'Applications', icon: Info }
  ]

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading steel data...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-6">{mode === 'edit' ? 'Edit Steel Listing' : 'Create Steel Listing'}</h1>
              <p className="text-gray-600 mt-1">Create a new steel listing with comprehensive details</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Link to="/my-steel" className="btn btn-secondary">
                <Package className="w-4 h-4" />
                <span>View My Steel</span>
              </Link>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 flex items-center justify-center">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Step 1: Add Steel</span>
                </div>
                <div className="w-8 h-1 bg-gray-200"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-100 flex items-center justify-center">
                    <Gavel className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Step 2: Create Auction (Optional)</span>
                </div>
                <div className="w-8 h-1 bg-gray-200"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-100 flex items-center justify-center">
                    <Store className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Step 3: Add to Marketplace (Optional)</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {Math.round((tabs.findIndex(tab => tab.id === activeTab) + 1) / tabs.length * 100)}% Complete
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tab Navigation */}
            <div className="card p-1">
              <div className="flex space-x-1 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-3 px-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="card p-6">
              {/* Basic Information */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Steel Title *
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="form-input"
                          placeholder="e.g., Premium Carbon Steel Coils - Grade A36"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="form-select"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Grade *
                        </label>
                        <select
                          value={formData.grade}
                          onChange={(e) => handleInputChange('grade', e.target.value)}
                          className="form-select"
                          required
                          disabled={!formData.category}
                        >
                          <option value="">Select Grade</option>
                          {formData.category && grades[formData.category as keyof typeof grades]?.map((grade) => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity *
                          </label>
                          <input
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => handleInputChange('quantity', e.target.value)}
                            className="form-input"
                            placeholder="50"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Unit
                          </label>
                          <select
                            value={formData.unit}
                            onChange={(e) => handleInputChange('unit', e.target.value)}
                            className="form-select"
                          >
                            <option value="tons">Tons</option>
                            <option value="kg">Kilograms</option>
                            <option value="lbs">Pounds</option>
                            <option value="pieces">Pieces</option>
                            <option value="meters">Meters</option>
                            <option value="feet">Feet</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dimensions
                        </label>
                        <input
                          type="text"
                          value={formData.dimensions}
                          onChange={(e) => handleInputChange('dimensions', e.target.value)}
                          className="form-input"
                          placeholder="e.g., 0.125&quot; x 48&quot; x 240&quot;"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="form-textarea"
                        placeholder="Provide a detailed description of the steel including its properties, applications, and any special features..."
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Warehouse Details */}
              {activeTab === 'warehouse' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Warehouse Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Warehouse *
                        </label>
                        <select
                          value={formData.warehouse}
                          onChange={(e) => {
                            const warehouse = warehouses.find(w => w.id.toString() === e.target.value)
                            handleInputChange('warehouse', e.target.value)
                            if (warehouse) {
                              handleInputChange('warehouseAddress', warehouse.address)
                              handleInputChange('warehouseContact', warehouse.contact)
                              handleInputChange('warehousePhone', warehouse.phone)
                            }
                          }}
                          className="form-select"
                          required
                        >
                          <option value="">Select Warehouse</option>
                          {warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                              {warehouse.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Warehouse Address
                        </label>
                        <input
                          type="text"
                          value={formData.warehouseAddress}
                          onChange={(e) => handleInputChange('warehouseAddress', e.target.value)}
                          className="form-input"
                          placeholder="Warehouse address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Person
                        </label>
                        <input
                          type="text"
                          value={formData.warehouseContact}
                          onChange={(e) => handleInputChange('warehouseContact', e.target.value)}
                          className="form-input"
                          placeholder="Contact person name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.warehousePhone}
                          onChange={(e) => handleInputChange('warehousePhone', e.target.value)}
                          className="form-input"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing & Terms */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Terms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price per Unit *
                          </label>
                          <input
                            type="number"
                            value={formData.pricePerUnit}
                            onChange={(e) => handleInputChange('pricePerUnit', e.target.value)}
                            className="form-input"
                            placeholder="2450"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Currency
                          </label>
                          <select
                            value={formData.currency}
                            onChange={(e) => handleInputChange('currency', e.target.value)}
                            className="form-select"
                          >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="JPY">JPY (¥)</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Order Quantity
                        </label>
                        <input
                          type="number"
                          value={formData.minimumOrder}
                          onChange={(e) => handleInputChange('minimumOrder', e.target.value)}
                          className="form-input"
                          placeholder="5"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="bulkDiscount"
                          checked={formData.bulkDiscount}
                          onChange={(e) => handleInputChange('bulkDiscount', e.target.checked)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="bulkDiscount" className="text-sm font-medium text-gray-700">
                          Offer bulk discount
                        </label>
                      </div>
                      {formData.bulkDiscount && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bulk Discount Percentage
                          </label>
                          <input
                            type="number"
                            value={formData.bulkDiscountPercentage}
                            onChange={(e) => handleInputChange('bulkDiscountPercentage', e.target.value)}
                            className="form-input"
                            placeholder="10"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              {activeTab === 'specifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tensile Strength
                        </label>
                        <input
                          type="text"
                          value={formData.tensileStrength}
                          onChange={(e) => handleInputChange('tensileStrength', e.target.value)}
                          className="form-input"
                          placeholder="e.g., 58,000 - 80,000 psi"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Yield Strength
                        </label>
                        <input
                          type="text"
                          value={formData.yieldStrength}
                          onChange={(e) => handleInputChange('yieldStrength', e.target.value)}
                          className="form-input"
                          placeholder="e.g., 36,000 psi min"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Elongation
                        </label>
                        <input
                          type="text"
                          value={formData.elongation}
                          onChange={(e) => handleInputChange('elongation', e.target.value)}
                          className="form-input"
                          placeholder="e.g., 23% min"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hardness
                        </label>
                        <input
                          type="text"
                          value={formData.hardness}
                          onChange={(e) => handleInputChange('hardness', e.target.value)}
                          className="form-input"
                          placeholder="e.g., 137 HB max"
                        />
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-3 mt-6">Chemical Composition</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {['carbon', 'manganese', 'phosphorus', 'sulfur', 'silicon', 'chromium', 'nickel', 'molybdenum'].map((element) => (
                        <div key={element}>
                          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                            {element}
                          </label>
                          <input
                            type="text"
                            value={formData[element as keyof typeof formData] as string}
                            onChange={(e) => handleInputChange(element, e.target.value)}
                            className="form-input"
                            placeholder="e.g., 0.26% max"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Certifications */}
              {activeTab === 'certifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications & Standards</h3>
                    <div className="space-y-4">
                      {certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={cert}
                            onChange={(e) => updateCertification(index, e.target.value)}
                            className="flex-1 form-input"
                            placeholder="e.g., ASTM A36, ISO 9001, CE Mark"
                          />
                          {certifications.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCertification(index)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addCertification}
                        className="btn btn-secondary"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Certification</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Quality Assurance */}
              {activeTab === 'quality' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Assurance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quality Assurance Program
                        </label>
                        <input
                          type="text"
                          value={formData.qualityAssurance}
                          onChange={(e) => handleInputChange('qualityAssurance', e.target.value)}
                          className="form-input"
                          placeholder="e.g., ISO 9001:2015 certified"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Testing Methods
                        </label>
                        <input
                          type="text"
                          value={formData.testingMethods}
                          onChange={(e) => handleInputChange('testingMethods', e.target.value)}
                          className="form-input"
                          placeholder="e.g., Tensile, Impact, Chemical Analysis"
                        />
                      </div>
                    </div>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="inspectionReport"
                          checked={formData.inspectionReport}
                          onChange={(e) => handleInputChange('inspectionReport', e.target.checked)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="inspectionReport" className="text-sm font-medium text-gray-700">
                          Inspection Report Available
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="materialTestReport"
                          checked={formData.materialTestReport}
                          onChange={(e) => handleInputChange('materialTestReport', e.target.checked)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="materialTestReport" className="text-sm font-medium text-gray-700">
                          Material Test Report Available
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Packaging & Delivery */}
              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Packaging & Delivery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Packaging Type
                        </label>
                        <input
                          type="text"
                          value={formData.packaging}
                          onChange={(e) => handleInputChange('packaging', e.target.value)}
                          className="form-input"
                          placeholder="e.g., Wooden crates, Plastic wrap"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Method
                        </label>
                        <select
                          value={formData.deliveryMethod}
                          onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                          className="form-select"
                        >
                          <option value="">Select Delivery Method</option>
                          {deliveryMethods.map((method) => (
                            <option key={method} value={method}>{method}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lead Time
                        </label>
                        <input
                          type="text"
                          value={formData.leadTime}
                          onChange={(e) => handleInputChange('leadTime', e.target.value)}
                          className="form-input"
                          placeholder="e.g., 5-7 business days"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="insurance"
                          checked={formData.insurance}
                          onChange={(e) => handleInputChange('insurance', e.target.checked)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="insurance" className="text-sm font-medium text-gray-700">
                          Include Insurance
                        </label>
                      </div>
                      {formData.insurance && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Insurance Amount
                          </label>
                          <input
                            type="number"
                            value={formData.insuranceAmount}
                            onChange={(e) => handleInputChange('insuranceAmount', e.target.value)}
                            className="form-input"
                            placeholder="100000"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Commercial Details */}
              {activeTab === 'commercial' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Commercial Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Terms
                        </label>
                        <select
                          value={formData.paymentTerms}
                          onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                          className="form-select"
                        >
                          <option value="">Select Payment Terms</option>
                          {paymentTerms.map((term) => (
                            <option key={term} value={term}>{term}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Incoterms
                        </label>
                        <select
                          value={formData.incoterms}
                          onChange={(e) => handleInputChange('incoterms', e.target.value)}
                          className="form-select"
                        >
                          <option value="">Select Incoterms</option>
                          {incoterms.map((term) => (
                            <option key={term} value={term}>{term}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Warranty
                        </label>
                        <input
                          type="text"
                          value={formData.warranty}
                          onChange={(e) => handleInputChange('warranty', e.target.value)}
                          className="form-input"
                          placeholder="e.g., 1 year manufacturer warranty"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Return Policy
                        </label>
                        <input
                          type="text"
                          value={formData.returnPolicy}
                          onChange={(e) => handleInputChange('returnPolicy', e.target.value)}
                          className="form-input"
                          placeholder="e.g., 30 days return policy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Applications */}
              {activeTab === 'applications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications & Uses</h3>
                    <div className="space-y-4">
                      {applications.map((app, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={app}
                            onChange={(e) => updateApplication(index, e.target.value)}
                            className="flex-1 form-input"
                            placeholder="e.g., Automotive manufacturing, Construction, Heavy machinery"
                          />
                          {applications.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeApplication(index)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addApplication}
                        className="btn btn-secondary"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Application</span>
                      </button>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requirements
                      </label>
                      <textarea
                        value={formData.specialRequirements}
                        onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                        rows={3}
                        className="form-textarea"
                        placeholder="Any special requirements or notes..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                {tabs.findIndex(tab => tab.id === activeTab) > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab(tabs[tabs.findIndex(tab => tab.id === activeTab) - 1].id)}
                    className="btn btn-secondary"
                  >
                    Previous
                  </button>
                )}
              </div>
              <div className="flex space-x-3">
                {tabs.findIndex(tab => tab.id === activeTab) < tabs.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab(tabs[tabs.findIndex(tab => tab.id === activeTab) + 1].id)}
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-success"
                  >
                    <Save className="w-4 h-4" />
                    <span>{mode === 'edit' ? 'Save Changes' : 'Create Steel'}</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Steel Added Successfully!</h3>
                  <p className="text-gray-600 mb-6">Your steel has been added to your inventory. What would you like to do next?</p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handleNextAction('auction')}
                      className="w-full btn btn-primary"
                    >
                      <Gavel className="w-4 h-4 mr-2" />
                      Create Auction
                    </button>
                    <button
                      onClick={() => handleNextAction('marketplace')}
                      className="w-full btn btn-secondary"
                    >
                      <Store className="w-4 h-4 mr-2" />
                      Add to Marketplace
                    </button>
                    <button
                      onClick={() => handleNextAction('skip')}
                      className="w-full text-gray-600 hover:text-gray-800 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Skip for Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
  )
}

export default CreateSteel;
export { CreateSteel };
