import {
  deleteUserDao,
  registerUser,
  updateUserDao,
} from "../../database/dao/user.dao";
import mongoose from "mongoose";
import { encryptionPwd } from "../../util/bcrypt.util";
import { createResponse } from "../../shared/appResponse.shared";
import httpStatus = require("http-status");
import { verifyToken } from "../../util/jwt.util";
import { UNAUTHORIZED, UNPROCESSABLE_ENTITY } from "../share/ErrorMessage.shared";
export type User = {
  name: string;
  rName: [];
  dept: string;
  pwd: string;
};
const userRegisterSvc = async (user: User) => {
  const { name, rName, dept, pwd } = user;

  if (name && rName.length && dept && pwd) {
    const password = await encryptionPwd(pwd);
    const roles = [];
    console.log(name, rName, dept, pwd )
    for (let i = 0; i < rName.length; i++) {
      const start_ts = new Date();
      const expDate = 2;
      const end_ts = start_ts.setDate(start_ts.getDate() + expDate);
      const role = {
        rID: new mongoose.Types.ObjectId(),
        start_ts,
        end_ts,
        rName: rName[i],
      };
      roles.push(role);
    }
    const newUser = {
      name,
      dept,
      pwd: password,
      roles,
    };
    console.log(newUser);
    return await registerUser(newUser);
  } else {
    return createResponse(
      httpStatus.UNPROCESSABLE_ENTITY,
      UNPROCESSABLE_ENTITY
    );
  }
};

const updateUserDetailSvc = async (updateUser: any) => {
  const { name, dept, token } = updateUser;
  if (name && dept) {
    const decodedToken = await verifyToken(token);
    if (decodedToken) {
      return await updateUserDao(updateUser);
    } else {
      return createResponse(httpStatus.UNAUTHORIZED, UNAUTHORIZED);
    }
  } else {
    return createResponse(
      httpStatus.UNPROCESSABLE_ENTITY,
      UNPROCESSABLE_ENTITY
    );
  }
};
const deleteUserSvc = async ({ token, id }: any) => {
  const decodedToken = await verifyToken(token);
  if (decodedToken) {
    return await deleteUserDao(id);
  }else {
    return createResponse(httpStatus.UNAUTHORIZED, UNAUTHORIZED);
  }
};
export { userRegisterSvc, updateUserDetailSvc, deleteUserSvc };
