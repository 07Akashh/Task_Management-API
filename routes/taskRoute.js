const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');




function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}




router.post('/add', async (req, res) => {
    const { title, description, status, due_date } = req.body;

    try {
        const [day, month, year] = due_date.split('-').map(Number);
        const newTask = new Task({
            title,
            description,
            status: status || 'pending',
            due_date: new Date(year, month - 1, day)
        });
        await newTask.save();
        res.status(201).json({ task: newTask });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create task' });
    }
});



router.get('/tasks', async (req, res) => {
    console.log('32502309859028305982309523')
    try {
        const tasks = await Task.find();
        const formattedTasks = tasks.map(task => ({
            ...task.toObject(),
            due_date: task.due_date ? formatDate(task.due_date) : null
        }));
        res.json(formattedTasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

router.get('/task/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const formattedTask = {
            ...task.toObject(),
            due_date: task.due_date ? formatDate(task.due_date) : null
        };
        res.json({ task: formattedTask });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch task' });
    }
});

router.put('/update/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, { ...req.body, updated_at: Date.now() }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ task: updatedTask });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

router.delete('/remove/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: taskId });
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ result: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

module.exports = router;
