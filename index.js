const express = require ('express');
const {dbConnection} = require ('./database/config.js');
const cors = require('cors')
require('dotenv').config();

//Create express SERVER
const app = express();

//BBDD Connection
dbConnection();

//Config CORS
app.use(cors());


//Routes
app.get('/', (req,resp) => {
    resp.json({
        "ok":true,
        "msg":'Se ha obtenido respuesta'
    })
})

//Start SERVER in PORT
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el PUERTO =` + process.env.PORT);
})