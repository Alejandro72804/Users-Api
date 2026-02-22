const express = require('express');
const app = express();

app.use(express.json());

const students = [
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Bob', age: 22 },
    { id: 3, name: 'Charlie', age: 21 },
]

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