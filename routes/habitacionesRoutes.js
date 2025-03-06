import express from 'express';
import HabitacionesController from '../controllers/habitaciones.js'
// import SessionController from './app/controllers/SessionController';

const routes = express.Router();

// Add habitcaciones
routes.get('/', HabitacionesController.allHabitaciones);
routes.post('/',HabitacionesController.crearHabitaciones );
routes.get('/:id', HabitacionesController.verHabitaciones);

//routes.put('/:id', HabitacionesController.modificarHabitaciones);
routes.delete('/:id', HabitacionesController.elminarHabitaciones);

export default routes;