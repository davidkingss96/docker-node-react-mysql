
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

## Uso de Prisma

Este proyecto utiliza Prisma ORM para interactuar con la base de datos MySQL. Prisma facilita la administración de modelos y migraciones en la base de datos.

### 1. Instalación de dependencias de Prisma

Primero, asegúrate de haber instalado las dependencias de Prisma en el backend del proyecto:

```bash
npm install @prisma/client
npm install prisma --save-dev
```

### 2. Configuración de Prisma

Prisma requiere un archivo de configuración prisma/schema.prisma, donde definimos el modelo de la base de datos. Este archivo ya está configurado en el proyecto, pero si necesitas realizar algún cambio, sigue estos pasos:

- En el archivo prisma/schema.prisma, puedes definir los modelos (por ejemplo, User, Product, etc.).
- Asegúrate de que la URL de la base de datos esté configurada correctamente en el archivo prisma/.env, en la variable DATABASE_URL.

Ejemplo de archivo .env:

```bash
DATABASE_URL="mysql://root:password@localhost:3306/mi_base_de_datos"
```

### 3. Generar las migraciones

Cuando hagas cambios en el modelo de Prisma (por ejemplo, agregar un nuevo modelo o campo), debes crear una migración. Para ello, sigue estos pasos:

- Crea la migración con el siguiente comando:

```bash
npx prisma migrate dev --name nombre_de_migracion
```
Esto creará una nueva migración y actualizará tu base de datos.

### 4. Aplicar las migraciones a la base de datos

Una vez que hayas creado las migraciones, puedes aplicarlas a tu base de datos. Para ello, usa:

```bash
npx prisma migrate deploy
```
Este comando aplicará todas las migraciones pendientes a la base de datos.

### 5. Generar el cliente Prisma

Después de crear o modificar migraciones, también debes regenerar el cliente Prisma. Esto es necesario para que los cambios de los modelos se reflejen en el cliente utilizado en el código:

```bash
npx prisma generate
```

### 6. Verificar la base de datos con Prisma Studio (opcional)

Para explorar la base de datos de manera visual y sencilla, puedes usar Prisma Studio:

```bash
npx prisma studio
```
Esto abrirá una interfaz gráfica en tu navegador para interactuar con los datos de tu base de datos.


### Resumen de Comandos
- Crear una migración: npx prisma migrate dev --name nombre_de_migracion
- Aplicar migraciones: npx prisma migrate deploy
- Generar el cliente Prisma: npx prisma generate
- Verificar la base de datos con Prisma Studio: npx prisma studio

Notas adicionales:
Manejo de errores: Si encuentras problemas al aplicar migraciones, puedes revisar los registros generados por Prisma para obtener detalles.

Sincronización automática: Prisma tiene un enfoque de migración que te permite gestionar de manera eficiente las alteraciones en la estructura de la base de datos a lo largo del tiempo.
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

