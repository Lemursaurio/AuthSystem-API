import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/connection.js'

import habitacionRoutes from './routes/habitacionesRoutes.js'
import reservasRoutes from './routes/reservasRoutes.js'
import ocuparRoutes from './routes/ocuparRoutes.js'
const app = express()

// middleware
app.use(express.json());


// rutas 
app.use("/habitaciones", habitacionRoutes);
app.use("/reservas", reservasRoutes );
app.use("/ocupar", ocuparRoutes );

dotenv.config();

connectDB();

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

