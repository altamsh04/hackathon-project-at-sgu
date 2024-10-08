import express from 'express';
import Task from "../db/tasks.js";
import Project from '../db/project.js';
const router = express.Router();

router.post('/tasks', async (req, res) => {
  try {
    const { project_id, userid, title, description } = req.body;

    if (!project_id || !userid || !title || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newTask = new Task({ project_id, userid, title, description });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found.' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;
