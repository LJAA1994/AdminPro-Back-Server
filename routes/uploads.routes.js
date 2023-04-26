// RUTA = '/api/uploads

const { Router } = require("express");
const fileUpload = require('express-fileupload');

//Middlewares
const { validateJwt } = require("../middlewares/jwt-validator");
//Controller
const {
postUploadFiles,
getPhotoFile
} = require("../controllers/uploads.controller");

const router = Router();
//Middleware para capturar y subir archivos antes de pasar por la ruta
router.use(fileUpload());

router.put("/:type/:id", validateJwt, postUploadFiles);
router.get("/:type/:photo", validateJwt, getPhotoFile);


module.exports = router;