const { Checklist } = require("../../models");

module.exports = async (req, res) => {
  const checklists = await Checklist.findAll({
    where: { userId: req.token.id },
  });

  return res.json({
    code: 0,
    message: "semua produk",
    data: checklists,
  });
};
