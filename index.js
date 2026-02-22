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

app.get('/api/students', (req, res) => {
    res.send(students);
})

app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado.');
    else res.send(student);
})

app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };
students.push(student);
res.send(student);
});

app.delete('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado.');
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`)); 