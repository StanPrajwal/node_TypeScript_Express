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
import {
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} from "../../shared/ErrorMessage.shared";
import { User } from "../../shared/types.shared";
import { EmployeeIDComm, roleExpireDate } from "../../shared/enums.shared";
const getRoles = (rName: any) => {
  const roles = [];
  for (let i = 0; i < rName.length; i++) {
    const start_ts = Date.now();
    const end_ts = start_ts + roleExpireDate;
    const role = {
      rID: Date.now(),
      start_ts,
      end_ts,
      rName: rName[i],
    };
    roles.push(role);
  }
  return roles;
};
const userRegisterSvc = async (user: User) => {
  const { name, uname, comm_email, rName, dept, pwd } = user;
  const password = await encryptionPwd(pwd);
  const roles = [];
  console.log(name, rName, dept, pwd);
  const emp_id = `${EmployeeIDComm}${Date.now().toString().substring(0, 10)}`;
  for (let i = 0; i < rName.length; i++) {
    const start_ts = Date.now();
    const end_ts = start_ts + roleExpireDate;
    const role = {
      rID: Date.now(),
      start_ts,
      end_ts,
      rName: rName[i],
    };
    roles.push(role);
  }
  const newUser = {
    name,
    emp_id,
    uname,
    comm_email,
    dept,
    pwd: password,
    roles,
  };
  console.log(newUser);
  return await registerUser(newUser);
};

const updateUserDetailSvc = async (updateUser: any) => {
  const { name, comm_email, rName, dept, pwd } = updateUser;
  const roles = getRoles(rName);
  const password = await encryptionPwd(pwd);
  const updatedUserData = {
    name,
    comm_email,
    dept,
    pwd:password,
  };
  return await updateUserDao(updatedUserData);
};
const deleteUserSvc = async ({ token, id }: any) => {
  return await deleteUserDao(id);
};
export { userRegisterSvc, updateUserDetailSvc, deleteUserSvc };
