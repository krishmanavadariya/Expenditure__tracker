const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Data
let tasks = [];

// ✅ MUST BE HERE (GLOBAL)
let nextId = 1;

// GET
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST
app.post('/tasks', (req, res) => {

    const newTask = {
        id: nextId++,   // ✅ works now
        name: req.body.name
    };

    tasks.push(newTask);

    res.json(tasks);
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].name = req.body.name;
        }
    }
    res.json(tasks);
});

// DELETE
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    tasks = tasks.filter(t => t.id !== id);

    res.json(tasks);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});