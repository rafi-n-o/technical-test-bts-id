const { Item, Checklist } = require("../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    itemName: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      code: 400,
      data: validate,
      message: "validation failed",
    });
  }

  const item = await Item.create({
    checklistId: req.params.checklistId,
    itemName: req.body.itemName,
  });

  return res.json({
    code: 0,
    message: "item berhasil ditambahkan",
    data: item,
  });
};
