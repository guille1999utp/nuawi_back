const Task = require('./../models/task');

getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

createTask = async (req, res) => {
    try {
        const { title, status } = req.body;
        const newTask = await Task.create({ title, status });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la tarea.' });
    }
};

updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la tarea.' });
    }
};

deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }

        res.status(200).json({ message: 'Tarea eliminada con éxito.' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar la tarea.' });
    }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };