import chalk from 'chalk'
import mongoose from 'mongoose'

import Pricing from '../../src/models/Pricing'
import Product from '../../src/models/Product'

import { mockData } from './data'

const databaseURL = 'mongodb://localhost:27017/cheil'

mongoose
  .connect(databaseURL, { autoIndex: true, autoCreate: true })
  .then(() => console.log(chalk.green('MongoDB connected')))
  .catch(err => console.error(chalk.red('MongoDB connection error:', err)))

export const insertProducts = async () => {
  console.log(chalk.blue('Starting the data insertion process...'))
  try {
    console.log(chalk.yellow('Deleting existing products and pricing...'))
    await Product.deleteMany({})
    await Pricing.deleteMany({})
    console.log(chalk.green('Existing data deleted successfully.'))

    for (const item of mockData) {
      console.log(chalk.yellow(`Inserting product: ${item.name}`))
      const { price, ...productData } = item
      const product = new Product(productData)
      await product.save()
      console.log(chalk.green(`Product inserted: ${item.name}`))

      const pricingData = {
        productCode: product.code,
        ...price,
      }
      const pricing = new Pricing(pricingData)
      await pricing.save()
      console.log(chalk.green(`Pricing inserted for: ${item.name}`))
    }

    console.log(chalk.green('All data successfully inserted!'))
  } catch (error) {
    console.error(chalk.red('Failed to insert data:', error))
  } finally {
    await mongoose.disconnect()
    console.log(chalk.blue('Disconnected from MongoDB.'))
  }
}
