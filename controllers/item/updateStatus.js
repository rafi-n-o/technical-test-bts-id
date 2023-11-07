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

  const findItem = await Item.findOne({
    where: { id: req.params.id, checklistId: req.params.checklistId },
    include: [{ model: Checklist, where: { userId: req.token.id } }],
  });

  if (!findItem) {
    return res.status(404).json({
      code: 404,
      message: "item tidak ditemukan",
    });
  }

  if (findItem.status === false) {
    const item = await Item.update(
      {
        status: true,
      },
      {
        where: { id: req.params.id, checklistId: req.params.checklistId },
      }
    );

    return res.json({
      code: 0,
      message: "status item berhasil diubah",
      data: item,
    });
  } else {
    const item = await Item.update(
      {
        status: false,
      },
      {
        where: { id: req.params.id, checklistId: req.params.checklistId },
      }
    );

    return res.json({
      code: 0,
      message: "status item berhasil diubah",
      data: item,
    });
  }
};
