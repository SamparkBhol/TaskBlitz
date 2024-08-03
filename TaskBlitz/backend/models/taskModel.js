const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deadline: Date,
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

module.exports = mongoose.model('Task', taskSchema);
