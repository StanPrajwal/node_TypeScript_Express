import * as HTTPCODE from "http-status";
import { AppResponse, createResponse } from "../../shared/appResponse.shared";
import { UserAccount } from "../schema/user-account.schema";
import httpStatus = require("http-status");
import { User } from "../../modules/user/user.services";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../../modules/share/ErrorMessage.shared";

const registerUser = async (newUser: any): Promise<AppResponse> => {
  try {
    console.log(newUser, "DAO");
    const user = await UserAccount.create(newUser);
    // console.log(user, "After insert");
    return createResponse(HTTPCODE.OK, "Register Successfully!");
  } catch (error) {
    // console.log(error);
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
      { $set: { name, dept } },{new:true}
    );

    return createResponse(httpStatus.OK, "Updated Successfully!");
  } catch (error) {
    return createResponse(
      HTTPCODE.INTERNAL_SERVER_ERROR,
      INTERNAL_SERVER_ERROR
    );
  }
};
const deleteUserDao = async (uID: string) => {
  try {
    const deleteUser = await UserAccount.findOneAndDelete({_id: uID });
    if(deleteUser){
      return createResponse(httpStatus.OK, "Deleted Successfully!", deleteUser);
    }
    return createResponse(httpStatus.NOT_FOUND, NOT_FOUND)
   
  } catch (error) {
    return createResponse(HTTPCODE.NOT_FOUND, NOT_FOUND);
  }
};

export { registerUser, updateUserDao, deleteUserDao };
