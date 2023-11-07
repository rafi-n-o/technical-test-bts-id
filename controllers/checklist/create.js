const { Checklist } = require("../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      code: 400,
      data: validate,
      message: "validation failed",
    });
  }

  const checklist = await Checklist.create({
    userId: req.token.id,
    name: req.body.name,
  });

  return res.json({
    code: 0,
    message: "checklist berhasil ditambahkan",
    data: checklist,
  });
};
