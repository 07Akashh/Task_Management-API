const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    due_date: Date,
},{timestamps:true});

module.exports = mongoose.model('Task', TaskSchema);
