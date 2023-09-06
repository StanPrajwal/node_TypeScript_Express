import { Router } from "express";
import { deleteUserAct, updateUserDetail, userRegister } from "../modules/user/user.controller";

const routes = Router()

routes.post('/newuser',userRegister)
routes.patch('/update/:id',updateUserDetail)
routes.delete('/remove/:id',deleteUserAct)

export default routes