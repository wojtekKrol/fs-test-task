import express, { Express } from 'express'
import request from 'supertest'

import productRouter from '../src/routes/productRouter'

const app: Express = express()
app.use(express.json())
app.use('/products', productRouter)

describe('Product API', () => {
  it('should return all products based on capacity filter', async () => {
    const response = await request(app).get('/products?capacity=10')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          capacity: 10,
        }),
      ])
    )
  })
})
