import React, { useState } from 'react'
import { X, Gavel, DollarSign, Clock, TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react'
import { formatCurrencyINR } from '../utils/formatCurrencyINR';

interface BiddingModalProps {
  isOpen: boolean
  onClose: () => void
  auction: any
  onPlaceBid: (bidAmount: number, isAutoBid: boolean, maxBid?: number) => void
}

const BiddingModal: React.FC<BiddingModalProps> = ({ isOpen, onClose, auction, onPlaceBid }) => {
  const [bidAmount, setBidAmount] = useState('')
  const [maxBid, setMaxBid] = useState('')
  const [isAutoBid, setIsAutoBid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen || !auction) return null

  const currentBid = auction.currentBid || auction.startingBid
  const minBid = Math.ceil(currentBid * 1.05) // 5% minimum increment

  const handlePlaceBid = async () => {
    if (!bidAmount || parseFloat(bidAmount) < minBid) return

    setIsLoading(true)
    try {
      if (isAutoBid && maxBid && parseFloat(maxBid) > parseFloat(bidAmount)) {
        await onPlaceBid(parseFloat(bidAmount), true, parseFloat(maxBid))
      } else {
        await onPlaceBid(parseFloat(bidAmount), false)
      }
      onClose()
    } catch (error) {
      console.error('Error placing bid:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => formatCurrencyINR(price);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Place Your Bid</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Auction Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{auction.title}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Current Bid:</span>
                <span className="font-semibold text-blue-600">{formatPrice(currentBid)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Minimum Bid:</span>
                <span className="font-semibold text-green-600">{formatPrice(minBid)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Bids:</span>
                <span>{auction.bids || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Time Left:</span>
                <span className="text-orange-600 font-medium">{auction.timeLeft}</span>
              </div>
            </div>
          </div>

          {/* Bid Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Bid Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={formatPrice(minBid)}
                min={minBid}
                step="100"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum bid: {formatPrice(minBid)} (5% above current bid)
            </p>
          </div>

          {/* Auto-Bid Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoBid"
                  checked={isAutoBid}
                  onChange={(e) => setIsAutoBid(e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="autoBid" className="text-sm font-medium text-gray-700">
                  Enable Auto-Bidding
                </label>
              </div>
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Automatically bid up to your maximum amount to stay ahead
            </p>
          </div>

          {/* Max Bid Input (Auto-Bid) */}
          {isAutoBid && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Bid Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={maxBid}
                  onChange={(e) => setMaxBid(e.target.value)}
                  placeholder="Enter maximum bid"
                  min={parseFloat(bidAmount) || minBid}
                  step="100"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                We'll automatically bid up to this amount to keep you in the lead
              </p>
            </div>
          )}

          {/* Auto-Bid Info */}
          {isAutoBid && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Auto-Bidding Enabled</p>
                  <p className="text-xs mt-1">
                    We'll automatically place bids on your behalf up to your maximum amount. 
                    You'll be notified if you're outbid.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Important</p>
                <p className="text-xs mt-1">
                  Bids are binding. Once placed, you cannot cancel or modify your bid. 
                  Make sure you're comfortable with the amount before confirming.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 btn btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceBid}
              disabled={!bidAmount || parseFloat(bidAmount) < minBid || isLoading}
              className="flex-1 btn btn-primary"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Placing Bid...
                </div>
              ) : (
                <div className="flex items-center">
                  <Gavel className="w-4 h-4 mr-2" />
                  {isAutoBid ? 'Enable Auto-Bid' : 'Place Bid'}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BiddingModal 