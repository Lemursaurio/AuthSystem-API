import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import connectDB from './database/connection.js'

import habitacionRoutes from './routes/habitacionesRoutes.js'
import reservasRoutes from './routes/reservasRoutes.js'
import ocuparRoutes from './routes/ocuparRoutes.js'
const app = express()

// middleware
app.use(express.json());
dotenv.config();

connectDB()

// rutas 
app.use("/habitaciones", habitacionRoutes);
app.use("/reservas", reservasRoutes );
app.use("/ocupar", ocuparRoutes );
app.use('/', authRoutes)
app.use('/', userRoutes)

const server = http.createServer(app)

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
    console.log(`Server http iniciado en: http://localhost:${PORT}`)
})

