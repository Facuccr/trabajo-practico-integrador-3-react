# Proyecto Gestor de Tareas - React + Node.js

## 1. Descripcion del proyecto

Aplicacion web que permite a un usuario registrarse, iniciar sesion y gestionar sus tareas personales.  
El sistema utiliza autenticacion mediante cookies, y permite crear, editar, eliminar y marcar tareas como completadas.

Incluye rutas privadas y publicas, validacion del lado del servidor y un diseño moderno con TailwindCSS.

---

## 2. Instalacion del proyecto

### Requisitos previos

- Node.js instalado
- Base de datos configurada (MariaDB o MySQL)
- Backend ejecutandose en `http://localhost:3000`
- Frontend ejecutandose en `http://localhost:5173`

### Pasos para instalar

### (backend)

- npm i / npm install
- configurar variables de entorno:
  DB_NAME=nombre_de_tu_bd
  DB_USER=root
  DB_PASSWORD=""
  DB_HOST=localhost
  DB_DIALECT=mysql
  DB_PORT=3306
  JWT_SECRET=jwt_secret
  PORT=3000
- realizar npm run dev

### frontend

- instalar dep: npm i / npm install
- levantar server: npm run dev
