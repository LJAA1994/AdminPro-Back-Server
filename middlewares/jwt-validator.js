// Para ayudar al tipado de la 'resp' en las funciones
const { response } = require("express");
const { request } = require("express");
//Jwt
const jwt = require("jsonwebtoken");

const validateJwt = (req = request, resp = response, next) => {
  const token = req.header("x-token");
  console.log(token);
  if(!token ) {
    return resp.status(401).json({
        ok: false,
        msg:'Token incorrecto'
    })
  }
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    next();
  }catch(error) {
    console.log(error);
    return resp.status(401).json({
        ok: false,
        msg:'Token incorrecto'
    })
  }

};

module.exports = {
  validateJwt,
};
