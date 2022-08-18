require('dotenv').config();

const express = require('express');
const cors = require('cors');


const { dbConnection } = require('./db/config');

// create express server
const app = express();

// Configurar CORS
app.use(cors());

//Base de datos
dbConnection();

console.log(process.env);

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
})

app.listen( process.env.PORT, () => {
    console.log('Server running in port ' + process.env.PORT)
})