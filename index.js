// inicio API USERs
const express = require('express');
const sql = require('mssql');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configuración BD SQLS

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    instanceName: process.env.DB_INSTANCE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Conexión
sql.connect(dbConfig)
    .then(() => console.log("Conectado a SQL Server"))
    .catch(err => console.error("Error de conexión:", err));

app.get('/', (req, res) => {
    res.send('User API');
})

// GET users
app.get('/api/students', async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM Users");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
});

// GET /users/:cedula
app.get('/api/findStudents/:cedula', async (req, res) => {
    const { cedula } = req.params;

    try {
        const result = await sql.query`
            SELECT * FROM Users WHERE cc = ${cedula}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(result.recordset[0]);

    } catch (error) {
        res.status(500).json({ message: "Error al buscar usuario" });
    }
});


// POST /users
app.post('/api/createStudents', async (req, res) => {
    const { cedula, name, email } = req.body;

    if (!cedula || !name || !email) {
        return res.status(400).json({ message: "Cedula, name y email son requeridos" });
    }

    try {
        await sql.query`
            INSERT INTO Users (cc, name, email)
            VALUES (${cedula}, ${name}, ${email})
        `;

        res.status(201).json({ message: "Usuario creado correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario", error: error.message });
    }
});

// DELETE /users/:cedula -> Eliminar usuario
app.delete('/api/deleteStudents/:cedula', async (req, res) => {
    const { cedula } = req.params;

    try {
        const result = await sql.query`
            DELETE FROM Users WHERE cc = ${cedula}
        `;

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`)); 