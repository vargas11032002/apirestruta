import { pool } from '../database.js';

export const obtenerAlojamientos = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM alojamientos');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener alojamientos' });
  }
};

export const obtenerAlojamiento = async (req, res) => {
  const alojamientoID = req.params.id;
  try {
    const [results] = await pool.query('SELECT * FROM alojamientos WHERE alojamiento_id = ?', [alojamientoID]);
    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Alojamiento no encontrado' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el alojamiento' });
  }
};

export const crearAlojamiento = async (req, res) => {
  const { nombre_alojamiento, ubicacion_alojamiento, precio_alojamiento, propietario_id } = req.body;
  if (!nombre_alojamiento || !ubicacion_alojamiento || !precio_alojamiento || !propietario_id) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios en la solicitud' });
  }

  try {
    await pool.query(
      'INSERT INTO alojamientos (nombre_alojamiento, ubicacion_alojamiento, precio_alojamiento, propietario_id) VALUES (?, ?, ?, ?)',
      [nombre_alojamiento, ubicacion_alojamiento, precio_alojamiento, propietario_id]
    );
    res.json({ mensaje: 'Alojamiento creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el alojamiento' });
  }
};

export const actualizarAlojamiento = async (req, res) => {
  const { nombre_alojamiento, ubicacion_alojamiento, precio_alojamiento, propietario_id } = req.body;
  const alojamientoID = req.params.id;
  try {
    await pool.query(
      'UPDATE alojamientos SET nombre_alojamiento = ?, ubicacion_alojamiento = ?, precio_alojamiento = ?, propietario_id = ? WHERE alojamiento_id = ?',
      [nombre_alojamiento, ubicacion_alojamiento, precio_alojamiento, propietario_id, alojamientoID]
    );
    res.json({ mensaje: 'Alojamiento actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el alojamiento' });
  }
};

export const eliminarAlojamiento = async (req, res) => {
  const alojamientoID = req.params.id;
  try {
    await pool.query('DELETE FROM alojamientos WHERE alojamiento_id = ?', [alojamientoID]);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el alojamiento' });
  }
};
