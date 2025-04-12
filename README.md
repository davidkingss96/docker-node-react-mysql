
# Proyecto con React, Express y MySQL en Docker

## 🚀 Instalación (Windows PowerShell)

### 1. Clonar el repositorio y entrar al proyecto

```bash
git clone https://github.com/davidkingss96/docker-node-react-mysql
cd docker-node-react-mysql
```

### 2. Crear el frontend con React + Vite desde contenedor NodeJS (sin instalar Node local)

```powershell
docker run --rm -it `
  -v ${PWD}/frontend:/app `
  -w /app `
  node:18 `
  npx create-vite@latest . -- --template react
```

> Luego selecciona las opciones:
> - `React`
> - `TypeScript` o la variante que prefieras

---

## 🧠 Bonus: Sincronización del backend con MySQL

Este proyecto incluye un pequeño script `wait-for-it.sh` que **espera a que la base de datos esté lista** antes de correr el servidor y aplicar migraciones automáticamente.

No más errores como `ECONNREFUSED`.

---

## 📦 Métodos de la API

Este proyecto incluye una API básica para gestionar usuarios y productos. A continuación, te detallo los métodos disponibles:

### Usuarios
- **GET** `/users` - Obtener todos los usuarios.
- **GET** `/users/{id}` - Obtener un usuario por su ID.
- **POST** `/users` - Crear un nuevo usuario.
- **PUT** `/users/{id}` - Actualizar un usuario existente.
- **DELETE** `/users/{id}` - Eliminar un usuario.

### Productos
- **GET** `/products` - Obtener todos los productos.
- **GET** `/products/{id}` - Obtener un producto por su ID.
- **POST** `/products` - Crear un nuevo producto.
- **PUT** `/products/{id}` - Actualizar un producto existente.
- **DELETE** `/products/{id}` - Eliminar un producto.

---

## 🧑‍💻 Postman Collection

Puedes importar esta colección para probar los endpoints directamente desde Postman. [Descargar colección Postman](./postman_collection.json).

---

## ⭐ Dale una estrella si te gustó el proyecto

Si te ha sido útil o te ha gustado este proyecto, ¡no dudes en darle una estrella! Gracias por tu apoyo.

