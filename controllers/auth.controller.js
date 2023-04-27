const { response } = require("express");
const { request } = require("express");
//Bcrypt hashear password una sola via
const bcrypt = require("bcryptjs");
//Modelos MongoDB
const User = require("../models/users.model");
//Helper JWT
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const loginGoogle = async (req = request, resp = response) => {
  console.log(req.body.token);
  try {
    const googleUser = await googleVerify(req.body.token);
    const { email, name, picture } = googleUser;
    const existUser = await User.findOne({ email });
    let newUser;
    if (!existUser) {
      newUser = new User({
        name,
        email,
        password: "@@@", //Es obligatorio y la inventamos para que se pueda guardar el usuario
        image: picture,
        google: true,
      });
    } else {
      newUser = existUser;
      newUser.google = true;
    }
    //Guardar Usuario
    await newUser.save();

    //Generar Token despues de Login con Google
    const token = await generateJWT(newUser);

    resp.json({
      ok: true,
      googleUser,
      token,
      msg: "Usuario logueado con Google",
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: "Error, token de google incorrecto",
    });
  }
};

const renewToken = async (req = request, resp = response) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  const token = await generateJWT(user);
  resp.json({
    ok: true,
    token,
    msg: "Token renovado correctamente",
  });
};

module.exports = {
  login,
  loginGoogle,
  renewToken,
};
