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
    if (!title || !description || !status || !due_date) {
        return res.status(400).send({
            status: false,
            message: 'All the fields are mandatory',

        })
    }
    const dueDate = new Date(due_date)
    if (dueDate <= new Date()) {
        return res.status(400).send({
            status: false,
            error: 'Due date must be in the future'
        });
    }

    if (!["pending","in-progress","completed"]?.includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status value'
        });
    }

    try {
        const [day, month, year] = due_date.split('-').map(Number);
        const newTask = new Task({
            title,
            description,
            status: status || 'pending',
            due_date: new Date(year, month - 1, day)
        });
        await newTask.save();
        res.status(201).send({ task: newTask });
    } catch (error) {
        res.status(500).send({ error: 'Failed to create task' });
    }
});



router.get('/tasks', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const totalTasks = await Task.countDocuments();
        const totalPages = Math.ceil(totalTasks / limit);
        const offset = (page - 1) * limit;
        const tasks = await Task.find()
            .skip(offset)
            .limit(limit);
        res.json({
            tasks,
            totalPages,
            currentPage: page,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

router.get('/search/:taskId', async (req, res) => {
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
