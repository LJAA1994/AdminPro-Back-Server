// RUTA = '/api/medicians

const { Router } = require("express");
// Validator
const { check } = require("express-validator");
//Middlewares
const { validatorFields } = require("../middlewares/fields-validator");
const { validateJwt } = require("../middlewares/jwt-validator");
//Controller
const {
  getMedicians,
  postMedicians,
  updateMedicians,
  deleteMedicians,
} = require("../controllers/medicians.controller");

const router = Router();

router.get("/", validateJwt, getMedicians);
router.post(
  "/",
  [
    validateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    //Comprobar que el ID relacional es un ID correcto de Mongo
    check('hospital', 'El Id del hospital debe ser correcto').isMongoId(),
    validatorFields,
  ],
  postMedicians
);

router.put(
  "/:id",
  [
    validateJwt,
    validatorFields,
  ],
  updateMedicians
);
router.delete("/:id", validateJwt, deleteMedicians);

module.exports = router;