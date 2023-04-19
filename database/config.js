const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la BBDD");
  } catch (error) {
    console.warn(error);
    throw new Error("Error al levantar la BBDD, revisar los logs");
  }
};

module.exports = {
  dbConnection,
};
