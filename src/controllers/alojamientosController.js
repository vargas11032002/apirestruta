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
    const [results] = await pool.query('SELECT * FROM alojamientos WHERE AlojamientoID = ?', [alojamientoID]);
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
  const { Nombre, Ubicacion, Precio, PropietarioID } = req.body;
  try {
    await pool.query(
      'INSERT INTO alojamientos (Nombre, Ubicacion, Precio, PropietarioID) VALUES (?, ?, ?, ?)',
      [Nombre, Ubicacion, Precio, PropietarioID]
    );
    res.json({ mensaje: 'Alojamiento creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el alojamiento' });
  }
};

// Utiliza 'export' en lugar de 'exports'
export const actualizarAlojamiento = (req, res) => {
  const { Nombre, Ubicacion, Precio, PropietarioID } = req.body;
  const alojamientoID = req.params.id;
  pool.query(
    'UPDATE alojamientos SET Nombre = ?, Ubicacion = ?, Precio = ?, PropietarioID = ? WHERE AlojamientoID = ?',
    [Nombre, Ubicacion, Precio, PropietarioID, alojamientoID],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar el alojamiento' });
      }
      if (result.affectedRows > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ mensaje: 'Alojamiento no encontrado' });
      }
    }
  );
};

// Utiliza 'export' en lugar de 'exports'
export const eliminarAlojamiento = (req, res) => {
  const alojamientoID = req.params.id;
  pool.query(
    'DELETE FROM alojamientos WHERE AlojamientoID = ?',
    [alojamientoID],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar el alojamiento' });
      }
      if (result.affectedRows > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ mensaje: 'Alojamiento no encontrado' });
      }
    }
  );
};
