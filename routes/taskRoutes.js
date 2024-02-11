const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');

// router.get('/', taskController.getAllTasks);
// router.get('/:id', taskController.getSingleTask);
// router.post('/', taskController.createTask);
// router.put('/:id', taskController.updateTask);
// router.delete('/:id', taskController.deleteTask);


router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
