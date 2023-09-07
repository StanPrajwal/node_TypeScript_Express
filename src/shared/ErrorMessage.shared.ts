const UNAUTHORIZED = "Unauthorized!";
const NOT_FOUND = "User Not Found";
const UNPROCESSABLE_ENTITY = "Unprocessable Entity or Field is Missing";
const INTERNAL_SERVER_ERROR = "Something Went Wrong";
const DUPLICATE_KEY_ERROR = "Duplicate key error";
const DUPLICATE_EMAIL = "Email Already Exist!";
const DUPLICATE_USER_NAME = "User Name Alredy Exist!";
const DUPLICATE_USER_ID = 'User ID Alredy Exist!'

const INVALIDE_TOKEN="Invalid Token!"
export enum DbErrors {
  USER_NOT_FOUND = "User Not Found Provide Valid Id",
  INVALID_PASSWORD = "Invalid Password!"
}
// Field Missing Errors
export enum MissingFieldsEnum {
  BODY_MISSING = "Requset Body is Missing",
  NAME_MISSING = "Name Field is Missing!",
  EMAIL_MISSING = "Name Field is Missing!",
  EMAIL_VALIDATION = "Invalid Email Address!",
  UNAME_MISSING = "User Name Field is Missing!",
  UNAME_VALIDATION = "Invalid User Name Address!",
  ROLE_MISSING = "Role Field is Missing!",
  DPT_MISSING = "Department Field is Missing!",
  PASSWORD_MISSING = "Password Field is Missing!",
  PASSWORD_VALIDATION = "Password Should atleast 8 Char Long And Less than 15 Char should Contain number and Characters",
}

export {
  UNAUTHORIZED,
  NOT_FOUND,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
  DUPLICATE_EMAIL,
  DUPLICATE_KEY_ERROR,
  DUPLICATE_USER_NAME,
  DUPLICATE_USER_ID,
  INVALIDE_TOKEN
};
