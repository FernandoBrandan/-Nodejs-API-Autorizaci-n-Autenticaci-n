const { Router } = require("express");
const router = Router();

import * as authController from "../controllers/auth.controller";
import { verifySingup } from "../middleware";

router.post("/signup", [verifySingup.checkDuplicateUsernameOrEmail, verifySingup.checkRolesExisted], authController.signup);
router.post("/signin", authController.signin);

export default router;
