//Models
const Users = require("../models/users.model");
const Hospitals = require("../models/hospital.model");
const Medicians = require("../models/medician.model");
//FileSystem
const fs = require(`fs`);

const checkPath = (data) => {
  const oldPath = `./uploads/medicians/${data.image}`;
  if (fs.existsSync(oldPath)) {
    //Borra Imagen
    fs.unlinkSync(oldPath);
  }
};

const uploadImage = async (type, id, newFileName) => {
  switch (type) {
    case "users":
      const user = await Users.findById(id);
      if (!user) {
        return false;
      }
      checkPath(user);
      user.image = newFileName;
      await user.save();
      return true;
      break;
    case "hospitals":
      const hospital = await Hospitals.findById(id);
      if (!hospital) {
        return false;
      }
      checkPath(hospital);
      hospital.image = newFileName;
      await hospital.save();
      return true;
      break;
    case "medicians":
      const medician = await Medicians.findById(id);
      if (!medician) {
        return false;
      }
      checkPath(medician);
      medician.image = newFileName;
      await medician.save();
      return true;
      break;
    default:
      break;
  }
};

module.exports = {
  uploadImage,
};
