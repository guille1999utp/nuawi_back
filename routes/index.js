const route = require('express').Router();
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const { getAllTasks, createTask, updateTask, deleteTask } = require('./../src/controllers/taskController');
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
route.get('/task',getAllTasks);

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
 *               id: "3"
 *               title: "Nueva tarea"
 *               status: "pendiente"
 *       400:
 *         description: Título requerido
 *         content:
 *           application/json:
 *             example:
 *               error: "El título es requerido."
 */
route.post('/task', createTask);

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
 *               id: "3"
 *               title: "Tarea actualizada"
 *               status: "hecho"
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             example:
 *               error: "Tarea no encontrada."
 */
route.put('/task/:id',updateTask);

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
route.delete('/task/:id', deleteTask);

module.exports = route;