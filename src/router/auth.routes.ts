import { Router } from "express";
import { userLogin } from "../modules/auth/auth.controller";
import { loginValidation } from "../util/FieldValidation.util";
const router = Router();

router.post('/login',loginValidation,userLogin)
router.patch('/logout')

export default router;





