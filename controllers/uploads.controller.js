// Para ayudar al tipado de la 'resp' en las funciones
const { response } = require("express");
const { request } = require("express");
//UUID
const { v4: uuidv4 } = require("uuid");
//Path
const path = require("path");
//FileSystem
const fs = require("fs");
//Helper Actualizar Imagen
const { uploadImage } = require("./../helpers/update.image");
//Models
const Users = require("../models/users.model");
const Hospitals = require("../models/hospital.model");
const Medicians = require("../models/medician.model");

const postUploadFiles = async (req = request, resp = response) => {
  const type = req.params.type;
  const id = req.params.id;
  //Validar Types
  const validTypes = ["medicians", "useres", "hospitals"];
  if (!validTypes.includes(type)) {
    return resp.status(400).json({
      ok: false,
      msg: "El tipo de la coleccion no es correcto",
    });
  }
  //Validar si hay archivos
  if (!req.files || Object.keys(req.files).length === 0) {
    return resp.status(400).json({
      ok: false,
      msg: "No se ha cargado ningun archivo",
    });
  }
  //Procesar la imagen
  const file = req.files.image; //Obtenemos el File del Middleware UploadFiles
  const cutFileName = file.name.split(".");
  const fileType = cutFileName[cutFileName.length - 1];
  //Validar Extension
  const validExtensions = ["png", "jpg", "jpeg", "gif"];
  if (!validExtensions.includes(fileType)) {
    return resp.status(400).json({
      ok: false,
      msg: "El tipo de extension no es correcto",
    });
  }
  //Generar nombre de extension como ID para que sea unico
  const newFileName = `${uuidv4()}.${fileType}`;

  //Path para guardar la imagen
  const path = `./uploads/${type}/${newFileName}`;

  file.mv(path, function (err) {
    if (err)
      return resp.status(500).json({
        ok: false,
        msg: "Error al mover la imagen a la carpeta de guardado",
      });
    //Actualizar BBDD; relacionar file con ID
    uploadImage(type, id, newFileName);
    return resp.json({
      ok: true,
      newFileName,
      msg: "Archivo subido",
    });
  });
};

const getPhotoFile = (req = request, resp = response) => {
  const type = req.params.type;
  const photoName = req.params.photo;
  const imgPath = path.join(__dirname,`../uploads/${type}/${photoName}`);

  //Imagen por defecto
  if (fs.existsSync(imgPath)) {
    //Devuelve el path en forma de archivo
    resp.sendFile(imgPath);
    
  } else {
    const imgPath = path.join(__dirname,`../uploads/descarga.jpg`);
    resp.sendFile(imgPath);
  }

}

module.exports = {
  postUploadFiles,
  getPhotoFile
};
