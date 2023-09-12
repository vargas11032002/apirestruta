import { pool } from '../database.js';



export const obtenerReserva = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM reservas WHERE  ReservaID = ?', [reservaID]);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener reserva' });
  }
};

export const obtenerReservas = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM reservas');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener reservas' });
  }
};


export const crearReserva = async (req, res) => {
  const { Nombre, Fecha, HabitacionID, ClienteID } = req.body;
  try {
    await pool.query(
      'INSERT INTO reservas (Nombre, Fecha, HabitacionID, ClienteID) VALUES (?, ?, ?, ?)',
      [Nombre, Fecha, HabitacionID, ClienteID]
    );
    res.json({ mensaje: 'Reserva creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la reserva' });
  }
};


export const actualizarReserva = (req, res) => {
  const { Nombre, Fecha, HabitacionID, ClienteID } = req.body;
  const reservaID = req.params.id;
  pool.query(
    'UPDATE reservas SET Nombre = ?, Fecha = ?, HabitacionID = ?, ClienteID = ? WHERE ReservaID = ?',
    [Nombre, Fecha, HabitacionID, ClienteID, reservaID],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar la reserva' });
      }
      if (result.affectedRows > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ mensaje: 'Reserva no encontrada' });
      }
    }
  );
};

export const eliminarReserva = (req, res) => {
  const reservaID = req.params.id;
  pool.query(
    'DELETE FROM reservas WHERE ReservaID = ?',
    [reservaID],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar la reserva' });
      }
      if (result.affectedRows > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ mensaje: 'Reserva no encontrada' });
      }
    }
  );
};
