// inicio API USERs
const express = require('express');
const sql = require('mssql');
const logger = require('./logger');

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
    .then(() => logger.info("Conectado a SQL Server"))
    .catch(err => logger.error("Error de conexión:", err));

app.get('/', (req, res) => {
    res.send('User API');
})

// GET consultar todos los usuarios
app.get('/api/students', async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM Users");
        res.json(result.recordset);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
});

// GET consultar usuario por cedula
app.get('/api/students/:cedula', async (req, res) => {
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
        logger.error(error);
        res.status(500).json({ message: "Error al buscar usuario" });
    }
});


// POST crear usuairo
app.post('/api/students', async (req, res) => {
    const { cedula, name, email } = req.body;

    if (!cedula || !name || !email) {
        return res.status(400).json({ message: "Cedula, name y email son requeridos" });
    }

    if (!/^\d+$/.test(cedula) || cedula.length < 8 || cedula.length > 11) {
    return res.status(400).json({
        message: "La cédula debe contener entre 8 y 11 dígitos numéricos"
    });
}

    try {
        const ccexist = await sql.query`
            SELECT * FROM Users WHERE cc = ${cedula}
        `;

        if (ccexist.recordset.length > 0) {
            return res.status(400).json({ message: "La cédula ya se encuentra registrada" });
        }
        
        await sql.query`
            INSERT INTO Users (cc, name, email)
            VALUES (${cedula}, ${name}, ${email})
        `;

        res.status(201).json({ message: "Usuario creado correctamente" });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

// DELETE eliminar usuario por cedula
app.delete('/api/students/:cedula', async (req, res) => {
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
        logger.error(error);
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
});

const port = process.env.port;
app.listen(port, () => logger.info(`Escuchando en el puerto ${port}...`)); 