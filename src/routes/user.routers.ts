const { Router } = require('express')
const router = Router()

import * as userController from "../controllers/user.controller";
import { authJwt, verifySingup } from "../middleware";

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySingup.checkRolesExisted], userController.createUser)

export default router