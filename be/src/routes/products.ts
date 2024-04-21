import { Router } from 'express'

import Pricing from '../models/Pricing'
import Product from '../models/Product'

const router = Router()

// Route to fetch all products with their pricing details
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    // Enhance each product with pricing information
    const productsWithPricing = await Promise.all(
      products.map(async product => {
        const pricing = await Pricing.findOne({ productCode: product.code })

        return { ...product.toObject(), pricing }
      })
    )
    res.json(productsWithPricing)
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message })
  }
})

export default router
