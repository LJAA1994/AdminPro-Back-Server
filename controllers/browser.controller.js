// Para ayudar al tipado de la 'resp' en las funciones
const { response } = require("express");
const { request } = require("express");
//Models
const Users = require("../models/users.model");
const Hospitals = require("../models/hospital.model");
const Medicians = require("../models/medician.model");

const getParamAll = async (req = request, resp = response) => {
  const param = req.params.finder;
  const regex = new RegExp(param, "i"); //Crea expresion regular insensible key

  const [users, hospitals, medicians] = await Promise.all([
    Users.find({ name: regex }),
    Hospitals.find({ name: regex }),
    Medicians.find({ name: regex }),
  ]);
  console.log(param);
  resp.json({
    ok: true,
    users,
    hospitals,
    medicians,
    msg: "Se ha realizado la busqueda",
  });
};

const getParamCollection = async (req = request, resp = response) => {
  const param = req.params.finder;
  const table = req.params.table;
  const regex = new RegExp(param, "i"); //Crea expresion regular insensible key

  let results = []
  switch( table) {
case 'users':
    data = await Users.find({ name: regex });
break;
case 'hospitals':
    data = await Hospitals.find({ name: regex }).populate('user', ' name id');
break;
case 'medicians':
    data = await Medicians.find({ name: regex }).populate('user', ' name id').populate('hospital', 'name id');
break
default:
   return resp.status(400).json({
        ok: false,
        msg: "La coleccion debe ser medicians/hospitals/users",
      });  }

      resp.json({
        ok: true,
        data,
        msg: "Se ha realizado la busqueda de USUARIOS",
      });
};



module.exports = {
  getParamAll,
  getParamCollection,
  
};
