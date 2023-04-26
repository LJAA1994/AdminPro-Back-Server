// RUTA = '/api/browser

const { Router } = require("express");
// Validator
const { check } = require("express-validator");
//Middlewares
const { validatorFields } = require("../middlewares/fields-validator");
const { validateJwt } = require("../middlewares/jwt-validator");
//Controller
const {
  getParamAll,
  getParamCollection,

} = require("../controllers/browser.controller");

const router = Router();

router.get("/:finder", validateJwt, getParamAll);
router.get("/collections/:table/:finder", validateJwt, getParamCollection);


module.exports = router;
