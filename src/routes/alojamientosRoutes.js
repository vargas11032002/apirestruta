import express from 'express';
import * as alojamientosController from '../controllers/alojamientosController.js';

const router = express.Router();

// Rutas para alojamientos
router.get('/', alojamientosController.obtenerAlojamientos); // Obtener lista de alojamientos
router.get('/:id', alojamientosController.obtenerAlojamiento); // Obtener un alojamiento por ID
router.post('/', alojamientosController.crearAlojamiento); // Crear un nuevo alojamiento
router.put('/:id', alojamientosController.actualizarAlojamiento); // Actualizar un alojamiento por ID
router.delete('/:id', alojamientosController.eliminarAlojamiento); // Eliminar un alojamiento por ID

export default router;
