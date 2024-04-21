import { insertProducts } from './productFixtures'

const fixtures = async () => {
  await insertProducts()
}

fixtures()
