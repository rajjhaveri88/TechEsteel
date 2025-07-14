import React, { useState } from 'react'
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  CreditCard, 
  Globe, 
  Palette,
  Monitor,
  Smartphone,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Building
} from 'lucide-react'
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({ open: false, message: '', type: 'success' });
  const [pending2FA, setPending2FA] = useState(false);

  const [settings, setSettings] = useState({
    language: 'English',
    timezone: 'UTC-5 (Eastern Time)',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    twoFactorAuth: true,
    loginAlerts: true,
    marketingEmails: false,
    autoLogout: 30,
    sessionTimeout: 60
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'privacy', name: 'Privacy', icon: Eye }
  ]

  const handleSettingChange = (key: string, value: any) => {
    if (key === 'twoFactorAuth' && settings.twoFactorAuth) {
      setPending2FA(true);
      return;
    }
    setSettings(prev => ({ ...prev, [key]: value }));
    setToast({ open: true, message: `${key.replace(/([A-Z])/g, ' $1')} updated.`, type: 'success' });
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Saving settings:', settings)
    setToast({ open: true, message: 'Settings saved successfully.', type: 'success' });
  }

  const confirmDisable2FA = () => {
    setSettings(prev => ({ ...prev, twoFactorAuth: false }));
    setToast({ open: true, message: 'Two-Factor Authentication disabled.', type: 'success' });
    setPending2FA(false);
  };
  const cancelDisable2FA = () => setPending2FA(false);

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setToast({ open: true, message: 'All password fields are required.', type: 'error' });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setToast({ open: true, message: 'New passwords do not match.', type: 'error' });
      return;
    }
    // Simulate password change
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setToast({ open: true, message: 'Password changed successfully.', type: 'success' });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="card p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account preferences and security settings</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={handleSaveSettings}
                  className="btn btn-primary"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
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
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                      className="form-select"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('timezone', e.target.value)}
                      className="form-select"
                    >
                      <option value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</option>
                      <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</option>
                      <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                      <option value="UTC+1 (Central European Time)">UTC+1 (Central European Time)</option>
                      <option value="UTC+5:30 (India Standard Time)">UTC+5:30 (India Standard Time)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange('currency', e.target.value)}
                      className="form-select"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                      className="form-select"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                
                {/* Two-Factor Authentication */}
                <div className="card p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-lg">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm font-medium ${
                        settings.twoFactorAuth ? 'text-emerald-600' : 'text-gray-500'
                      }`}>
                        {settings.twoFactorAuth ? 'Enabled' : 'Disabled'}
                      </span>
                      <button 
                        onClick={() => handleSettingChange('twoFactorAuth', !settings.twoFactorAuth)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
                <ConfirmModal
                  open={pending2FA}
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

                {/* Login Alerts */}
                <div className="card p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 flex items-center justify-center rounded-lg">
                        <Bell className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Login Alerts</h4>
                        <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm font-medium ${
                        settings.loginAlerts ? 'text-emerald-600' : 'text-gray-500'
                      }`}>
                        {settings.loginAlerts ? 'Enabled' : 'Disabled'}
                      </span>
                      <button 
                        onClick={() => handleSettingChange('loginAlerts', !settings.loginAlerts)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.loginAlerts ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Change Password */}
                <div className="card p-6 border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                          className="form-input pr-10"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                          className="form-input pr-10"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        className="form-input"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <button
                      onClick={handleChangePassword}
                      className="btn btn-primary"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Change Password</span>
                    </button>
                  </div>
                </div>

                {/* Session Settings */}
                <div className="card p-6 border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Session Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Auto Logout (minutes)</label>
                      <select
                        value={settings.autoLogout}
                        onChange={(e) => handleSettingChange('autoLogout', parseInt(e.target.value))}
                        className="form-select"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                        <option value={0}>Never</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                      <select
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                        className="form-select"
                      >
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                        <option value={240}>4 hours</option>
                        <option value={480}>8 hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
                
                <div className="space-y-4">
                  <div className="card p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-lg">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="card p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 flex items-center justify-center rounded-lg">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">SMS Notifications</h4>
                          <p className="text-sm text-gray-600">Receive notifications via text message</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSettingChange('smsNotifications', !settings.smsNotifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.smsNotifications ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="card p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 flex items-center justify-center rounded-lg">
                          <Bell className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">Push Notifications</h4>
                          <p className="text-sm text-gray-600">Receive notifications in your browser</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="card p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-yellow-100 flex items-center justify-center rounded-lg">
                          <Mail className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">Marketing Emails</h4>
                          <p className="text-sm text-gray-600">Receive promotional and marketing emails</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSettingChange('marketingEmails', !settings.marketingEmails)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.marketingEmails ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Appearance Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-6 border border-gray-200 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Theme</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={settings.theme === 'light'}
                          onChange={(e) => handleSettingChange('theme', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-yellow-400 rounded"></div>
                          <span className="text-sm font-medium text-gray-700">Light</span>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={settings.theme === 'dark'}
                          onChange={(e) => handleSettingChange('theme', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-800 rounded"></div>
                          <span className="text-sm font-medium text-gray-700">Dark</span>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="theme"
                          value="auto"
                          checked={settings.theme === 'auto'}
                          onChange={(e) => handleSettingChange('theme', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-gray-800 rounded"></div>
                          <span className="text-sm font-medium text-gray-700">Auto (System)</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="card p-6 border border-gray-200 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Display</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
                        <select className="form-select">
                          <option value="grid">Grid View</option>
                          <option value="list">List View</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Items per Page</label>
                        <select className="form-select">
                          <option value="12">12 items</option>
                          <option value="24">24 items</option>
                          <option value="48">48 items</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
                
                <div className="space-y-4">
                  <div className="card p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-lg">
                          <Eye className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">Profile Visibility</h4>
                          <p className="text-sm text-gray-600">Control who can see your profile information</p>
                        </div>
                      </div>
                      <select className="form-select w-32">
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="contacts">Contacts Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="card p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 flex items-center justify-center rounded-lg">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">Activity Status</h4>
                          <p className="text-sm text-gray-600">Show when you're online</p>
                        </div>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white" />
                      </button>
                    </div>
                  </div>

                  <div className="card p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 flex items-center justify-center rounded-lg">
                          <Building className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">Company Information</h4>
                          <p className="text-sm text-gray-600">Show company details in your profile</p>
                        </div>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 