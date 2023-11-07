const { User } = require("../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const schema = {
    username: "string|empty:false",
    email: "string|empty:false",
    password: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      code: 400,
      data: validate,
      message: "validation failed",
    });
  }

  const findByUsername = await User.findOne({
    where: { username: req.body.username },
  });

  if (findByUsername) {
    return res.status(400).json({
      code: 400,
      message: "username telah terdaftar",
    });
  }

  const findByEmail = await User.findOne({
    where: { email: req.body.email },
  });

  if (findByEmail) {
    return res.status(400).json({
      code: 400,
      message: "email telah terdaftar",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: password,
  });

  return res.json({
    code: 0,
    message: "registrasi berhasil",
    data: user,
  });
};
