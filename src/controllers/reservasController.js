import { pool } from '../database.js';

export const obtenerReservas = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM reservas');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener reservas' });
  }
};

export const obtenerReserva = async (req, res) => {
  const reservaID = req.params.id;
  try {
    const [results] = await pool.query('SELECT * FROM reservas WHERE reserva_id = ?', [reservaID]);
    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la reserva' });
  }
};

export const crearReserva = async (req, res) => {
  const { alojamiento_id, nombre_cliente_reserva, correo_electronico_cliente_reserva, fecha_inicio_reserva, fecha_finalizacion_reserva } = req.body;
  if (!alojamiento_id || !nombre_cliente_reserva || !correo_electronico_cliente_reserva || !fecha_inicio_reserva || !fecha_finalizacion_reserva) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios en la solicitud' });
  }

  try {
    await pool.query(
      'INSERT INTO reservas (alojamiento_id, nombre_cliente_reserva, correo_electronico_cliente_reserva, fecha_inicio_reserva, fecha_finalizacion_reserva) VALUES (?, ?, ?, ?, ?)',
      [alojamiento_id, nombre_cliente_reserva, correo_electronico_cliente_reserva, fecha_inicio_reserva, fecha_finalizacion_reserva]
    );
    res.json({ mensaje: 'Reserva creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la reserva' });
  }
};

export const actualizarReserva = async (req, res) => {
  const { alojamiento_id, nombre_cliente_reserva, correo_electronico_cliente_reserva, fecha_inicio_reserva, fecha_finalizacion_reserva } = req.body;
  const reservaID = req.params.id;
  try {
    await pool.query(
      'UPDATE reservas SET alojamiento_id = ?, nombre_cliente_reserva = ?, correo_electronico_cliente_reserva = ?, fecha_inicio_reserva = ?, fecha_finalizacion_reserva = ? WHERE reserva_id = ?',
      [alojamiento_id, nombre_cliente_reserva, correo_electronico_cliente_reserva, fecha_inicio_reserva, fecha_finalizacion_reserva, reservaID]
    );
    res.json({ mensaje: 'Reserva actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la reserva' });
  }
};

export const eliminarReserva = async (req, res) => {
  const reservaID = req.params.id;
  try {
    await pool.query('DELETE FROM reservas WHERE reserva_id = ?', [reservaID]);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la reserva' });
  }
};
