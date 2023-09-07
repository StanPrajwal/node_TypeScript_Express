import * as HTTPCODE from "http-status";
import { AppResponse, createResponse } from "../../shared/appResponse.shared";
import { UserAccount } from "../schema/user-account.schema";
import httpStatus = require("http-status");
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../../shared/ErrorMessage.shared";
import {
  getErrorFieldWithMessage,
  isDuplicateError,
} from "../../shared/customeError.shared";
import { SuccessMessage } from "../../shared/successMessage.shared";

const registerUser = async (newUser: any): Promise<AppResponse> => {
  try {
    console.log(newUser,"dao")
    const user = await UserAccount.create(newUser);
  
    return createResponse(HTTPCODE.OK, SuccessMessage.REGISTRATION_COMPLETED);
  } catch (error) {
    console.log(error)
    if (isDuplicateError(error)) {
      const errorMessage = getErrorFieldWithMessage(error);
      return createResponse(HTTPCODE.CONFLICT, errorMessage);
    }
    return createResponse(
      HTTPCODE.INTERNAL_SERVER_ERROR,
      INTERNAL_SERVER_ERROR
    );
  }
};
const updateUserDao = async (userUpdate: any) => {
  try {
    const { name, dept, id } = userUpdate;
    const updatedUser = await UserAccount.findOneAndUpdate(
      { _id: id },
      { $set: { name, dept } },
      { new: true }
    );

    return createResponse(httpStatus.OK, SuccessMessage.UPDATED);
  } catch (error) {
    return createResponse(
      HTTPCODE.INTERNAL_SERVER_ERROR,
      INTERNAL_SERVER_ERROR
    );
  }
};
const deleteUserDao = async (uID: string) => {
  try {
    const deleteUser = await UserAccount.findOneAndDelete({ _id: uID });
    if (deleteUser) {
      return createResponse(httpStatus.OK, SuccessMessage.DELETED, deleteUser);
    }
    return createResponse(httpStatus.NOT_FOUND, NOT_FOUND);
  } catch (error) {
    return createResponse(HTTPCODE.NOT_FOUND, NOT_FOUND);
  }
};

export { registerUser, updateUserDao, deleteUserDao };
