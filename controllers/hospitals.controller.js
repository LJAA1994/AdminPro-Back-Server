// Para ayudar al tipado de la 'resp' en las funciones
const { response } = require("express");
const { request } = require("express");
//Model
const Hospital = require("../models/hospital.model");

const getHospitals = async  (req = request, resp = response) => {
    try{
        const hospitals =await Hospital.find().populate('user','name role');
        resp.json({
          ok: true,
          hospitals,
          msg: "Se han obtenido los hospitales", 
        });
    }catch(error){
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: "Error en el servidor, ver <logs>",
          });
    }
   
};
const postHospitals = async (req = request, resp = response) => {
    //Este ID se mete en la req a traves de la funcion jwt Validator
    //Se puede reclamar en cualquier funcion que viene despues
    //En este caso 'postHospital'
    const userId = req.userId;
  const newHospital = new Hospital({
    user:userId,
    ...req.body});
  
  try {
const hospital = await newHospital.save();
    resp.json({
      ok: true,
      hospital,
      msg: "Hospital Creado",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Error en el servidor, ver <logs>",
    });
  }
};
const updateHospitals = (req = request, resp = response) => {
  resp.json({
    ok: true,
    msg: "Hospital Actualizado",
  });
};
const deleteHospitals = (req = request, resp = response) => {
  resp.json({
    ok: true,
    msg: "Hospital Borrado",
  });
};

module.exports = {
  getHospitals,
  postHospitals,
  updateHospitals,
  deleteHospitals,
};
