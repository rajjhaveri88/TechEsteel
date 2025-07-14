import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateSteel from './CreateSteel';

// Mock function to fetch steel by ID
const fetchSteelById = (id: string) => {
  // Replace with real API call
  return {
    id,
    name: 'Premium Carbon Steel Sheets',
    grade: 'AISI 1018',
    specification: 'ASTM A36',
    type: 'Carbon Steel',
    form: 'Sheet',
    quantity: 50,
    unit: 'tons',
    price: 850,
    location: 'Mumbai, India',
    seller: 'John Doe',
    description: 'High-quality carbon steel sheets suitable for structural applications',
    status: 'available',
    warehouse: 'Mumbai Central Warehouse',
    images: [
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
    ],
    documents: [
      { name: 'Mill Test Report.pdf', type: 'pdf', url: '#', size: '2.3 MB' },
      { name: 'Packing List.pdf', type: 'pdf', url: '#', size: '1.1 MB' }
    ],
    specifications: {
      thickness: '3mm', width: '1500mm', length: '6000mm', yieldStrength: '250 MPa', tensileStrength: '400 MPa'
    },
    chemicalComposition: {
      carbon: '0.18%', manganese: '0.75%', phosphorus: '0.04%', sulfur: '0.05%'
    },
    certifications: ['ISO 9001', 'ASTM A36'],
    qualityAssurance: {
      millTestReport: true, thirdPartyInspection: true, ultrasonicTesting: false, magneticParticleTesting: false
    },
    packaging: 'Standard wooden crates',
    deliveryTerms: 'FOB Mumbai',
    paymentTerms: '30 days after delivery',
    minimumOrder: 5,
    leadTime: '2-3 weeks',
    condition: 'New',
    surfaceFinish: 'Hot rolled',
    tolerance: '±0.5mm',
    applications: ['Construction', 'Manufacturing', 'Infrastructure'],
    createdAt: '2024-01-15'
  };
};

const EditSteel: React.FC = () => {
  const { id } = useParams();
  const [steel, setSteel] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) setSteel(fetchSteelById(id));
  }, [id]);

  if (!steel) return <div className="max-w-2xl mx-auto py-8 px-4">Loading...</div>;

  // You would pass steel as initial values to the CreateSteel form
  // For now, just show a mock form and success message
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Steel Listing</h1>
      {success ? (
        <div className="bg-green-50 border border-green-200 rounded p-6 text-center">
          <div className="text-2xl text-green-700 font-bold mb-2">Steel Listing Updated!</div>
          <div className="text-gray-700 mb-4">Your changes have been saved.</div>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); setSuccess(true); }} className="space-y-4 bg-white border rounded p-6">
          {/* Repeat all fields as in CreateSteel, pre-filled with steel data (mock for now) */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="w-full border rounded px-3 py-2" defaultValue={steel.name} required />
          </div>
          {/* ...repeat for all other fields... */}
          <button type="submit" className="btn btn-primary w-full mt-4">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditSteel; 