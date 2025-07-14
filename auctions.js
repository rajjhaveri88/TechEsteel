import express from 'express';
import { body, validationResult } from 'express-validator';
import { io } from '../index.js';

const router = express.Router();

// Get all auctions
router.get('/', async (req, res) => {
  try {
    // TODO: Add Auction model and database query
    // For now, return mock data
    const auctions = [
      {
        id: '1',
        title: 'Carbon Steel Plate Auction',
        steelId: '1',
        steelName: 'Carbon Steel Plate',
        startingPrice: 2.00,
        currentPrice: 2.35,
        reservePrice: 2.50,
        quantity: 1000,
        unit: 'kg',
        status: 'active',
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        seller: 'SteelCorp Inc',
        bidCount: 5,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Stainless Steel Sheet Auction',
        steelId: '2',
        steelName: 'Stainless Steel Sheet',
        startingPrice: 4.00,
        currentPrice: 4.75,
        reservePrice: 4.50,
        quantity: 500,
        unit: 'kg',
        status: 'active',
        endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        seller: 'MetalWorks Ltd',
        bidCount: 3,
        createdAt: new Date().toISOString()
      }
    ];

    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get auction by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Add Auction model and database query
    // For now, return mock data
    const auction = {
      id,
      title: 'Carbon Steel Plate Auction',
      steelId: '1',
      steelName: 'Carbon Steel Plate',
      startingPrice: 2.00,
      currentPrice: 2.35,
      reservePrice: 2.50,
      quantity: 1000,
      unit: 'kg',
      status: 'active',
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      seller: 'SteelCorp Inc',
      bidCount: 5,
      description: 'High-quality carbon steel plate auction. Minimum bid increment: $0.05',
      bids: [
        { id: '1', bidder: 'Buyer1', amount: 2.35, timestamp: new Date().toISOString() },
        { id: '2', bidder: 'Buyer2', amount: 2.30, timestamp: new Date().toISOString() },
        { id: '3', bidder: 'Buyer1', amount: 2.25, timestamp: new Date().toISOString() }
      ],
      createdAt: new Date().toISOString()
    };

    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new auction
router.post('/', [
  body('title').trim().isLength({ min: 5 }),
  body('steelId').trim().isLength({ min: 1 }),
  body('startingPrice').isNumeric(),
  body('reservePrice').isNumeric(),
  body('endTime').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, steelId, startingPrice, reservePrice, endTime, description } = req.body;

    // TODO: Add Auction model and database save
    // For now, return success
    const newAuction = {
      id: Date.now().toString(),
      title,
      steelId,
      startingPrice,
      currentPrice: startingPrice,
      reservePrice,
      status: 'active',
      endTime,
      description,
      seller: 'Current User', // TODO: Get from auth
      bidCount: 0,
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      message: 'Auction created successfully',
      auction: newAuction
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Place bid
router.post('/:id/bid', [
  body('amount').isNumeric()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { amount } = req.body;

    // TODO: Add Auction and Bid models, validation, and database save
    // For now, return success and emit WebSocket event
    const bid = {
      id: Date.now().toString(),
      auctionId: id,
      bidder: 'Current User', // TODO: Get from auth
      amount,
      timestamp: new Date().toISOString()
    };

    // Emit real-time update
    io.to(`auction-${id}`).emit('bid-update', {
      auctionId: id,
      bid,
      currentPrice: amount
    });

    res.json({
      message: 'Bid placed successfully',
      bid
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router; 