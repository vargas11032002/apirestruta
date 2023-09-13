import express from 'express';
const router = express.Router();
import * as reservasController from '../controllers/reservasController.js';

// Rutas para reservas
router.get('/', reservasController.obtenerReservas);
router.get('/:id', reservasController.obtenerReserva);
router.post('/', reservasController.crearReserva);
router.put('/:id', reservasController.actualizarReserva);
router.delete('/:id', reservasController.eliminarReserva);

export default router;
