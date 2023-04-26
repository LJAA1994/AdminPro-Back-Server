// RUTA = '/api/hospitals

const { Router } = require("express");

// Validator
const { check } = require("express-validator");
//Middlewares
const { validatorFields } = require("../middlewares/fields-validator");
const { validateJwt } = require("../middlewares/jwt-validator");
//Controller
const {
  getHospitals,
  postHospitals,
  updateHospitals,
  deleteHospitals,
} = require("../controllers/hospitals.controller");

const router = Router();

router.get("/", validateJwt, getHospitals);
router.post(
  "/",
  [
    validateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validatorFields,
  ],
  postHospitals
);

router.put(
  "/:id",
  [
    validateJwt,
    validatorFields,
  ],
  updateHospitals
);
router.delete("/:id", validateJwt, deleteHospitals);

module.exports = router;