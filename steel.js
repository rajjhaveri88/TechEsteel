import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get all steel listings
router.get('/', async (req, res) => {
  try {
    // TODO: Add Steel model and database query
    // For now, return enhanced mock data
    const steelListings = [
      {
        id: '1',
        name: 'Carbon Steel Plate',
        grade: 'A36',
        specification: 'ASTM A36',
        type: 'Carbon Steel',
        form: 'Plate',
        quantity: 1000,
        unit: 'kg',
        price: 2.50,
        location: 'Houston, TX',
        seller: 'SteelCorp Inc',
        description: 'High-quality carbon steel plate suitable for construction and manufacturing applications.',
        specifications: {
          thickness: '10mm',
          width: '2000mm',
          length: '6000mm',
          yieldStrength: '250 MPa',
          tensileStrength: '400-550 MPa',
          elongation: '21%',
          hardness: 'HB 137-187'
        },
        chemicalComposition: {
          carbon: '0.26% max',
          manganese: '0.75% max',
          phosphorus: '0.04% max',
          sulfur: '0.05% max',
          silicon: '0.40% max'
        },
        certifications: ['ASTM A36', 'ISO 9001:2015', 'CE Marking'],
        qualityAssurance: {
          millTestReport: true,
          thirdPartyInspection: true,
          ultrasonicTesting: false,
          magneticParticleTesting: false
        },
        packaging: 'Standard wooden crates',
        deliveryTerms: 'FOB Houston',
        paymentTerms: 'Net 30 days',
        minimumOrder: 500,
        leadTime: '2-3 weeks',
        condition: 'New',
        surfaceFinish: 'Hot rolled',
        tolerance: 'ASTM A6',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Stainless Steel Sheet',
        grade: '304',
        specification: 'ASTM A240',
        type: 'Stainless Steel',
        form: 'Sheet',
        quantity: 500,
        unit: 'kg',
        price: 4.75,
        location: 'Chicago, IL',
        seller: 'MetalWorks Ltd',
        description: 'Premium 304 stainless steel sheet with excellent corrosion resistance.',
        specifications: {
          thickness: '2mm',
          width: '1500mm',
          length: '3000mm',
          yieldStrength: '205 MPa',
          tensileStrength: '515 MPa',
          elongation: '40%',
          hardness: 'HV 201'
        },
        chemicalComposition: {
          carbon: '0.08% max',
          manganese: '2.00% max',
          phosphorus: '0.045% max',
          sulfur: '0.030% max',
          silicon: '1.00% max',
          chromium: '18.0-20.0%',
          nickel: '8.0-10.5%',
          nitrogen: '0.10% max'
        },
        certifications: ['ASTM A240', 'ISO 9001:2015', 'PED 2014/68/EU'],
        qualityAssurance: {
          millTestReport: true,
          thirdPartyInspection: true,
          ultrasonicTesting: true,
          magneticParticleTesting: false
        },
        packaging: 'Plastic wrapped, wooden pallets',
        deliveryTerms: 'FOB Chicago',
        paymentTerms: 'Net 45 days',
        minimumOrder: 100,
        leadTime: '1-2 weeks',
        condition: 'New',
        surfaceFinish: '2B finish',
        tolerance: 'ASTM A480',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Alloy Steel Round Bar',
        grade: '4140',
        specification: 'ASTM A29',
        type: 'Alloy Steel',
        form: 'Round Bar',
        quantity: 2000,
        unit: 'kg',
        price: 3.25,
        location: 'Pittsburgh, PA',
        seller: 'AlloySteel Corp',
        description: 'High-strength alloy steel round bar for demanding applications.',
        specifications: {
          diameter: '50mm',
          length: '6000mm',
          yieldStrength: '415 MPa',
          tensileStrength: '655 MPa',
          elongation: '25%',
          hardness: 'HB 197-235'
        },
        chemicalComposition: {
          carbon: '0.38-0.43%',
          manganese: '0.75-1.00%',
          phosphorus: '0.035% max',
          sulfur: '0.040% max',
          silicon: '0.15-0.35%',
          chromium: '0.80-1.10%',
          molybdenum: '0.15-0.25%'
        },
        certifications: ['ASTM A29', 'ISO 9001:2015', 'API 6A'],
        qualityAssurance: {
          millTestReport: true,
          thirdPartyInspection: true,
          ultrasonicTesting: true,
          magneticParticleTesting: true
        },
        packaging: 'Bundled with steel straps',
        deliveryTerms: 'FOB Pittsburgh',
        paymentTerms: 'Net 30 days',
        minimumOrder: 1000,
        leadTime: '3-4 weeks',
        condition: 'New',
        surfaceFinish: 'Hot finished',
        tolerance: 'ASTM A29',
        createdAt: new Date().toISOString()
      }
    ];

    res.json(steelListings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get steel by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Add Steel model and database query
    // For now, return enhanced mock data
    const steel = {
      id,
      name: 'Carbon Steel Plate',
      grade: 'A36',
      specification: 'ASTM A36',
      type: 'Carbon Steel',
      form: 'Plate',
      quantity: 1000,
      unit: 'kg',
      price: 2.50,
      location: 'Houston, TX',
      seller: 'SteelCorp Inc',
      description: 'High-quality carbon steel plate suitable for construction and manufacturing applications. This material meets ASTM A36 specifications and is ideal for structural applications, machinery parts, and general fabrication.',
      specifications: {
        thickness: '10mm',
        width: '2000mm',
        length: '6000mm',
        yieldStrength: '250 MPa',
        tensileStrength: '400-550 MPa',
        elongation: '21%',
        hardness: 'HB 137-187',
        density: '7.85 g/cm³',
        thermalConductivity: '50.2 W/m·K',
        electricalResistivity: '1.7 × 10⁻⁷ Ω·m'
      },
      chemicalComposition: {
        carbon: '0.26% max',
        manganese: '0.75% max',
        phosphorus: '0.04% max',
        sulfur: '0.05% max',
        silicon: '0.40% max',
        copper: '0.20% min (when specified)',
        nickel: '0.40% max',
        chromium: '0.20% max',
        molybdenum: '0.08% max',
        vanadium: '0.08% max'
      },
      certifications: ['ASTM A36', 'ISO 9001:2015', 'CE Marking', 'RoHS Compliant'],
      qualityAssurance: {
        millTestReport: true,
        thirdPartyInspection: true,
        ultrasonicTesting: false,
        magneticParticleTesting: false,
        chemicalAnalysis: true,
        mechanicalTesting: true,
        dimensionalInspection: true
      },
      packaging: 'Standard wooden crates with moisture protection',
      deliveryTerms: 'FOB Houston',
      paymentTerms: 'Net 30 days',
      minimumOrder: 500,
      leadTime: '2-3 weeks',
      condition: 'New',
      surfaceFinish: 'Hot rolled',
      tolerance: 'ASTM A6',
      applications: ['Structural construction', 'Machinery parts', 'General fabrication', 'Pressure vessels'],
      createdAt: new Date().toISOString()
    };

    res.json(steel);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new steel listing
router.post('/', [
  body('name').trim().isLength({ min: 2 }),
  body('grade').trim().isLength({ min: 1 }),
  body('specification').trim().isLength({ min: 1 }),
  body('type').trim().isLength({ min: 1 }),
  body('form').trim().isLength({ min: 1 }),
  body('quantity').isNumeric(),
  body('price').isNumeric(),
  body('location').trim().isLength({ min: 2 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      name, grade, specification, type, form, quantity, unit, price, location, 
      description, specifications, chemicalComposition, certifications, 
      qualityAssurance, packaging, deliveryTerms, paymentTerms, minimumOrder, 
      leadTime, condition, surfaceFinish, tolerance, applications 
    } = req.body;

    // TODO: Add Steel model and database save
    // For now, return success
    const newSteel = {
      id: Date.now().toString(),
      name,
      grade,
      specification,
      type,
      form,
      quantity,
      unit: unit || 'kg',
      price,
      location,
      description,
      specifications: specifications || {},
      chemicalComposition: chemicalComposition || {},
      certifications: certifications || [],
      qualityAssurance: qualityAssurance || {},
      packaging: packaging || 'Standard packaging',
      deliveryTerms: deliveryTerms || 'FOB',
      paymentTerms: paymentTerms || 'Net 30 days',
      minimumOrder: minimumOrder || 100,
      leadTime: leadTime || '2-3 weeks',
      condition: condition || 'New',
      surfaceFinish: surfaceFinish || 'As rolled',
      tolerance: tolerance || 'Standard',
      applications: applications || [],
      seller: 'Current User', // TODO: Get from auth
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      message: 'Steel listing created successfully',
      steel: newSteel
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router; 