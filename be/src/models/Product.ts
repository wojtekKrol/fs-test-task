import mongoose, { Document } from 'mongoose'

import { IProduct } from '../../types/Product'

interface ProductDocument extends IProduct, Document {}

const productSchema = new mongoose.Schema(
  {
    image: String,
    code: { type: String, required: true, unique: true },
    name: String,
    color: String,
    capacity: Number,
    dimensions: String,
    features: [String],
    energyClass: { type: String, enum: ['A', 'B', 'C'] },
    pricing: { type: mongoose.Schema.Types.ObjectId, ref: 'Pricing' },
  },
  { timestamps: true }
)

const Product = mongoose.model<ProductDocument>('Product', productSchema)
export default Product
