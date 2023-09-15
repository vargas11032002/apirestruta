import express from 'express';
import alojamientosRoutes from './routes/alojamientosRoutes.js';
import reservasRoutes from './routes/reservasRoutes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use('/api/alojamientos', alojamientosRoutes);
app.use('/api/reservas', reservasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
