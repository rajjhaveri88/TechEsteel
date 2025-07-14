import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Clock, MapPin, DollarSign, Users, Gavel } from 'lucide-react'

interface Auction {
  id: string
  title: string
  steelName: string
  startingPrice: number
  currentPrice: number
  reservePrice: number
  quantity: number
  unit: string
  status: string
  endTime: string
  seller: string
  bidCount: number
  description: string
  bids: Array<{
    id: string
    bidder: string
    amount: number
    timestamp: string
  }>
}

const AuctionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [auction, setAuction] = useState<Auction | null>(null)
  const [loading, setLoading] = useState(true)
  const [bidAmount, setBidAmount] = useState('')
  const [bidding, setBidding] = useState(false)

  useEffect(() => {
    if (id) {
      fetchAuction()
    }
  }, [id])

  const fetchAuction = async () => {
    try {
      const response = await fetch(`/api/auctions/${id}`)
      const data = await response.json()
      setAuction(data)
    } catch (error) {
      console.error('Error fetching auction:', error)
      toast.error('Failed to load auction details')
    } finally {
      setLoading(false)
    }
  }

  const handleBid = async () => {
    if (!bidAmount || !auction) return

    const amount = parseFloat(bidAmount)
    if (amount <= auction.currentPrice) {
      toast.error('Bid must be higher than current price')
      return
    }

    setBidding(true)
    try {
      const response = await fetch(`/api/auctions/${id}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      if (response.ok) {
        toast.success('Bid placed successfully!')
        setBidAmount('')
        fetchAuction() // Refresh auction data
      } else {
        toast.error('Failed to place bid')
      }
    } catch (error) {
      console.error('Error placing bid:', error)
      toast.error('An error occurred while placing bid')
    } finally {
      setBidding(false)
    }
  }

  const formatTimeLeft = (endTime: string) => {
    const now = new Date().getTime()
    const end = new Date(endTime).getTime()
    const diff = end - now

    if (diff <= 0) return 'Ended'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

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

  if (!auction) {
    return (
      <div className="space-y-6">
        <div className="card p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Auction Not Found</h2>
          <p className="text-gray-600">The auction you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{auction.title}</h1>
        <p className="mt-2 text-gray-600">{auction.steelName}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-2">
        {/* Main Auction Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Auction Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">
                  Current Price: <span className="font-semibold text-lg">${auction.currentPrice}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="text-gray-600">
                  Ends: <span className="font-semibold">{formatTimeLeft(auction.endTime)}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-gray-600">
                  Bids: <span className="font-semibold">{auction.bidCount}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">Seller: {auction.seller}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-600">{auction.description}</p>
            </div>
          </div>

          {/* Bid History */}
          <div className="card p-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bid History</h3>
            {auction.bids && auction.bids.length > 0 ? (
              <div className="space-y-3">
                {auction.bids.map((bid) => (
                  <div key={bid.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <span className="font-medium text-gray-900">{bid.bidder}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {new Date(bid.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <span className="font-semibold text-green-600">${bid.amount}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No bids yet. Be the first to bid!</p>
            )}
          </div>
        </div>

        {/* Bidding Panel */}
        <div className="space-y-6">
          <div className="card p-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Place Your Bid</h3>
            
            {auction.status === 'active' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bid Amount (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min={auction.currentPrice + 0.01}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="input pl-8"
                      placeholder={`${auction.currentPrice + 0.01}`}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum bid: ${(auction.currentPrice + 0.01).toFixed(2)}
                  </p>
                </div>
                
                <button
                  onClick={handleBid}
                  disabled={bidding || !bidAmount}
                  className="w-full btn btn-primary flex items-center justify-center space-x-2"
                >
                  <Gavel className="w-4 h-4" />
                  <span>{bidding ? 'Placing Bid...' : 'Place Bid'}</span>
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-500 mb-4">This auction has ended</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  auction.status === 'ended' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {auction.status}
                </span>
              </div>
            )}
          </div>

          {/* Auction Stats */}
          <div className="card p-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Auction Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Starting Price:</span>
                <span className="font-medium">${auction.startingPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reserve Price:</span>
                <span className="font-medium">${auction.reservePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{auction.quantity} {auction.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Value:</span>
                <span className="font-medium">${(auction.currentPrice * auction.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuctionDetail
