import Task from '../models/task.model.js';

export const saveTask = async(req, res) => {
    try {
        const { taskName } = req.body;


        const nuevaTarea = new Task({ taskName });


        const tareaGuardada = await nuevaTarea.save();


        res.status(201).json(tareaGuardada);
    } catch (error) {
        console.error('Error al guardar la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor al guardar la tarea' });
    }
};