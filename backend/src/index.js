import express from 'express';
import pool from './config/db.js';

const app = express();
const PORT = 5000;

app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
