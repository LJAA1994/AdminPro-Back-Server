// Para ayudar al tipado de la 'resp' en las funciones
const { response } = require("express");
const { request } = require("express");

const Medicians = require("../models/medician.model");

const getMedicians = async (req = request, resp = response) => {
  try {
    const medicians = await Medicians.find().populate('user hospital','name');
    resp.json({
      ok: true,
      medicians,
      msg: "Se han obtenido los medicos",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Error en el servidor, ver <logs>",
    });
  }
};
const postMedicians = async (req = request, resp = response) => {
  const userId = req.userId;
  try {
      const newMedician = new Medicians({ user: userId, ...req.body });
      const medician = await newMedician.save();
      resp.json({
        ok: true,
        medician,
        msg: "Medico Creado",
      });

  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Error en el servidor, ver <logs>",
    });
  }
};
const updateMedicians = (req = request, resp = response) => {
  resp.json({
    ok: true,
    msg: "Medico actualizado",
  });
};
const deleteMedicians = (req = request, resp = response) => {
  resp.json({
    ok: true,
    msg: "Medico borrado",
  });
};

module.exports = {
  getMedicians,
  postMedicians,
  updateMedicians,
  deleteMedicians,
};
