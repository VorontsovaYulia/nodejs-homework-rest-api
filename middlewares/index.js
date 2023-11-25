const { validateBody, validateFavoriteBody } = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validateBody,
  validateFavoriteBody,
  isValidId,
  authenticate,
  upload,
};
