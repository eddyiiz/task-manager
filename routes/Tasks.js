const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

//gettin all
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//creating a task
router.post("/", async (req, res) => {
  const task = new Task({
    text: re.body.text,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//deleting a task
router.delete("/:id", getTask, async (req, res) => {
  try {
    res.task.remove();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//middleware
const getTask = async (req, res, next) => {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: "task not found!" });
    }
  } catch (error) {
    return res.status(500).json({ mesage: error.mesage });
  }
  res.task = task;

  next();
};

module.exports = router;