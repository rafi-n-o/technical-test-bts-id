const bcrypt = require("bcrypt");
const { User } = require("../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const schema = {
    username: "string|empty:false",
    password: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      code: 400,
      message: "validation failed",
      data: validate,
    });
  }

  const user = await User.findOne({
    where: { username: req.body.username },
  });

  if (!user) {
    return res.status(400).json({
      code: 400,
      message: "User tidak terdaftar",
    });
  }

  const isValidUser = await bcrypt.compare(req.body.password, user.password);

  if (!isValidUser) {
    return res.status(400).json({
      code: 400,
      message: "password salah",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    "test-bts-id-rafi"
  );

  return res.json({
    code: 0,
    message: "login berhasil",
    data: token,
  });
};
