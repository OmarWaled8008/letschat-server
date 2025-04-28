const ajvUser = require("../utils/ajvUser");
module.exports = (req, res, next) => {
  const valid = ajvUser(req.body);
  if (!valid) {
    res.status(400).json(ajvUser.errors);
  }
  next();
};
