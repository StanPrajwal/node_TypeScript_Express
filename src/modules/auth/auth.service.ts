import { Request, Response } from "express";
import { userIsExist } from "../../database/dao/auth.dao";
import { decryptPwd } from "../../util/bcrypt.util";
import { createToken } from "../../util/jwt.util";
import { AppResponse, createResponse } from "../../shared/appResponse.shared";
import httpStatus = require("http-status");
import {
  DbErrors,
  INTERNAL_SERVER_ERROR,
} from "../../shared/ErrorMessage.shared";
import { SuccessMessage } from "../../shared/successMessage.shared";
import { createSession } from "../../database/dao/logAppSession.dao";

const loginSvc = async (logDetail: any) => {
  try {
    const dbRes = await userIsExist(logDetail.uname);
    if (dbRes && "pwd" in dbRes) {
      // console.log(logDetail.pwd, dbRes.pwd);
      const isCrtPwd = await decryptPwd(logDetail.pwd, dbRes.pwd);
      // console.log(isCrtPwd);
      if (isCrtPwd) {
        const session = await createSession(dbRes);
        if (session) {
          // console.log(session, "service");
          const token = await createToken(dbRes);
          if (!token) {
            return createResponse(
              httpStatus.INTERNAL_SERVER_ERROR,
              INTERNAL_SERVER_ERROR
            );
          }else{
            console.log(token)
            return createResponse(httpStatus.OK, SuccessMessage.LOGIN_SUCCESS, {
              token,
            });
          }
         
        }else{
          return createResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            INTERNAL_SERVER_ERROR
          );
        }
       
      } else {
        return createResponse(
          httpStatus.UNAUTHORIZED,
          DbErrors.INVALID_PASSWORD
        );
      }
    } else {
      return dbRes;
    }
  } catch (error) {
    return createResponse(
      httpStatus.INTERNAL_SERVER_ERROR,
      INTERNAL_SERVER_ERROR
    );
  }
};
export { loginSvc };
