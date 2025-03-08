import express from 'express';
import ocuparController from '../controllers/ocupar.js'

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = express.Router();

// Add routes
//routes.get('/', reservaController.verReservas);
//routes.get('/:id', reservaController.buscarReserva);
routes.post('/', ocuparController.ocuparHabitacionDisponible);
routes.post('/:id', ocuparController.ocuparHabitacionRerservada);


//routes.delete('/:id', reservaController.cancelarReserva);

export default routes;