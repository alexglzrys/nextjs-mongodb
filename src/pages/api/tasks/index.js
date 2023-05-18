import Task from "@/models/Task";
import { dbConnect } from "@/utils/mongoose";

// Controlador de peticiones HTTP para el recurso de tareas
const TaskHandler = async(req, res) => {
    // Recuperar el método HTTP de la petición y el cuerpo de la petición
    const {method, body} = req;

    // Conectar con base de datos
    dbConnect();
    
    switch(method) {
        case 'GET':
            try {
                // Consultar todas las tareas registradas en la colección tasks
                const tasks = await Task.find();
                // Devolver el listado de tareas como respuesta al cliente
                return res.status(200).json(tasks);
            } catch (error) {
                return res.status(500).json(error.message)
            }
        case 'POST':
            try {
                // Registrar nueva tarea, con base al cuerpo de la petición
                const new_task = await Task.create(body);
                return res.status(201).json(new_task)
            } catch (error) {
                return res.status(500).json(error.message)
            }
        default:
            return res.status(400).json({message: 'Método HTTP no soportado', error: true })
    }
    
}

export default TaskHandler;