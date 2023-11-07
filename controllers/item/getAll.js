const { Item, Checklist } = require("../../models");

module.exports = async (req, res) => {
  const items = await Item.findAll({
    where: { checklistId: req.params.checklistId },
    include: [{ model: Checklist, where: { userId: req.token.id } }],
  });

  return res.json({
    code: 0,
    message: "semua item",
    data: items,
  });
};
