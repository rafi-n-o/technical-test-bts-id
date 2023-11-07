const { Item, Checklist } = require("../../models");

module.exports = async (req, res) => {
  const item = await Item.findOne({
    where: { id: req.params.id, checklistId: req.params.checklistId },
    include: [{ model: Checklist, where: { userId: req.token.id } }],
  });

  return res.json({
    code: 0,
    message: "data item",
    data: item,
  });
};
