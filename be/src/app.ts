import chalk from 'chalk'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import figures from 'figures'
import helmet from 'helmet'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const port = process.env.PORT || 5500
console.log(process.env.PORT)
// Middleware
app.use(cors())
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", "https: 'unsafe-inline'"],
      },
    },
  })
)

app.use(express.json())

// Routes
app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'ok' })
  console.log(chalk.green(`${figures.tick} Health check passed`))
})

const databaseURL = 'mongodb://localhost:27017/cheil'

// MongoDB Connection
mongoose
  .connect(databaseURL, { autoIndex: true, autoCreate: true })
  .then(() => console.log(chalk.green(`${figures.tick} MongoDB connected`)))
  .catch(err =>
    console.error(
      chalk.red(`${figures.cross} MongoDB connection error: ${err}`)
    )
  )

// Start the server
app.listen(port, () => {
  console.log(chalk.yellow(`${figures.star} Server running on port ${port}`))
})
