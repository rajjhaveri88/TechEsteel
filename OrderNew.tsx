import React, { useState } from 'react';

const OrderNew: React.FC = () => {
  const [form, setForm] = useState({
    product: '',
    buyer: '',
    quantity: '',
    price: '',
    warehouse: '',
    deliveryDate: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Order</h1>
      {success ? (
        <div className="bg-green-50 border border-green-200 rounded p-6 text-center">
          <div className="text-2xl text-green-700 font-bold mb-2">Order Created!</div>
          <div className="text-gray-700 mb-4">Your order has been created successfully.</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white border rounded p-6">
          <div>
            <label className="block text-sm font-medium mb-1">Product</label>
            <input name="product" value={form.product} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Buyer</label>
            <input name="buyer" value={form.buyer} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input name="quantity" value={form.quantity} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input name="price" value={form.price} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Warehouse</label>
            <input name="warehouse" value={form.warehouse} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Delivery Date</label>
            <input type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">Create Order</button>
        </form>
      )}
    </div>
  );
};

export default OrderNew; 