require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');

// create express server
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
// NOTA: debe esta antes de las rutas
app.use( express.json() );

//Base de datos
dbConnection();

// Rutas
app.use('/api/users', require('./routes/users'));

app.listen( process.env.PORT, () => {
    console.log('Server running in port ' + process.env.PORT)
})
