// Para ayudar al tipado de la 'resp' en las funciones
const { response } = require("express");
const { request } = require("express");
//Bcrypt hashear password una sola via
const bcrypt = require("bcryptjs");
//Modelos MongoDB
const User = require("../models/users.model");
//Helper JWT
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req = request, resp = response) => {
  //PAGINADO  query.param se rescata de la URI
  const from = Number(req.query.from) || 0; 
 
//Asincrono y puede que no se de al mismo tiempo
  // const users = await User.find({}, "name email").skip(from).limit(5)
  // const total =  await User.count();
  //Usamos PROMISES ALL para que los resultados lleguen al mismo tiempo
  const [users, total] = await Promise.all([
    User.find({}, "name email").skip(from).limit(5),
    User.count()
  ])
  //PAGINADO
  resp.json({
    ok: true,
    users: users,
    total,
    msg: "Se han obtenido todos los usuarios",
  });
};

const postUser = async (req, resp = response) => {
  const { email, name, password } = req.body;
  try {
    const existEmail = await User.findOne({email});
    console.log("Check Email", existEmail);
    if (existEmail) {
      return resp.status(400).json({
        ok: false,
        msg: "El email introducido ya esta registrado",
      });
    }
    const newUser = new User(req.body);
    //Encriptado de Password
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);
    //Encriptado de Password END
    await newUser.save();
    const token = await generateJWT(newUser);
    resp.json({
      ok: true,
      token: token,
      user: newUser,
      msg: "Usuario creado",
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      error: error,
      msg: "Error inesperado, revisar <logs>",
    });
  }
};

const updateUsers = async (req, resp = response) => {
  const userId = req.params.id;
  const existUser = await User.findOne({ _id: userId });
  if (!existUser) {
    return resp.status(404).json({
      ok: false,
      msg: "El usuario no existe con ese ID",
    });
  }

  try {
    //Actualizar Usuario
    const updateFields = req.body;
    delete updateFields.password;
    delete updateFields.google;
    if (updateFields.email === existUser.email) {
      delete updateFields.email;
    } else {
      //Comprobar si cambia a un email existente
      const existEmail = await User.findOne({ email: updateFields.email });
      console.log("Check Email", existEmail);
      if (existEmail) {
        return resp.status(400).json({
          ok: false,
          msg: "El email introducido ya esta registrado",
        });
      }
    }

    const updateUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    }); //Envia el nuevo usuario actualizado
    resp.status(202).json({
      ok: true,
      user: updateUser,
      msg: "Usuario Actualizado",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      error: error,
      msg: "Error inesperado, revisar <logs>",
    });
  }
};

const deleteUsers = async (req = request, resp = response) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  try {
    if (!user) {
      return resp.status(404).json({
        ok: false,
        msg: "El usuario no existe con ese ID",
      });
    }

    const deleteUser = await User.findByIdAndDelete({ _id: userId });
    return resp.json({
      ok: true,
      users: deleteUser,
      msg: "Se ha eliminado el usuario seleccionado",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      error: error,
      msg: "Error inesperado, revisar <logs>",
    });
  }
};

module.exports = {
  getUsers,
  postUser,
  updateUsers,
  deleteUsers,
};
