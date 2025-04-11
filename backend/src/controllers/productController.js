export const getAllProducts = (req, res) => {
    // Solo retornamos algo dummy por ahora
    res.json([
      { id: 1, name: 'Producto 1', price: 100 },
      { id: 2, name: 'Producto 2', price: 200 }
    ]);
  };
  