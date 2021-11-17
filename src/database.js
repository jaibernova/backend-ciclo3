const mongoose = require('mongoose');

//URL A LA BASE DE DATOS
//const URI = 'mongodb+srv://jaiber:nintendo64@freecluster.2o9li.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const URL = 'mongodb+srv://root:ferremax2021@ferremax.miudj.mongodb.net/Ferremax?retryWrites=true&w=majority';

//MENSAJE DE CONEXION EXITOSA
mongoose.connect(URL)
    .then(db => console.log('base de datos esta conectada'))

    .catch(err => console.error(err));

module.exports = mongoose;

