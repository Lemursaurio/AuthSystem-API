import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import userRoutes from './routes/userRoutes.js'
import connectDB from './database/connection.js'

const app = express()
app.use(express.json())
dotenv.config()

connectDB()

app.use('/', userRoutes)

const server = http.createServer(app)

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
    console.log(`Server http iniciado en: http://localhost:${PORT}`)
})