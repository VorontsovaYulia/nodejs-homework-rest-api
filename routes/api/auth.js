const express = require("express");
const ctrl = require("../../controllers/auth");

const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");
const schemas = require("../../schemas/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubSchema),
  ctrl.updateSub
);

module.exports = router;
