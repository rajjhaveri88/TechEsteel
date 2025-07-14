import React, { useState } from 'react'
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Building, 
  Globe, 
  Calendar,
  Award,
  TrendingUp,
  DollarSign,
  Package,
  Gavel,
  ShoppingCart,
  FileText,
  Truck,
  Star,
  Plus,
  Edit,
  Save,
  X,
  Warehouse,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3
} from 'lucide-react'
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [isAddingWarehouse, setIsAddingWarehouse] = useState(false)
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; action: null | 'delete' | 'primary'; warehouseId?: number }>({ open: false, action: null });
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({ open: false, message: '', type: 'success' });
  const [pendingCancelEdit, setPendingCancelEdit] = useState(false);
  const [userData, setUserData] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@steelcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'SteelCorp Inc.',
    position: 'Procurement Manager',
    location: 'New York, NY',
    website: 'www.steelcorp.com',
    joinedDate: '2022-03-15',
    verified: true,
    rating: 4.8,
    totalTransactions: 156,
    totalVolume: '$2.4M',
    avatar: null
  });
  const [editBuffer, setEditBuffer] = useState(userData);

  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      name: 'NYC Warehouse A',
      address: '123 Steel Street, New York, NY 10001',
      contact: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'nyc@steelcorp.com',
      capacity: '50,000 sq ft',
      status: 'active',
      primary: true
    },
    {
      id: 2,
      name: 'Chicago Distribution Center',
      address: '456 Metal Avenue, Chicago, IL 60601',
      contact: 'Sarah Johnson',
      phone: '+1 (555) 234-5678',
      email: 'chicago@steelcorp.com',
      capacity: '75,000 sq ft',
      status: 'active',
      primary: false
    },
    {
      id: 3,
      name: 'Houston Steel Hub',
      address: '789 Iron Road, Houston, TX 77001',
      contact: 'Mike Davis',
      phone: '+1 (555) 345-6789',
      email: 'houston@steelcorp.com',
      capacity: '100,000 sq ft',
      status: 'inactive',
      primary: false
    }
  ])

  const [newWarehouse, setNewWarehouse] = useState({
    name: '',
    address: '',
    contact: '',
    phone: '',
    email: '',
    capacity: ''
  })

  const userStats = [
    {
      title: 'Total Sales',
      value: '$890K',
      change: '+18.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'success'
    },
    {
      title: 'Active Listings',
      value: '24',
      change: '+5',
      changeType: 'positive',
      icon: Package,
      color: 'primary'
    },
    {
      title: 'Completed Orders',
      value: '156',
      change: '+12',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'warning'
    },
    {
      title: 'Customer Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: Star,
      color: 'blue'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'auction_won',
      title: 'Won auction for Carbon Steel Coils',
      amount: '$45,000',
      date: '2 hours ago',
      icon: Gavel,
      color: 'emerald'
    },
    {
      id: 2,
      type: 'steel_listed',
      title: 'Listed new Stainless Steel 316L',
      amount: '$80,000',
      date: '4 hours ago',
      icon: Package,
      color: 'blue'
    },
    {
      id: 3,
      type: 'payment_received',
      title: 'Payment received for Tool Steel D2',
      amount: '$61,500',
      date: '1 day ago',
      icon: DollarSign,
      color: 'purple'
    },
    {
      id: 4,
      type: 'shipment_confirmed',
      title: 'Shipment confirmed for Alloy Steel',
      amount: '$38,900',
      date: '2 days ago',
      icon: Truck,
      color: 'amber'
    }
  ]

  const securitySettings = [
    {
      id: 'two_factor',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      enabled: true,
      icon: Shield
    },
    {
      id: 'email_notifications',
      title: 'Email Notifications',
      description: 'Receive notifications about account activity',
      enabled: true,
      icon: Mail
    },
    {
      id: 'sms_notifications',
      title: 'SMS Notifications',
      description: 'Get important updates via text message',
      enabled: false,
      icon: Phone
    },
    {
      id: 'login_alerts',
      title: 'Login Alerts',
      description: 'Get notified of new login attempts',
      enabled: true,
      icon: Bell
    }
  ]

  const preferences = [
    {
      id: 'language',
      title: 'Language',
      value: 'English',
      options: ['English', 'Spanish', 'French', 'German']
    },
    {
      id: 'timezone',
      title: 'Timezone',
      value: 'UTC-5 (Eastern Time)',
      options: ['UTC-8 (Pacific Time)', 'UTC-5 (Eastern Time)', 'UTC+0 (GMT)', 'UTC+1 (Central European Time)']
    },
    {
      id: 'currency',
      title: 'Currency',
      value: 'USD',
      options: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
    },
    {
      id: 'date_format',
      title: 'Date Format',
      value: 'MM/DD/YYYY',
      options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setEditBuffer({ ...editBuffer, [field]: value });
  };
  const handleEditProfile = () => {
    setEditBuffer(userData);
    setIsEditing(true);
  };
  const handleCancelEdit = () => {
    // Check for unsaved changes
    if (JSON.stringify(editBuffer) !== JSON.stringify(userData)) {
      setPendingCancelEdit(true);
    } else {
      setIsEditing(false);
    }
  };
  const confirmCancelEdit = () => {
    setIsEditing(false);
    setPendingCancelEdit(false);
  };
  const handleSaveProfile = () => {
    // Validate required fields (e.g., name, email)
    if (!editBuffer.name || !editBuffer.email) {
      setToast({ open: true, message: 'Name and Email are required.', type: 'error' });
      return;
    }
    setUserData(editBuffer);
    setIsEditing(false);
    setToast({ open: true, message: 'Profile updated successfully.', type: 'success' });
  };

  const handleAddWarehouse = () => {
    if (newWarehouse.name && newWarehouse.address) {
      const warehouse = {
        id: warehouses.length + 1,
        ...newWarehouse,
        status: 'active',
        primary: warehouses.length === 0
      }
      setWarehouses([...warehouses, warehouse])
      setNewWarehouse({
        name: '',
        address: '',
        contact: '',
        phone: '',
        email: '',
        capacity: ''
      })
      setIsAddingWarehouse(false)
      setToast({ open: true, message: 'Warehouse added successfully.', type: 'success' });
    } else {
      setToast({ open: true, message: 'Please fill in required fields.', type: 'error' });
    }
  }

  const handleDeleteWarehouse = (id: number) => {
    setConfirmModal({ open: true, action: 'delete', warehouseId: id });
  };

  const handleSetPrimaryWarehouse = (id: number) => {
    setConfirmModal({ open: true, action: 'primary', warehouseId: id });
  };

  const confirmModalAction = () => {
    if (confirmModal.action === 'delete' && confirmModal.warehouseId) {
      setWarehouses(warehouses.filter(w => w.id !== confirmModal.warehouseId));
      setToast({ open: true, message: 'Warehouse deleted successfully.', type: 'success' });
    } else if (confirmModal.action === 'primary' && confirmModal.warehouseId) {
      setWarehouses(warehouses.map(w => ({ ...w, primary: w.id === confirmModal.warehouseId })));
      setToast({ open: true, message: 'Primary warehouse updated.', type: 'success' });
    }
    setConfirmModal({ open: false, action: null });
  };
  const cancelModalAction = () => setConfirmModal({ open: false, action: null });

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'warehouses', name: 'Warehouses', icon: Warehouse },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Settings },
    { id: 'activity', name: 'Activity', icon: BarChart3 }
  ]

  const [security, setSecurity] = useState(securitySettings);
  const [pendingToggle, setPendingToggle] = useState<{ open: boolean; id?: string }>({ open: false });

  const handleToggleSecurity = (id: string) => {
    if (id === 'two_factor' && security.find(s => s.id === id)?.enabled) {
      // Confirm disabling 2FA
      setPendingToggle({ open: true, id });
    } else {
      setSecurity(security.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
      setToast({ open: true, message: `${security.find(s => s.id === id)?.title} ${security.find(s => s.id === id)?.enabled ? 'disabled' : 'enabled'}.`, type: 'success' });
    }
  };
  const confirmDisable2FA = () => {
    setSecurity(security.map(s => s.id === 'two_factor' ? { ...s, enabled: false } : s));
    setToast({ open: true, message: 'Two-Factor Authentication disabled.', type: 'success' });
    setPendingToggle({ open: false });
  };
  const cancelDisable2FA = () => setPendingToggle({ open: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="card p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account, warehouses, and preferences</p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <button
                  onClick={isEditing ? handleCancelEdit : handleEditProfile}
                  className="btn btn-secondary"
                >
                  <Edit className="w-4 h-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
                {isEditing && (
                  <button
                    onClick={handleSaveProfile}
                    className="btn btn-success"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="card p-1 border border-gray-200 shadow-sm">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
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
          <div className="card p-6 border border-gray-200 shadow-sm">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center rounded-lg">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                      {userData.verified && (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm text-gray-600">{userData.rating}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{userData.position} at {userData.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {userData.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Member since {new Date(userData.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trading Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Trading Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {userStats.map((stat, index) => {
                      const Icon = stat.icon
                      return (
                        <div key={index} className="card p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                              <div className="flex items-center mt-2">
                                <span className={`text-sm font-medium ${
                                  stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                                }`}>
                                  {stat.change}
                                </span>
                                <span className="text-sm text-gray-500 ml-1">from last month</span>
                              </div>
                            </div>
                            <div className={`p-3 rounded-lg ${
                              stat.color === 'primary' ? 'bg-blue-100' : 
                              stat.color === 'success' ? 'bg-green-100' : 
                              stat.color === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                            }`}>
                              <Icon className={`w-6 h-6 ${
                                stat.color === 'primary' ? 'text-blue-600' : 
                                stat.color === 'success' ? 'text-green-600' : 
                                stat.color === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                              }`} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={isEditing ? editBuffer.name : userData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="form-input"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={isEditing ? editBuffer.email : userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="form-input"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={isEditing ? editBuffer.phone : userData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="form-input"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={isEditing ? editBuffer.company : userData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="form-input"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                      <input
                        type="text"
                        value={isEditing ? editBuffer.position : userData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        className="form-input"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={isEditing ? editBuffer.location : userData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="form-input"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        value={isEditing ? editBuffer.website : userData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="form-input"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Warehouses Tab */}
            {activeTab === 'warehouses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Warehouse Management</h3>
                  <button
                    onClick={() => setIsAddingWarehouse(true)}
                    className="btn btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Warehouse</span>
                  </button>
                </div>

                {/* Add Warehouse Form */}
                {isAddingWarehouse && (
                  <div className="card p-6 bg-gray-50 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">Add New Warehouse</h4>
                      <button
                        onClick={() => setIsAddingWarehouse(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse Name</label>
                        <input
                          type="text"
                          value={newWarehouse.name}
                          onChange={(e) => setNewWarehouse({...newWarehouse, name: e.target.value})}
                          className="form-input"
                          placeholder="e.g., NYC Warehouse A"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          value={newWarehouse.address}
                          onChange={(e) => setNewWarehouse({...newWarehouse, address: e.target.value})}
                          className="form-input"
                          placeholder="Full address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                        <input
                          type="text"
                          value={newWarehouse.contact}
                          onChange={(e) => setNewWarehouse({...newWarehouse, contact: e.target.value})}
                          className="form-input"
                          placeholder="Contact person name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={newWarehouse.phone}
                          onChange={(e) => setNewWarehouse({...newWarehouse, phone: e.target.value})}
                          className="form-input"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={newWarehouse.email}
                          onChange={(e) => setNewWarehouse({...newWarehouse, email: e.target.value})}
                          className="form-input"
                          placeholder="warehouse@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                        <input
                          type="text"
                          value={newWarehouse.capacity}
                          onChange={(e) => setNewWarehouse({...newWarehouse, capacity: e.target.value})}
                          className="form-input"
                          placeholder="e.g., 50,000 sq ft"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={handleAddWarehouse}
                        className="btn btn-success"
                      >
                        <Save className="w-4 h-4" />
                        <span>Add Warehouse</span>
                      </button>
                      <button
                        onClick={() => setIsAddingWarehouse(false)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Warehouses List */}
                <div className="space-y-4">
                  {warehouses.map((warehouse) => (
                    <div key={warehouse.id} className="card p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-lg">
                            <Warehouse className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-lg font-semibold text-gray-900">{warehouse.name}</h4>
                              {warehouse.primary && (
                                <span className="badge badge-primary">Primary</span>
                              )}
                              <span className={`badge ${warehouse.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{warehouse.status}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{warehouse.address}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                              <span>{warehouse.contact}</span>
                              <span>{warehouse.phone}</span>
                              <span>{warehouse.capacity}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {!warehouse.primary && (
                            <button
                              onClick={() => handleSetPrimaryWarehouse(warehouse.id)}
                              className="btn btn-secondary text-sm"
                            >
                              Set Primary
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteWarehouse(warehouse.id)}
                            className="btn btn-danger text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <ConfirmModal
                  open={confirmModal.open}
                  title={confirmModal.action === 'delete' ? 'Delete Warehouse' : 'Set Primary Warehouse'}
                  description={confirmModal.action === 'delete' ? 'Are you sure you want to delete this warehouse? This action cannot be undone.' : 'Set this warehouse as your primary location?'}
                  confirmText={confirmModal.action === 'delete' ? 'Delete' : 'Set Primary'}
                  cancelText="Cancel"
                  onConfirm={confirmModalAction}
                  onCancel={cancelModalAction}
                />
                <ConfirmModal
                  open={pendingCancelEdit}
                  title="Discard Changes?"
                  description="You have unsaved changes. Are you sure you want to discard them?"
                  confirmText="Discard"
                  cancelText="Keep Editing"
                  onConfirm={confirmCancelEdit}
                  onCancel={() => setPendingCancelEdit(false)}
                />
                <Toast
                  open={toast.open}
                  message={toast.message}
                  type={toast.type}
                  onClose={() => setToast({ ...toast, open: false })}
                />
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                <div className="space-y-4">
                  {security.map((setting) => {
                    const Icon = setting.icon
                    return (
                      <div key={setting.id} className="card p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-lg">
                              <Icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{setting.title}</h4>
                              <p className="text-sm text-gray-600">{setting.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`text-sm font-medium ${setting.enabled ? 'text-emerald-600' : 'text-gray-500'}`}>{setting.enabled ? 'Enabled' : 'Disabled'}</span>
                            <button
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${setting.enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
                              onClick={() => handleToggleSecurity(setting.id)}
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <ConfirmModal
                  open={pendingToggle.open}
                  title="Disable Two-Factor Authentication"
                  description="Are you sure you want to disable two-factor authentication? This will reduce your account security."
                  confirmText="Disable"
                  cancelText="Cancel"
                  onConfirm={confirmDisable2FA}
                  onCancel={cancelDisable2FA}
                />
                <Toast
                  open={toast.open}
                  message={toast.message}
                  type={toast.type}
                  onClose={() => setToast({ ...toast, open: false })}
                />
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {preferences.map((pref) => (
                    <div key={pref.id} className="card p-6 border border-gray-200 shadow-sm">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{pref.title}</label>
                      <select className="form-select">
                        {pref.options.map((option) => (
                          <option key={option} value={option} selected={option === pref.value}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon
                    return (
                      <div key={activity.id} className="card p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 bg-${activity.color}-100 flex items-center justify-center rounded-lg`}>
                            <Icon className={`w-5 h-5 text-${activity.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900">{activity.title}</h4>
                            <p className="text-sm text-gray-600">{activity.amount} • {activity.date}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
