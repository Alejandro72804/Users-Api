# Users API – Prueba Técnica Desarrollador Junior

## 📌 Descripción

API REST desarrollada en Node.js y Express que permite la gestión básica de usuarios.

Funcionalidades principales:

1. Crear usuarios
2. Listar usuarios
3. Buscar usuario por cédula
4. Eliminar usuario

La información se almacena en SQL Server.

## 🛠 Tecnologías Utilizadas

1. Node.js
2. Express
3. SQL Server
4. mssql
5. dotenv
6. Thunder Client (para pruebas de endpoints)

## ⚙️ Instalación

### 1️⃣ Clonar el repositorio
```bash
  git clone https://github.com/Alejandro72804/Users-Api
  cd users-api
```

### 2️⃣ Instalar dependencias
```bash
  npm install
```

### 3️⃣ Configurar variables de entorno

En el repositorio se incluye un archivo .env.example como plantilla.

* Copiar el archivo "**.env.example**" y renombrarlo a: "**.env**"
* Configurar las variables del archivo "**.env**" con los valores correspondientes a su entorno local de SQL Server:
```env
  PORT=3000

  DB_USER=your_user
  DB_PASSWORD=your_password
  DB_SERVER=localhost
  DB_DATABASE=BDStudent
  DB_INSTANCE=name_instancia
```

## 🗄 Configuración de Base de Datos

Ejecutar el siguiente script en SQL Server:
```sql
  CREATE DATABASE BDStudent;
  GO
    
  USE BDStudent;
    
  CREATE TABLE Users (
    cc VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT GETDATE()
  );
```

⚠️ Verificar en SQL Server Configuration Manager que el protocolo TCP/IP esté habilitado en la instancia utilizada.

## 🚀 Ejecución del Proyecto
```bash
  npm start
```
## 📡 Endpoints Disponibles

### 1️⃣ Crear usuario

* POST /api/students

* Body:
```json
{
  "cedula": "1064001234",
  "name": "Juan Sebastian",
  "email": "juan.sebastian@test.com"
}
```

### 2️⃣ Listar usuarios

* GET /api/students

> [!NOTE]
> **_EndPoints Extras_**

### 3️⃣ Buscar usuario por cédula

* GET /api/students/{cedula}

### 4️⃣ Eliminar usuario

* DELETE /api/students/{cedula}

