const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

const {
  validateBody,
  validateFavoriteBody,
  isValidId,
} = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavoriteBody(schemas.favoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
