import express from 'express';
const router = express.Router();
import * as reservasController from '../controllers/reservasController.js';

// Rutas para reservas
router.get('/:id', reservasController.obtenerReservas);
router.get('/', reservasController.obtenerReservas);
router.post('/', reservasController.crearReserva);
router.put('/:id', reservasController.actualizarReserva);
router.delete('/:id', reservasController.eliminarReserva);

export default router;
