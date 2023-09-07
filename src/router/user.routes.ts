import { Router } from "express";
import { deleteUserAct, updateUserDetail, userRegister } from "../modules/user/user.controller";
import { registerValidation, updateValidation } from "../util/FieldValidation.util";
import { verifyToken } from "../util/jwt.util";
import { verifySession } from "../database/dao/logAppSession.dao";

const routes = Router()

routes.post('/newuser',registerValidation,userRegister)
routes.patch('/update/:id',updateValidation,verifyToken,verifySession,updateUserDetail)
routes.delete('/remove/:id',deleteUserAct)

export default routes