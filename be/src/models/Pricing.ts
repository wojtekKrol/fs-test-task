import mongoose, { Document } from 'mongoose'

import { IPricing } from '../../types/models/PricingModel'

interface PricingDocument extends IPricing, Document {}

const pricingSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, ref: 'Product' },
    value: Number,
    currency: String,
    installment: {
      value: Number,
      period: Number,
    },
    validFrom: Date,
    validTo: Date,
  },
  { timestamps: true }
)

const Pricing = mongoose.model<PricingDocument>('Pricing', pricingSchema)
export default Pricing
