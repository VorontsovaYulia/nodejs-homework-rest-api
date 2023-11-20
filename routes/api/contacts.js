const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

const {
  validateBody,
  validateFavoriteBody,
  isValidId,
  authenticate,
} = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFavoriteBody(schemas.favoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
