import { Request, Response, NextFunction } from "express";
import { loginSvc } from "./auth.service";
import { AppResponse } from "../../shared/appResponse.shared";

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const loginRes = await loginSvc(req.body);
  if(loginRes?.code){
    res.status(loginRes.code).json(
        loginRes,
      );
  }
 
};
const userLogOut = (req: Request, res: Response, next: NextFunction)=>{

}
export { userLogin };
