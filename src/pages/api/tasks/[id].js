import Task from "@/models/Task";
import { dbConnect } from "@/utils/mongoose";

const TaskHandler = async(req, res) => {
    // Obtener: método HTTP, cuerpo de la petición, y parámetro enviado en la ruta
    const {method, body, query: {id}} = req;

    // Conectar a base de datis
    dbConnect();

    switch(method) {
        case 'GET':
            try {
                // Localizar una tarea por su ID en la base de datos
                const task = await Task.findById(id);
                if (!task) return res.status(404).json({message: 'Tarea no localizada', error: true})
                
                return res.status(200).json(task);
            } catch (error) {
                return res.status(500).json({message: error.message, error: true})
            }
        case 'DELETE':
            try {
                // Localizar una tarea por su ID y proceder a eliminarla si existe
                const deleted_task = await Task.findByIdAndDelete(id);
                if (!deleted_task) return res.status(404).json({message: 'Tarea no localizada', error: true})
                
                return res.status(204).json()
            } catch (error) {
                return res.status(500).json({message: error.message, error: true})
            }
        default:
            return res.status(500).json({message: 'Método HTTP no soportado', error: true})
    }
}

export default TaskHandler;