import express from 'express';
import reservaController from '../controllers/reservas.js'

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = express.Router();

// Add routes
routes.get('/', reservaController.verReservas);
routes.get('/:id', reservaController.buscarReserva);
routes.post('/', reservaController.crearReserva);
routes.delete('/:id', reservaController.cancelarReserva);

export default routes;