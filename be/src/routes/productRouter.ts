import chalk from 'chalk'
import { Router, Request, Response } from 'express'
import figures from 'figures'
import HttpStatusCodes from 'http-status-codes'

import { IPricing } from '../../types/models/PricingModel'
import { IProduct } from '../../types/models/ProductModel'
import { Capacity, EnergyClass } from '../../types/product'
import Pricing from '../models/Pricing'
import Product from '../models/Product'

interface QueryParams {
  capacity?: Capacity
  energyClass?: EnergyClass
  color?: string
  features?: string | string[]
}

const productRouter = Router()

productRouter.get('/', async (req: Request, res: Response) => {
  const { capacity, energyClass, color, features }: QueryParams = req.query

  // Log the incoming query parameters
  console.log(
    chalk.blue(`Received query parameters: ${JSON.stringify(req.query)}`)
  )

  // eslint-disable-next-line
  const query: Record<string, any> = {}
  if (capacity) query.capacity = { $eq: capacity }
  if (energyClass) query.energyClass = { $eq: energyClass }
  if (color) query.color = { $eq: color }
  if (features)
    query.features = { $all: Array.isArray(features) ? features : [features] }

  // Log the MongoDB query
  console.log(chalk.magenta(`MongoDB Query: ${JSON.stringify(query)}`))

  try {
    const products = await Product.find(query).select(
      '-__v -createdAt -updatedAt -_id'
    )
    console.log(
      chalk.green(`Found ${products.length} products matching criteria`)
    ) // Log found products count

    const productsWithPricing: Array<IProduct & { price: IPricing }> =
      await Promise.all(
        products.map(async product => {
          const price = await Pricing.findOne({
            productCode: product.code,
          }).select('-__v -createdAt -updatedAt -_id -productCode')

          return { ...product.toObject(), price: price!.toObject() }
        })
      )

    // Log the detailed products with pricing
    console.log(
      chalk.green(
        `${figures.tick} Products with pricing details fetched successfully.`
      )
    )
    res.json(productsWithPricing)
  } catch (error) {
    console.error(chalk.red(`Error fetching products: ${error}`))
    if (error instanceof Error) {
      res.status(500)
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    } else {
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unknown error' })
    }
  }
})

export default productRouter
