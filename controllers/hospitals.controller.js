// Para ayudar al tipado de la 'resp' en las funciones
const { response } = require("express");
const { request } = require("express");
//Model
const Hospital = require("../models/hospital.model");

const getHospitals = async (req = request, resp = response) => {
  try {
    const hospitals = await Hospital.find().populate("user", "name role");
    resp.json({
      ok: true,
      hospitals,
      msg: "Se han obtenido los hospitales",
    });
  } catch (error) {
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
    user: userId,
    ...req.body,
  });

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
const updateHospitals = async (req = request, resp = response) => {
  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      resp.status(404).json({
        ok: false,
        msg: "No existe un hospital con ese ID",
      });
    }
    const hospitalChanges = { ...req.body, user: req.userId };
    const updateHospital = await Hospital.findByIdAndUpdate(
      id,
      hospitalChanges,
      { new: true }
    );

    resp.json({
      ok: true,
      updateHospital,
      msg: "Hospital Actualizado",
    });
  } catch (error) {
    resp.json({
      ok: false,
      msg: "Ha habido un error al actualizar el hospital",
    });
  }
};
const deleteHospitals = async (req = request, resp = response) => {
  const id = req.params.id;
  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      resp.status(404).json({
        ok: false,
        msg: "No existe un hospital con ese ID",
      });
    }
    const deleteHospital = await Hospital.findByIdAndDelete(id);

    resp.json({
      ok: true,
      deleteHospital,
      msg: "Hospital Eliminado",
    });
  } catch (error) {
    resp.json({
      ok: false,
      msg: "Ha habido un error al eliminar el hospital",
    });
  }
};

module.exports = {
  getHospitals,
  postHospitals,
  updateHospitals,
  deleteHospitals,
};
