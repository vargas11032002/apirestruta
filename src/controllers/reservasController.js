import { pool } from '../database.js';



export const obtenerReserva = async (req, res) => {
  const reservaID = req.params.id;
  try {
    const [results] = await pool.query('SELECT * FROM reservas WHERE  ReservaID = ?', [reservaID]);
    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Reservas  no encontrada' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener  Reserva' });
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
  const { NombreCliente, CorreoElectronicoCliente, FechaInicio, FechaFinalizacion, AlojamientoID } = req.body;
  try {
    await pool.query(
      'INSERT INTO Reservas (NombreCliente, CorreoElectronicoCliente, FechaInicio, FechaFinalizacion, AlojamientoID) VALUES (?, ?, ?, ?, ?)',
      [NombreCliente, CorreoElectronicoCliente, FechaInicio, FechaFinalizacion, AlojamientoID]
    );
    res.json({ mensaje: 'Reserva creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la reserva' });
  }
};


export const actualizarReserva = (req, res) => {
  const { NombreCliente, CorreoElectronicoCliente, FechaInicio, FechaFinalizacion, AlojamientoID } = req.body;
  const reservaID = req.params.id;
  
  pool.query(
    'UPDATE Reservas SET NombreCliente = ?, CorreoElectronicoCliente = ?, FechaInicio = ?, FechaFinalizacion = ?, AlojamientoID = ? WHERE ReservaID = ?',
    [NombreCliente, CorreoElectronicoCliente, FechaInicio, FechaFinalizacion, AlojamientoID, reservaID],
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
    'DELETE FROM Reservas WHERE ReservaID = ?',
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
