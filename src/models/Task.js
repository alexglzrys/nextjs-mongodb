const { Schema } = require("mongoose");

// Esquema o estructura del Documento referente a una Tarea
const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es requerido'],
        unique: true,
        trim: true,
        maxlength: [40, 'El título debe ser menor a 40 caracteres']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'La descripción debe ser menor a 200 caracteres']
    }
}, {
    timestamps: true,   // agrega campos de auditoria
    versionKey: false   // elimina el campo _v agregado por defecto en MongoDb
});

export default model('Task', taskSchema);