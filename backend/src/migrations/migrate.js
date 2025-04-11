import pool from './../config/db.js';

export async function runMigrations() {
  const connection = await pool.getConnection();
  
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Migración users aplicada correctamente');
    
    // Ejemplo de otra tabla:
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL
      )
    `);
    
  } catch (err) {
    console.error('❌ Error en migración:', err.message);
    throw err; // Propaga el error para manejarlo arriba
  } finally {
    connection.release();
  }
}