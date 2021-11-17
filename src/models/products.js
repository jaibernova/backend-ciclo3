const mongoose = require('mongoose');
const { Schema } = mongoose;

//ESQUEMA DE BASE DE DATOS PRODUCTOS
const TaskSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    marca: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    precio: { type: Number, required: true },
    status: { type: String, required: true },
});

//EXPORTACION DEL MODULO

module.exports = mongoose.model('Task', TaskSchema);