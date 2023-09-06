import { Request, Response, NextFunction } from "express";
import {
  deleteUserSvc,
  updateUserDetailSvc,
  userRegisterSvc,
} from "./user.services";
import { createResponse } from "../../shared/appResponse.shared";
import httpStatus = require("http-status");
import { UNAUTHORIZED } from "../share/ErrorMessage.shared";
const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registerRes = await userRegisterSvc(req.body);
  res.json({
    registerRes,
  });
};
const updateUserDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log(token)
    const updateRes = await updateUserDetailSvc({ ...req.body, id, token });
    if (updateRes.code) {
      res.status(updateRes.code).json({
        updateRes,
      });
    }
  }
  else {
    const noToken = createResponse(
      httpStatus.UNAUTHORIZED,
      UNAUTHORIZED
    );

    res.status(noToken.code).json(noToken);
  }
};
const deleteUserAct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log(token)
    const updateRes = await deleteUserSvc({ token, id });
    if (updateRes.code) {
      res.status(updateRes.code).json({
        updateRes,
      });
    }
  } else {
    const noToken = createResponse(
      httpStatus.UNAUTHORIZED,
      UNAUTHORIZED
    );

    res.status(noToken.code).json(noToken);
  }
};
export { userRegister, updateUserDetail, deleteUserAct };
