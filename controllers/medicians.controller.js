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
const updateMedicians = async(req = request, resp = response) => {
  const id = req.params.id;

  try {
    const medician = await Medicians.findById(id);
    if (!medician) {
      resp.status(404).json({
        ok: false,
        msg: "No existe un medico con ese ID",
      });
    }
    const medicianChanges = { ...req.body, user: req.userId };
    const updateMedician = await Medicians.findByIdAndUpdate(
      id,
      medicianChanges,
      { new: true }
    );

    resp.json({
      ok: true,
      updateMedician,
      msg: "Hospital Actualizado",
    });
  } catch (error) {
    resp.json({
      ok: false,
      msg: "Ha habido un error al actualizar el medico",
    });
  }
};
const deleteMedicians = async(req = request, resp = response) => {
  const id = req.params.id;
  try {
    const medician = await Medicians.findById(id);
    if (!medician) {
      resp.status(404).json({
        ok: false,
        msg: "No existe un medico con ese ID",
      });
    }
    const deleteMedician = await Medicians.findByIdAndDelete(id);

    resp.json({
      ok: true,
      deleteMedician,
      msg: "Medico Eliminado",
    });
  } catch (error) {
    resp.json({
      ok: false,
      msg: "Ha habido un error al eliminar el medico",
    });
  }
};

module.exports = {
  getMedicians,
  postMedicians,
  updateMedicians,
  deleteMedicians,
};
