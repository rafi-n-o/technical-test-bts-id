const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, "test-bts-id-rafi", function (err, decoded) {
    if (err) {
      return res.status(400).json({
        code: 400,
        message: err.message,
      });
    }

    req.token = decoded;

    return next();
  });
};
