const { Item, Checklist } = require("../../models");

module.exports = async (req, res) => {
  try {
    const findItem = await Item.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Checklist,
          where: { id: req.params.checklistId, userId: req.token.id },
        },
      ],
    });

    if (!findItem) {
      return res.status(400).json({
        code: 400,
        message: "item tidak ditemukan",
      });
    }

    const item = await Item.destroy({
      where: { id: req.params.id, checklistId: req.params.checklistId },
    });

    return res.json({
      code: 0,
      message: "item berhasil dihapus",
      data: item,
    });
  } catch (error) {
    const message = error.parent.sqlMessage.split(":");

    return res.status(400).json({
      code: 400,
      message: message[0],
    });
  }
};
