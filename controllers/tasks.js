// controllers/tasks.js
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllTasks = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('taskManager_').collection('tasks').find().toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting all tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('taskManager_').collection('tasks').findOne({ _id: taskId });
    if (!result) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting single task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTask = async (req, res) => {
  try {
    const task = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
    };
    const response = await mongodb.getDb().db().collection('tasks').insertOne(task);
    if (response.acknowledged) {
      res.status(201).json(response.ops[0]);
    } else {
      res.status(500).json({ error: 'Some error occurred while creating the task.' });
    }
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = new ObjectId(req.params.id);
    const task = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
    };
    const response = await mongodb.getDb().db('taskManager_').collection('tasks').replaceOne({ _id: taskId }, task);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('taskManager_').collection('tasks').deleteOne({ _id: taskId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask
};
