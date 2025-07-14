import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Auctions from './pages/Auctions'
import AuctionDetail from './pages/AuctionDetail'
import CreateAuction from './pages/CreateAuction'
import CreateSteel from './pages/CreateSteel'
import SteelDetail from './pages/SteelDetail'
import MyAuctions from './pages/MyAuctions'
import MySteel from './pages/MySteel'
import MyBids from './pages/MyBids'
import MyPurchases from './pages/MyPurchases'
import Orders from './pages/Orders'
import Shipments from './pages/Shipments'
import TrackOrders from './pages/TrackOrders'
import Reviews from './pages/Reviews'
import Marketplace from './pages/Marketplace'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Favorites from './pages/Favorites'
import Revenue from './pages/analytics/Revenue'
import AuctionsAnalytics from './pages/analytics/Auctions'
import Listings from './pages/analytics/Listings'
import UsersAnalytics from './pages/analytics/Users'
import OrderNew from './pages/OrderNew'
import OrderDetail from './pages/OrderDetail'
import ShipmentDetail from './pages/ShipmentDetail'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auctions" element={<Auctions />} />
          <Route path="auctions/:id" element={<AuctionDetail />} />
          <Route path="create-auction" element={<CreateAuction />} />
          <Route path="create-steel" element={<CreateSteel />} />
          <Route path="steel/:id" element={<SteelDetail />} />
          <Route path="my-auctions" element={<MyAuctions />} />
          <Route path="my-steel" element={<MySteel />} />
          <Route path="my-bids" element={<MyBids />} />
          <Route path="my-purchases" element={<MyPurchases />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/new" element={<OrderNew />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="shipments" element={<Shipments />} />
          <Route path="shipments/:trackingNumber" element={<ShipmentDetail />} />
          <Route path="track-orders" element={<TrackOrders />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="edit-steel/:id" element={<CreateSteel mode="edit" />} />
          {/* Analytics Details Pages */}
          <Route path="analytics/revenue" element={<Revenue />} />
          <Route path="analytics/auctions" element={<AuctionsAnalytics />} />
          <Route path="analytics/listings" element={<Listings />} />
          <Route path="analytics/users" element={<UsersAnalytics />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App 