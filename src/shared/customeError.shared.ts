// check is dupicate id present

import {
  DUPLICATE_EMAIL,
  DUPLICATE_KEY_ERROR,
  DUPLICATE_USER_ID,
  DUPLICATE_USER_NAME,
} from "./ErrorMessage.shared";

const isDuplicateError = (error: any): Boolean => {
  return error && error.code === 11000;
};

const getErrorFieldWithMessage = (error: any): string => {
  if (error.message.includes("comm_email")) {
    return DUPLICATE_EMAIL;
  } else if (error.message.includes("uname")) {
    return DUPLICATE_USER_NAME;
  } else if (error.message.includes("uid")) {
    return DUPLICATE_USER_ID;
  }else{
    return DUPLICATE_KEY_ERROR
  }
};

export { isDuplicateError, getErrorFieldWithMessage };
