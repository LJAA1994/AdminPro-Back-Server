const { response } = require("express");
const { request } = require("express");
//Bcrypt hashear password una sola via
const bcrypt = require("bcryptjs");
//Modelos MongoDB
const User = require("../models/users.model");
//Helper JWT
const { generateJWT } = require("../helpers/jwt");

login = async (req = request, resp = response) => {
  const { password, email } = req.body;
  try {
    const existUser = await User.findOne({ email });
    //Verificar EMAIL
    if (!existUser) {
      return resp.status(404).json({
        ok: false,
        msg: "Contraseña o email no válido",
      });
    }
    //Verificar PASSWORD
    const validPassword = bcrypt.compareSync(password, existUser.password);
    if (!validPassword) {
      console.log("Is Valid PASS", password);
      console.log("Is Valid PASS", existUser.password);
      return resp.status(400).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }
    //Generar Token JWT
    const token = await generateJWT(existUser);
    resp.json({
      ok: true,
      token: token,
      msg: "Exito Login",
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      error: error,
      msg: "Error inesperado, revisar <logs>",
    });
  }
};

module.exports = {
  login,
};
