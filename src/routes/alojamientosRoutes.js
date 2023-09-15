import express from 'express';
import {
  obtenerAlojamientos,
  obtenerAlojamiento,
  crearAlojamiento,
  actualizarAlojamiento,
  eliminarAlojamiento
} from '../controllers/alojamientosController.js';

const router = express.Router();

router.get('/', obtenerAlojamientos); // Obtener lista de alojamientos
router.get('/:id', obtenerAlojamiento); // Obtener un alojamiento por ID
router.post('/', crearAlojamiento); // Crear un nuevo alojamiento
router.put('/:id', actualizarAlojamiento); // Actualizar un alojamiento por ID
router.delete('/:id', eliminarAlojamiento); // Eliminar un alojamiento por ID

export default router;
