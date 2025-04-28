const ajvAuth = require("../utils/authValidator");

const validateAuth = (req, res, next) => {
  const valid = ajvAuth(req.body);
  if (!valid) {
    return res.status(400).json(ajvAuth.errors);
  }
  next();
};

module.exports = validateAuth;
