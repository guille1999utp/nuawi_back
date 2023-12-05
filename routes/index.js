const route = require('express').Router();
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operaciones relacionadas con las tareas
 */

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 title: "Tarea 1"
 *                 status: "pendiente"
 *               - id: "2"
 *                 title: "Tarea 2"
 *                 status: "completada"
 */
route.get('/task', async (req, res) => {
    const bdPath = __dirname +'./../bd/task.json';
    const data = await fs.readFile(bdPath, 'utf8');

    const jsonData = JSON.parse(data);

    const tasks = jsonData.task;

    res.status(200).json(tasks);
});

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Agregar una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Nueva tarea"
 *     responses:
 *       200:
 *         description: Tarea agregada con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: "Tarea agregada con éxito."
 *               task:
 *                 id: "3"
 *                 title: "Nueva tarea"
 *                 status: "pendiente"
 *       400:
 *         description: Título requerido
 *         content:
 *           application/json:
 *             example:
 *               error: "El título es requerido."
 */
route.post('/task', async(req, res) => {
    try {
        const { title } = req.body;
    
        if (!title) {
          return res.status(400).json({ error: 'El título es requerido.' });
        }
    
        const bdPath = __dirname +'./../bd/task.json';
        const data = await fs.readFile(bdPath, 'utf8');
        const db = JSON.parse(data);
    
        const newTask = { title, status: 'pendiente',id:uuidv4() };
        db.task.push(newTask);
    
        await fs.writeFile(bdPath, JSON.stringify(db, null, 2), 'utf8');
    
        res.json({ message: 'Tarea agregada con éxito.', task: newTask });
      } catch (error) {
        console.error(`Error al agregar tarea: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor.' });
      }
});

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Tarea actualizada"
 *             status: "hecho"
 *     responses:
 *       200:
 *         description: Tarea actualizada con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: "Tarea actualizada con éxito."
 *               task:
 *                 id: "3"
 *                 title: "Tarea actualizada"
 *                 status: "hecho"
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             example:
 *               error: "Tarea no encontrada."
 */
route.put('/task/:id', async (req, res) => {
  try {

    const taskId = req.params.id;

    const { title, status } = req.body;

    const bdPath = __dirname +'./../bd/task.json';
    const data = await fs.readFile(bdPath, 'utf8');
    const db = JSON.parse(data);

    const existingTaskIndex = db.task.findIndex((task) => task.id === taskId);

    if (existingTaskIndex === -1) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    if (title !== undefined) {
      db.task[existingTaskIndex].title = title;
    }

    if (status !== undefined) {
      db.task[existingTaskIndex].status = status;
    }

    await fs.writeFile(bdPath, JSON.stringify(db, null, 2), 'utf8');

    res.json({ message: 'Tarea actualizada con éxito.', task: db.task[existingTaskIndex] });
  } catch (error) {
    console.error(`Error al actualizar tarea: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: "Tarea eliminada con éxito."
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             example:
 *               error: "Tarea no encontrada."
 */
route.delete('/task/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
  
      const bdPath = __dirname + '/../bd/task.json';
      const data = await fs.readFile(bdPath, 'utf8');
      const db = JSON.parse(data);
  
      const indexToRemove = db.task.findIndex(task => task.id === taskId);
      if (indexToRemove !== -1) {
        db.task.splice(indexToRemove, 1);
  
        await fs.writeFile(bdPath, JSON.stringify(db, null, 2), 'utf8');
  
        res.json({ message: 'Tarea eliminada con éxito.' });
      } else {
        res.status(404).json({ error: 'Tarea no encontrada.' });
      }
    } catch (error) {
      console.error(`Error al eliminar tarea: ${error.message}`);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });

module.exports = route;