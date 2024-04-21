import dotenv from 'dotenv'

import { insertProducts } from './productFixtures'

dotenv.config()

const fixtures = async () => {
  await insertProducts()
}

fixtures()
