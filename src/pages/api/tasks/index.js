import Task from "@/models/Task";
import { dbConnect } from "@/utils/mongoose";

// Controlador de peticiones HTTP para el recurso de tareas
const TaskHandler = async(req, res) => {
    // Conectar con base de datos
    dbConnect();
    
    switch(req.method) {
        case 'GET':
            // Consultar todas las tareas registradas en la colección tasks
            const tasks = await Task.find();
            // Devolver el listado de tareas como respuesta al cliente
            return res.status(200).json(tasks);
        default:
            return res.status(400).json({message: 'Método HTTP no soportado', error: true })
    }
    
}

export default TaskHandler;