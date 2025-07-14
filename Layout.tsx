import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Gavel, 
  Package, 
  User, 
  Plus, 
  LogIn, 
  Bell, 
  Search, 
  ChevronDown, 
  Settings, 
  LogOut, 
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Menu,
  X,
  ShoppingCart,
  Store,
  FileText,
  Truck,
  Award,
  Briefcase,
  UserCheck,
  Star
} from 'lucide-react'
import Logo from '../assets/Logo.png';

// Add this at the top of the file or in a declarations file if not present:
// declare module '*.png';
// If not possible here, create a new file src/types/images.d.ts with: declare module '*.png';

const Layout: React.FC = () => {
  const location = useLocation()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock state - replace with actual auth
  const [userRole, setUserRole] = useState<'buyer' | 'seller' | 'both'>('both') // Mock role

  const mainNavigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Auctions', href: '/auctions', icon: Gavel },
    { name: 'Steel Marketplace', href: '/marketplace', icon: Store },
  ]

  const accountNavigation = [
    { name: 'My Steel', href: '/my-steel', icon: Package },
    { name: 'My Auctions', href: '/my-auctions', icon: Gavel },
    { name: 'My Bids', href: '/my-bids', icon: TrendingUp },
    { name: 'My Purchases', href: '/my-purchases', icon: ShoppingCart },
    { name: 'Favorites', href: '/favorites', icon: Star },
    { name: 'Sales Orders', href: '/orders', icon: FileText },
    { name: 'Shipments', href: '/shipments', icon: Truck },
    { name: 'Track Orders', href: '/track-orders', icon: BarChart3 },
    { name: 'Reviews', href: '/reviews', icon: Award },
    { name: 'Profile', href: '/profile', icon: User }
  ]

  const userMenuItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Logout', href: '/logout', icon: LogOut, action: () => setIsLoggedIn(false) },
  ]

  const getActiveNavigation = () => {
    return [...mainNavigation, ...accountNavigation]
  }

  const handleAccountMenuToggle = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen)
    setIsUserMenuOpen(false) // Close other menu
  }

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
    setIsAccountMenuOpen(false) // Close other menu
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={Logo} alt="TechESteel Logo" className="h-16 w-auto" style={{maxHeight: 64}} />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {mainNavigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              {/* My Account Dropdown */}
              <div className="relative">
                <button
                  onClick={handleAccountMenuToggle}
                  className={`nav-link ${accountNavigation.some(item => location.pathname === item.href) ? 'nav-link-active' : ''}`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>My Account</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl border border-gray-200 py-2 z-50 rounded-xl">
                    {accountNavigation.map((item) => {
                      const Icon = item.icon
                      const isActive = location.pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsAccountMenuOpen(false)}
                          className={`flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
                            isActive ? 'bg-blue-50 text-blue-600' : ''
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </nav>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="hidden md:flex items-center relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="Search steel, auctions..."
                  className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500"></span>
              </button>

              {/* User Menu */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={handleUserMenuToggle}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">John Doe</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl border border-gray-200 py-2 z-50 rounded-xl">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => {
                            setIsUserMenuOpen(false)
                            if (item.action) item.action()
                          }}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              {mainNavigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              {/* Mobile My Account Section */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  My Account
                </div>
                {accountNavigation.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout 