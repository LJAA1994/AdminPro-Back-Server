// RUTA = '/api/login

const {Router} = require("express");
// Controllers
const {login, loginGoogle} = require('../controllers/auth.controller');
// Validator
const { check } = require("express-validator");
//Middlewares
const { validatorFields } = require("../middlewares/fields-validator");
const router = Router();

router.post('/',[
    check('email','El email es obligatorio y con su estructura').isEmail(),
    check('password','El email es obligatorio y con su estructura').not().isEmpty(),
    validatorFields
],
login)
router.post('/google',[
    check('token','El token de google es obligatorio').not().isEmpty(),
    validatorFields
],
loginGoogle)

module.exports = router;