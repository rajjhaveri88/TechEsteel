import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Gavel, Save, Package } from 'lucide-react'

interface AuctionFormData {
  title: string
  steelId: string
  startingPrice: number
  reservePrice: number
  endTime: string
  description: string
}

interface SteelItem {
  id: string
  title: string
  grade: string
  quantity: string
  status: string
}

const CreateAuction: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [steelItems, setSteelItems] = useState<SteelItem[]>([])
  const [loadingSteel, setLoadingSteel] = useState(true)
  
  const { register, handleSubmit, formState: { errors } } = useForm<AuctionFormData>()

  // Fetch user's steel items
  useEffect(() => {
    const fetchSteelItems = async () => {
      try {
        // Mock data - replace with actual API call
        const mockSteelItems: SteelItem[] = [
          {
            id: "STEEL-001",
            title: "Premium Carbon Steel Sheets",
            grade: "AISI 1018",
            quantity: "50 tons",
            status: "available"
          },
          {
            id: "STEEL-002",
            title: "Stainless Steel 304 Coils",
            grade: "AISI 304",
            quantity: "25 tons",
            status: "available"
          },
          {
            id: "STEEL-003",
            title: "Structural Steel Beams",
            grade: "ASTM A36",
            quantity: "100 tons",
            status: "available"
          },
          {
            id: "STEEL-004",
            title: "Tool Steel Round Bars",
            grade: "AISI D2",
            quantity: "15 tons",
            status: "auction"
          }
        ]
        
        // Filter only available steel (not already in auction)
        const availableSteel = mockSteelItems.filter(item => item.status === 'available')
        setSteelItems(availableSteel)
      } catch (error) {
        console.error('Error fetching steel items:', error)
        toast.error('Failed to load steel items')
      } finally {
        setLoadingSteel(false)
      }
    }

    fetchSteelItems()
  }, [])

  const onSubmit = async (data: AuctionFormData) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auctions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Auction created successfully!')
        navigate('/my-auctions')
      } else {
        toast.error('Failed to create auction')
      }
    } catch (error) {
      console.error('Error creating auction:', error)
      toast.error('An error occurred while creating the auction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Auction</h1>
            <p className="mt-2 text-gray-600">Start a new steel auction from your inventory</p>
          </div>

          <div className="card p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auction Title *
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Auction title is required' })}
                    className="form-input"
                    placeholder="e.g., Carbon Steel Plate Auction"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Steel from Inventory *
                  </label>
                  {loadingSteel ? (
                    <div className="form-input bg-gray-50 text-gray-500">
                      Loading steel items...
                    </div>
                  ) : steelItems.length === 0 ? (
                    <div className="form-input bg-gray-50 text-gray-500">
                      No available steel items. <a href="/create-steel" className="text-blue-600 hover:underline">Create steel listing first</a>
                    </div>
                  ) : (
                    <select
                      {...register('steelId', { required: 'Please select a steel item' })}
                      className="form-select"
                    >
                      <option value="">Select steel item...</option>
                      {steelItems.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title} - {item.grade} ({item.quantity})
                        </option>
                      ))}
                    </select>
                  )}
                  {errors.steelId && (
                    <p className="mt-1 text-sm text-red-600">{errors.steelId.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Starting Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      {...register('startingPrice', { 
                        required: 'Starting price is required',
                        min: { value: 0.01, message: 'Starting price must be greater than 0' }
                      })}
                      className="form-input pl-8"
                      placeholder="850.00"
                    />
                  </div>
                  {errors.startingPrice && (
                    <p className="mt-1 text-sm text-red-600">{errors.startingPrice.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reserve Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      {...register('reservePrice', { 
                        required: 'Reserve price is required',
                        min: { value: 0.01, message: 'Reserve price must be greater than 0' }
                      })}
                      className="form-input pl-8"
                      placeholder="900.00"
                    />
                  </div>
                  {errors.reservePrice && (
                    <p className="mt-1 text-sm text-red-600">{errors.reservePrice.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time *
                  </label>
                  <input
                    type="datetime-local"
                    {...register('endTime', { required: 'End time is required' })}
                    className="form-input"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  {errors.endTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="form-textarea"
                  placeholder="Describe the auction terms, steel specifications, and any additional details..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/my-auctions')}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || steelItems.length === 0}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Creating...' : 'Create Auction'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/create-steel"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Package className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Add New Steel</h4>
                  <p className="text-sm text-gray-600">Create a new steel listing</p>
                </div>
              </a>
              <a
                href="/my-steel"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Gavel className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Manage Steel</h4>
                  <p className="text-sm text-gray-600">View and manage your steel inventory</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAuction
