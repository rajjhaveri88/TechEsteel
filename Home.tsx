import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Gavel, 
  Users, 
  Eye, 
  Clock, 
  Star,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity,
  Target,
  Award,
  User,
  ShoppingCart,
  Store,
  FileText,
  Truck,
  CheckCircle,
  AlertCircle,
  Calendar,
  MapPin,
  Plus,
  Zap,
  Shield,
  Globe,
  Thermometer,
  Scale,
  Building,
  Heart,
  Bell,
  Settings,
  RefreshCw,
  Filter,
  Search,
  Download,
  Share2,
  Bookmark,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react'
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';
import { formatCurrencyINR } from '../utils/formatCurrencyINR';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'buyer' | 'seller'>('overview')
  const [userRole, setUserRole] = useState<'buyer' | 'seller' | 'both'>('both')
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({ open: false, message: '', type: 'success' });
  const [exportModal, setExportModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [pendingActionModal, setPendingActionModal] = useState<{ open: boolean; actionId?: number }>({ open: false });

  // Mock data - replace with actual data from API
  const overviewStats = [
    {
      title: 'Total Revenue',
      value: formatCurrencyINR(2400000),
      change: '+12.5%',
      changeType: 'positive',
      icon: BarChart3,
      color: 'success',
      trend: [65, 78, 90, 81, 56, 55, 40, 45, 50, 60, 70, 80],
      detailsPath: '/analytics/revenue',
    },
    {
      title: 'Active Auctions',
      value: '24',
      change: '+8.2%',
      changeType: 'positive',
      icon: Gavel,
      color: 'primary',
      trend: [12, 19, 3, 5, 2, 3, 7, 8, 9, 10, 12, 15],
      detailsPath: '/analytics/auctions',
    },
    {
      title: 'Steel Listings',
      value: '156',
      change: '+15.3%',
      changeType: 'positive',
      icon: Package,
      color: 'warning',
      trend: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
      detailsPath: '/analytics/listings',
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '-2.1%',
      changeType: 'negative',
      icon: Users,
      color: 'danger',
      trend: [100, 120, 115, 134, 142, 122, 110, 120, 125, 130, 128, 132],
      detailsPath: '/analytics/users',
    }
  ]

  const sellerStats = [
    {
      title: 'My Steel Listings',
      value: '24',
      change: '+5',
      changeType: 'positive',
      icon: Package,
      color: 'primary',
      detailsPath: '/my-steel',
    },
    {
      title: 'Active Auctions',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: Gavel,
      color: 'warning',
      detailsPath: '/my-auctions',
    },
    {
      title: 'Pending Orders',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: FileText,
      color: 'success',
      detailsPath: '/orders',
    },
    {
      title: 'Total Sales',
      value: formatCurrencyINR(890000),
      change: '+18.5%',
      changeType: 'positive',
      icon: BarChart3,
      color: 'danger',
      detailsPath: '/analytics/sales',
    }
  ]

  const buyerStats = [
    {
      title: 'Active Bids',
      value: '6',
      change: '+2',
      changeType: 'positive',
      icon: Gavel,
      color: 'primary',
      detailsPath: '/my-bids',
    },
    {
      title: 'Won Auctions',
      value: '15',
      change: '+3',
      changeType: 'positive',
      icon: Award,
      color: 'success',
      detailsPath: '/my-bids?filter=won',
    },
    {
      title: 'Pending Orders',
      value: '4',
      change: '-1',
      changeType: 'negative',
      icon: FileText,
      color: 'warning',
      detailsPath: '/orders',
    },
    {
      title: 'Total Spent',
      value: formatCurrencyINR(450000),
      change: '+22.3%',
      changeType: 'positive',
      icon: BarChart3,
      color: 'danger',
      detailsPath: '/analytics/spent',
    }
  ]

  const marketAnalytics = {
    priceTrends: [
      { month: 'Jan', carbon: 850, stainless: 2200, alloy: 1200, structural: 750 },
      { month: 'Feb', carbon: 870, stainless: 2250, alloy: 1250, structural: 780 },
      { month: 'Mar', carbon: 890, stainless: 2300, alloy: 1300, structural: 800 },
      { month: 'Apr', carbon: 920, stainless: 2350, alloy: 1350, structural: 820 },
      { month: 'May', carbon: 950, stainless: 2400, alloy: 1400, structural: 850 },
      { month: 'Jun', carbon: 980, stainless: 2450, alloy: 1450, structural: 880 }
    ],
    topCategories: [
      { name: 'Carbon Steel', volume: 45, value: formatCurrencyINR(1200000), growth: '+12%' },
      { name: 'Stainless Steel', volume: 28, value: formatCurrencyINR(890000), growth: '+8%' },
      { name: 'Alloy Steel', volume: 22, value: formatCurrencyINR(650000), growth: '+15%' },
      { name: 'Structural Steel', volume: 18, value: formatCurrencyINR(420000), growth: '+5%' }
    ]
  }

  const topPerformers = [
    {
      id: 1,
      name: 'Tata Steel Ltd',
      type: 'supplier',
      rating: 4.9,
      totalSales: 1250,
      revenue: formatCurrencyINR(2100000),
      location: 'Mumbai, India',
      specialties: ['Carbon Steel', 'Structural Steel'],
      verified: true,
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 2,
      name: 'Jindal Stainless',
      type: 'supplier',
      rating: 4.8,
      totalSales: 890,
      revenue: formatCurrencyINR(1500000),
      location: 'Chennai, India',
      specialties: ['Stainless Steel', 'Nickel Alloys'],
      verified: true,
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 3,
      name: 'SteelCorp Inc.',
      type: 'buyer',
      rating: 4.7,
      totalPurchases: 156,
      spent: formatCurrencyINR(890000),
      location: 'New York, USA',
      preferences: ['High-Grade Steel', 'Custom Alloys'],
      verified: true,
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=100&q=80'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'auction_won',
      title: 'Carbon Steel Coils - 50 tons',
      amount: formatCurrencyINR(45000),
      status: 'paid',
      date: '2 hours ago',
      icon: Gavel,
      color: 'emerald',
      user: 'John Doe',
      details: 'Successfully won auction with 12 competing bids'
    },
    {
      id: 2,
      type: 'steel_listed',
      title: 'Stainless Steel 316L - 25 tons',
      amount: formatCurrencyINR(80000),
      status: 'confirmed',
      date: '4 hours ago',
      icon: Package,
      color: 'blue',
      user: 'SteelCorp Inc.',
      details: 'New listing added to marketplace with premium pricing'
    },
    {
      id: 3,
      type: 'payment_received',
      title: 'Tool Steel D2 - 15 tons',
      amount: formatCurrencyINR(61500),
      status: 'shipped',
      date: '1 day ago',
      icon: Truck,
      color: 'blue',
      user: 'MetalWorks Ltd.',
      details: 'Payment processed and shipment confirmed'
    }
  ]

  const pendingActions = [
    {
      id: 1,
      type: 'shipment',
      title: 'Confirm shipment for Carbon Steel Coils',
      deadline: 'Today',
      priority: 'high',
      icon: Truck,
      description: 'Shipment ready for pickup at Mumbai warehouse'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Process payment for Stainless Steel 316L',
      deadline: 'Tomorrow',
      priority: 'medium',
      icon: DollarSign,
      description: 'Payment due for completed auction'
    },
    {
      id: 3,
      type: 'inspection',
      title: 'Quality inspection for Tool Steel D2',
      deadline: '3 days',
      priority: 'medium',
      icon: CheckCircle,
      description: 'Third-party inspection required before delivery'
    }
  ]

  const quickActions = [
    {
      id: 1,
      title: 'Add Steel Listing',
      description: 'List your steel products',
      icon: Package,
      color: 'blue',
      href: '/create-steel',
      action: 'create'
    },
    {
      id: 2,
      title: 'Create Auction',
      description: 'Start a new auction',
      icon: Gavel,
      color: 'green',
      href: '/create-auction',
      action: 'create'
    },
    {
      id: 3,
      title: 'Browse Marketplace',
      description: 'Find steel products',
      icon: Store,
      color: 'purple',
      href: '/marketplace',
      action: 'browse'
    },
    {
      id: 4,
      title: 'View Auctions',
      description: 'Participate in auctions',
      icon: Eye,
      color: 'orange',
      href: '/auctions',
      action: 'browse'
    },
    {
      id: 5,
      title: 'Track Orders',
      description: 'Monitor your orders',
      icon: Truck,
      color: 'red',
      href: '/track-orders',
      action: 'track'
    },
    {
      id: 6,
      title: 'My Favorites',
      description: 'View saved items',
      icon: Heart,
      color: 'pink',
      href: '/favorites',
      action: 'view'
    }
  ]

  const notifications = [
    {
      id: 1,
      type: 'bid_outbid',
      title: 'You\'ve been outbid',
      message: 'Someone bid higher on Carbon Steel Coils auction',
      time: '5 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'auction_ending',
      title: 'Auction ending soon',
      message: 'Stainless Steel 304 auction ends in 2 hours',
      time: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'payment_received',
      title: 'Payment received',
      message: formatCurrencyINR(45000) + ' payment received for Tool Steel D2',
      time: '3 hours ago',
      read: true,
      priority: 'low'
    }
  ]

  const getStats = () => {
    switch (activeTab) {
      case 'buyer':
        return buyerStats
      case 'seller':
        return sellerStats
      default:
        return overviewStats
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'confirmed':
      case 'shipped':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const colorMap: Record<string, string> = {
    success: 'green',
    primary: 'blue',
    warning: 'yellow',
    danger: 'red',
  }

  const bgColorMap: Record<string, string> = {
    success: 'bg-green-500',
    primary: 'bg-blue-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  }

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value as any);
    setToast({ open: true, message: 'Time range updated.', type: 'success' });
  };
  const handleRefresh = () => {
    setToast({ open: true, message: 'Dashboard refreshed.', type: 'success' });
  };
  const handleMarkAllRead = () => {
    setToast({ open: true, message: 'All notifications marked as read.', type: 'success' });
  };
  const handleExport = () => setExportModal(true);
  const confirmExport = () => {
    setExportModal(false);
    setToast({ open: true, message: 'Market analytics exported.', type: 'success' });
  };
  const cancelExport = () => setExportModal(false);
  const handleShare = () => setShareModal(true);
  const confirmShare = () => {
    setShareModal(false);
    setToast({ open: true, message: 'Market analytics shared.', type: 'success' });
  };
  const cancelShare = () => setShareModal(false);
  const handleTakeAction = (id: number) => setPendingActionModal({ open: true, actionId: id });
  const confirmTakeAction = () => {
    setPendingActionModal({ open: false });
    setToast({ open: true, message: 'Action completed.', type: 'success' });
  };
  const cancelTakeAction = () => setPendingActionModal({ open: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your steel trading activities.</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={handleTimeRangeChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="btn btn-secondary text-sm" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>

          {/* Role Tabs */}
          <div className="bg-white shadow-lg border border-gray-200 mb-4">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', name: 'Overview', count: null },
                  { id: 'buyer', name: 'Buyer Dashboard', count: buyerStats[0].value },
                  { id: 'seller', name: 'Seller Dashboard', count: sellerStats[0].value }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`tab-button ${activeTab === tab.id ? 'tab-button-active' : ''}`}
                  >
                    {tab.name}
                    {tab.count && (
                      <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {getStats().map((stat, index) => {
            // Debug: log the icon assignment
            console.log('Widget:', stat.title, 'Icon:', stat.icon)
            // Use the icon component directly
            const IconComponent = stat.icon || DollarSign;
            return (
              <Link
                key={index}
                to={stat.detailsPath}
                className="card border border-gray-200 shadow-sm hover:shadow-lg transition-shadow group"
                style={{ textDecoration: 'none' }}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-full ${bgColorMap[stat.color]} group-hover:scale-105 transition-transform flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.changeType === 'positive' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1 group-hover:text-${stat.color}-700 transition-colors">{stat.title}</h3>
                  <p className={`text-2xl font-extrabold group-hover:text-${stat.color}-600 transition-colors`}>
                    {stat.value}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Analytics */}
            <div className="card border border-gray-200 shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Market Analytics</h2>
                  <div className="flex items-center space-x-2">
                    <button className="btn btn-secondary text-xs" onClick={handleExport}>
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </button>
                    <button className="btn btn-secondary text-xs" onClick={handleShare}>
                      <Share2 className="w-3 h-3 mr-1" />
                      Share
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Price Trends */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Trends</h3>
                    <div className="space-y-2">
                      {marketAnalytics.topCategories.slice(0, 3).map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{category.name}</p>
                            <p className="text-xs text-gray-600">{category.volume} tons</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">{category.value}</p>
                            <p className="text-xs text-green-600">{category.growth}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Categories */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Categories</h3>
                    <div className="space-y-2">
                      {marketAnalytics.topCategories.slice(0, 3).map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full bg-${['blue', 'green', 'yellow'][index]}-500`}></div>
                            <span className="text-sm font-medium text-gray-900">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">{category.value}</p>
                            <p className="text-xs text-green-600">{category.growth}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="card border border-gray-200 shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Recent Activities</h2>
                  <Link to="/activity" className="btn btn-secondary text-xs">
                    View All
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                      <div className={`p-1.5 bg-${activity.color}-100 rounded`}>
                        <activity.icon className={`w-4 h-4 text-${activity.color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                          <span className="text-xs text-gray-500">{activity.date}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{activity.details}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{activity.amount}</span>
                            <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${getStatusColor(activity.status)}`}>
                              {activity.status}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">by {activity.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="card border border-gray-200 shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Top Performers</h2>
                  <Link to="/leaderboard" className="btn btn-secondary text-xs">
                    View Leaderboard
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {topPerformers.map((performer, index) => (
                    <div key={performer.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                      <div className="relative">
                        <img
                          src={performer.image}
                          alt={performer.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{index + 1}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900">{performer.name}</h3>
                          {performer.verified && (
                            <Shield className="w-3 h-3 text-blue-600" />
                          )}
                          <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                            performer.type === 'supplier' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {performer.type}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-600">
                          <span className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            {performer.rating}
                          </span>
                          <span>{performer.location}</span>
                          <span>{performer.type === 'supplier' ? performer.revenue : performer.spent}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          {performer.specialties?.slice(0, 2).map((specialty, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 text-xs bg-gray-200 text-gray-700 rounded">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card border border-gray-200 shadow-sm">
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <Link
                      key={action.id}
                      to={action.href}
                      className="group p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-8 h-8 bg-${action.color}-100 rounded flex items-center justify-center mb-2 group-hover:bg-${action.color}-200 transition-colors`}>
                        <action.icon className={`w-4 h-4 text-${action.color}-600`} />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-xs text-gray-600">{action.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="card border border-gray-200 shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                  <button className="btn btn-secondary text-xs" onClick={handleMarkAllRead}>
                    <Bell className="w-3 h-3 mr-1" />
                    Mark All Read
                  </button>
                </div>
                
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-3 rounded border-l-4 ${
                      notification.read ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-blue-500'
                    }`}>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                        {!notification.read && (
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pending Actions */}
            <div className="card border border-gray-200 shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Pending Actions</h2>
                  <Link to="/tasks" className="btn btn-secondary text-xs">
                    View All
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {pendingActions.map((action) => (
                    <div key={action.id} className="p-3 bg-gray-50 rounded">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 bg-blue-100 rounded">
                            <action.icon className="w-3 h-3 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
                            <p className="text-xs text-gray-600">{action.description}</p>
                          </div>
                        </div>
                        <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">Due: {action.deadline}</span>
                        <button className="btn btn-primary text-xs" onClick={() => handleTakeAction(action.id)}>
                          Take Action
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Insights */}
            <div className="card border border-gray-200 shadow-sm">
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Market Insights</h2>
                
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <h3 className="text-sm font-medium text-green-900">Market Trend</h3>
                    </div>
                    <p className="text-xs text-green-800">
                      Carbon steel prices are trending upward by 8.5% this month due to increased demand.
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="flex items-center space-x-2 mb-1">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <h3 className="text-sm font-medium text-blue-900">Global Supply</h3>
                    </div>
                    <p className="text-xs text-blue-800">
                      New suppliers from Southeast Asia are entering the market, increasing competition.
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <h3 className="text-sm font-medium text-yellow-900">Price Alert</h3>
                    </div>
                    <p className="text-xs text-yellow-800">
                      Stainless steel prices expected to rise by 12% in the next quarter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={exportModal}
        title="Export Market Analytics"
        description="Export the current market analytics data as a CSV file?"
        confirmText="Export"
        cancelText="Cancel"
        onConfirm={confirmExport}
        onCancel={cancelExport}
      />
      <ConfirmModal
        open={shareModal}
        title="Share Market Analytics"
        description="Share the current market analytics data with your team?"
        confirmText="Share"
        cancelText="Cancel"
        onConfirm={confirmShare}
        onCancel={cancelShare}
      />
      <ConfirmModal
        open={pendingActionModal.open}
        title="Complete Action"
        description="Mark this pending action as completed?"
        confirmText="Complete"
        cancelText="Cancel"
        onConfirm={confirmTakeAction}
        onCancel={cancelTakeAction}
      />
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  )
}

export default Home 