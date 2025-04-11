import mysql from 'mysql2/promise'; // Usamos la versión Promise-based

// Configuración desde variables de entorno
const dbConfig = {
  host: process.env.DB_HOST || 'db', // 'db' = nombre del servicio en docker-compose
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'app_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para verificar la conexión
export async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    console.error('Error de conexión a MySQL:', error.message);
    return false;
  }
}

export default pool;