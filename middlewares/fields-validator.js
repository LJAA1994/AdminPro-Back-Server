const { response } = require("express");
// Errores de Express Validators
const { validationResult } = require("express-validator");

const validatorFields = (req, resp = response, next) => {
  // 'errors' recoge los errores de las comprobaciones de Express-Validator en la ruta
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return resp.status(400).json({
      ok: false,
      error: errors.mapped(),
    });
  }
  next();
};

module.exports = {
  validatorFields,
};
