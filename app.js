import express from 'express'
import dotenv from 'dotenv'

import connectDB from './database/connection.js'

const app = express()
app.use(express.json())
dotenv.config()

connectDB()