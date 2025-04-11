#!/bin/bash

echo "⏳ Esperando a que MySQL esté disponible..."

until node -e "
  (async () => {
    const { checkConnection } = await import('./src/config/db.js');
    const ok = await checkConnection();
    if (!ok) {
      console.log('❌ MySQL no está listo.');
      process.exit(1);
    }
    process.exit(0);
  })().catch(err => {
    console.error('❗ Error esperando MySQL:', err);
    process.exit(1);
  });
"; do
  echo "🔄 Reintentando conexión a MySQL...";
  sleep 2;
done

echo "✅ MySQL listo!"
exec npm start
