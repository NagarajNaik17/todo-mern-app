const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create a new To-Do
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    try {
        const newTodo = new Todo({
            name,
            description,
        });
        await newTodo.save();
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all To-Dos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update To-Do as Done
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        todo.isDone = !todo.isDone;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a To-Do
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
