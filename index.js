const express = require("express");
const { dbConnection } = require("./database/config.js");
const cors = require("cors");
require("dotenv").config();

//Create express SERVER
const app = express();

//BBDD Connection
dbConnection();

//Config CORS
app.use(cors());

//Arrancar APP de Prueba para Google 'index.html'
app.use(express.static('public'))
// LECTURA PARSEO Body
app.use(express.json())

//Routes
app.use("/api/users", require('./routes/users.routes'));
app.use("/api/hospitals", require('./routes/hospitals.routes'));
app.use("/api/medicians", require('./routes/medicians.routes'));
app.use("/api/login", require('./routes/auth.routes'));
app.use("/api/browser", require('./routes/browser.routes'));
app.use("/api/uploads", require('./routes/uploads.routes'));


//Start SERVER in PORT
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el PUERTO =` + process.env.PORT);
});
