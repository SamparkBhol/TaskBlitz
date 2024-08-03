const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { authorizeRole } = require('../controllers/authController');

router.post('/', authorizeRole(['user', 'admin']), createTask);
router.get('/', authorizeRole(['user', 'admin']), getTasks);
router.put('/:id', authorizeRole(['user', 'admin']), updateTask);
router.delete('/:id', authorizeRole(['user', 'admin']), deleteTask);

module.exports = router;
