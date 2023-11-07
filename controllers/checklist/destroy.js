const { Checklist } = require("../../models");

module.exports = async (req, res) => {
  try {
    const checklist = await Checklist.destroy({
      where: { id: req.params.id, userId: req.token.id },
    });

    if (!checklist) {
      return res.status(400).json({
        code: 400,
        message: "ceklis tidak ditemukan",
      });
    }

    return res.json({
      code: 0,
      message: "ceklis berhasil dihapus",
      data: checklist,
    });
  } catch (error) {
    const message = error.parent.sqlMessage.split(":");

    return res.status(400).json({
      code: 400,
      message: message[0],
    });
  }
};
