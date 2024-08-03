const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
    const task = new Task({ ...req.body, createdBy: req.user.userId });
    await task.save();
    res.status(201).send(task);
};

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user.userId });
    res.json(tasks);
};

exports.updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
};
