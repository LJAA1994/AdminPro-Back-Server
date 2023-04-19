// RUTA = '/api/users'

const { Router } = require("express");
// Controllers
const {
  getUsers,
  postUser,
  updateUsers,
  deleteUsers
} = require("../controllers/users.controllers");
// Validator
const { check } = require("express-validator");
//Middlewares
const { validatorFields } = require("../middlewares/fields-validator");
const { validateJwt } = require("../middlewares/jwt-validator");

const router = Router();

router.get("/", validateJwt,getUsers);
router.post(
  "/",
  [
    validateJwt,
    //Primer parametro 'campo', segundo parametro 'mensaje'
    check("name", "El campo name es obligatorio").not().isEmpty(),
    check("email", "El campo email es obligatorio y un email").isEmail(),
    check("password", "El campo password es obligatorio").not().isEmpty(),
    validatorFields,
  ],
  postUser
);

router.put(
  "/:id",
  [validateJwt,
    //Primer parametro 'campo', segundo parametro 'mensaje'
    check("name", "El campo name es obligatorio").not().isEmpty(),
    check("email", "El campo email es obligatorio y un email").isEmail(),
    check("role", "El campo role es obligatorio").not().isEmpty(),
    validatorFields,
  ],
  updateUsers
);
router.delete(
    "/:id",validateJwt,deleteUsers)

module.exports = router;
