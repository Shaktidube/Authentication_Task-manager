const User = require("../models/User")
const Task = require("../models/TaskModel");

exports.getUser = async (req,res) =>{
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId,"-password");

    } catch (error) {
        console.log(error.message);
    }
    if(!user){
        return res.status(400).json({message:"USer not Found"})
    }
   
    return res.status(200).json({message:user})
}

// Create a Task
const createTask = async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  // Get all Tasks
  const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  // Get a single Task
  const getTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json(`NO task with id: ${id}`);
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  // Delete Task
  const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).json(`NO task with id: ${id}`);
      }
  
      res.status(200).send("Task deleted");
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  // Update a Task
  const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!task) {
        return res.status(404).json(`NO task with id: ${id}`);
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask,
  };