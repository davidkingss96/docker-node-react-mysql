# Proyecto con React, Express y MySQL en Docker

## 🚀 Instalación (Windows PowerShell)

### 1. Clonar el repositorio y entrar al proyecto

```bash
git clone https://github.com/tu-usuario/tu-proyecto.git
cd tu-proyecto
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
