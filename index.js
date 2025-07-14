import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.js';
import steelRoutes from './routes/steel.js';
import auctionRoutes from './routes/auctions.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Steel Trading Platform API is running', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/steel', steelRoutes);
app.use('/api/auctions', auctionRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('join-auction', (auctionId) => {
    socket.join(`auction-${auctionId}`);
  });
  socket.on('leave-auction', (auctionId) => {
    socket.leave(`auction-${auctionId}`);
  });
  socket.on('new-bid', (data) => {
    socket.to(`auction-${data.auctionId}`).emit('bid-update', {
      auctionId: data.auctionId,
      bid: data.bid,
      currentPrice: data.currentPrice
    });
  });
  socket.on('auction-status-change', (data) => {
    socket.to(`auction-${data.auctionId}`).emit('status-update', {
      auctionId: data.auctionId,
      status: data.status,
      winner: data.winner
    });
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' });
});
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/steel-trading', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected:', conn.connection.host);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 8000;
  server.listen(PORT, () => {
    console.log('🚀 Steel Trading Platform Server running on port', PORT);
    console.log('📊 Environment:', process.env.NODE_ENV || 'development');
    console.log('🌐 API URL:', `http://localhost:${PORT}/api`);
  });
};

startServer();

export { io }; 