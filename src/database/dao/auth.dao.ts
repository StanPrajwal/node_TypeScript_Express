import httpStatus = require("http-status");
import { AppResponse, createResponse } from "../../shared/appResponse.shared";
import { UserAccount } from "../schema/user-account.schema";
import {
  DbErrors,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../../shared/ErrorMessage.shared";

// methods logic
const userIsExist = async (uname: string) => {
  try {
    const dbRes = await UserAccount.findOne(
      { uname },
      { name: 1, pwd: 1, roles: 1, uname: 1 }
    );
    if (!dbRes) {
      return createResponse(httpStatus.NOT_FOUND, DbErrors.USER_NOT_FOUND);
    }
    return dbRes;
  } catch (error) {
    return createResponse(
      httpStatus.INTERNAL_SERVER_ERROR,
      INTERNAL_SERVER_ERROR
    );
  }
};
export { userIsExist };
