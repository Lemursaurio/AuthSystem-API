import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/connection.js'

import habitacionRoutes from './routes/habitacionesRoutes.js'
import reservasRoutes from './routes/reservasRoutes.js'

const app = express()

// middleware
app.use(express.json());


// rutas 
app.use("/habitaciones", habitacionRoutes);
app.use("/reservas", reservasRoutes );


dotenv.config();

connectDB();

// **Servidor**
const PORT = process.env.PORT || 3000; //  Define el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})