const express = require('express');
const morgan = require('morgan');
const path = require('path');
const indexRoutes = require('./routes/index.routes')

const { mongoose } = require('./database');

const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


//configuracion
app.set('port', process.env.PORT || 5000);

//middlewares funciones antes de llegar a las rutas json habilita a la pagina a recibir arhivos json
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extented: false }));
//rutas aqui se colocan las rutas de la pagina web
app.use('/', indexRoutes);


//static files archivos que van en la carpeta public html css javascript que son la pagina inicial de la pagina web
//path.join(__dirname, 'public') selecciona la ruta de la carpeta actual y le agrega la ruta public  que es donde esta el archivo html que se mostrara

app.use(express.static(path.join(__dirname, 'public')));

//iniciando el servidor

app.listen(app.get('port'), () => {
    console.log(`inicializado en puerto ${app.get('port')}`)
});