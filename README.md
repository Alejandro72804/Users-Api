# Users API – Prueba Técnica: Desarrollador Junior

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
7. Winston (logging)

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
 
> [!WARNING]
> Verificar en SQL Server Configuration Manager que el protocolo TCP/IP esté habilitado en la instancia utilizada.


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
  "cedula": "",
  "name": "",
  "email": ""
}
```
* Test:<img width="1204" height="339" alt="{A52F198C-E400-4303-8998-9AD50E60C0B7}" src="https://github.com/user-attachments/assets/1e2841c0-19f5-436c-ba82-730be0b4c5b7" />
  
### 2️⃣ Listar usuarios

* GET /api/students
* Test:<img width="1260" height="491" alt="{2706DC3B-A7C9-46B9-AA2F-D0371A160E38}" src="https://github.com/user-attachments/assets/c0f2e533-af07-443c-b367-1fae6fbb0e6c" />
  
>
> [!NOTE]
> ## **_EndPoints Extras_**
>
 
### 3️⃣ Buscar usuario por cédula

* GET /api/students/{cedula}
* Test:<img width="1229" height="281" alt="{E28DD249-0777-431B-877F-718814527116}" src="https://github.com/user-attachments/assets/222759b8-58c7-40f1-994b-4b85a79afb3c" />


### 4️⃣ Eliminar usuario

* DELETE /api/students/{cedula}
* Test: <img width="1223" height="233" alt="{85E9C5A3-2523-4E57-AEFD-9E64D1B71349}" src="https://github.com/user-attachments/assets/e26a3082-1f70-4fbe-bd53-c85c338d6c41" />

## 📄 Logging
La API implementa control de errores con distintos niveles de logging:
 1. info → eventos informativos (inicio del servidor, conexión a BD, consultas correctas)
 2. warn → intentos inválidos o mal sintaxis.
 3. error → errores internos del servidor.
 
Los errores son registrados utilizando Winston en:
 * Consola (entorno de desarrollo)
 * Archivo logs/error.log
 * Archivo logs/combined.log
 
Test. Mapeo y flujo de errores de la API:
 
<img width="887" height="499" alt="{A1C64A5B-2C03-4D39-AEC4-9BAA982FA8FC}" src="https://github.com/user-attachments/assets/005cb0c5-687d-4524-b931-d4b31e9c98f7" />


# 📌 Autor

## **_Luis Alejandro Mestra Bernal_**

