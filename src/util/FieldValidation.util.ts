import { Request, Response, NextFunction } from "express";
import httpStatus = require("http-status");
import { RegExpConstants } from "../shared/enums.shared";
import { MissingFieldsEnum } from "../shared/ErrorMessage.shared";

const commanFieldValidation = (req: Request, res: Response,next:NextFunction) => {
  const { name, comm_email, rName, dept, pwd } = req.body;
  if (!name) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: MissingFieldsEnum.NAME_MISSING,
    });
  } else if (!comm_email) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: MissingFieldsEnum.EMAIL_MISSING,
    });
  } else if (!RegExpConstants.EmailReg.test(comm_email)) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: MissingFieldsEnum.EMAIL_VALIDATION,
    });
  } else if (!rName.length) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: MissingFieldsEnum.ROLE_MISSING,
    });
  } else if (!dept) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: MissingFieldsEnum.DPT_MISSING,
    });
  } else if (!pwd) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: MissingFieldsEnum.PASSWORD_MISSING,
    });
  } else if (!RegExpConstants.PasswordReg.test(pwd)) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: MissingFieldsEnum.PASSWORD_VALIDATION,
    });
  }else{
    next()
  }
};

const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body) {
    const { name, uname, comm_email, rName, dept, pwd } = req.body;
   
    if (!name) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.NAME_MISSING,
      });
    } else if (!comm_email) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.EMAIL_MISSING,
      });
    } else if (!RegExpConstants.EmailReg.test(comm_email)) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.EMAIL_VALIDATION,
      });
    } else if (!rName.length) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.ROLE_MISSING,
      });
    } else if (!dept) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.DPT_MISSING,
      });
    } else if (!pwd) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.PASSWORD_MISSING,
      });
    } else if (!RegExpConstants.PasswordReg.test(pwd)) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.PASSWORD_VALIDATION,
      });
    } else if (!uname) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.UNAME_MISSING,
      });
    } else if (!RegExpConstants.EmailReg.test(uname)) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.UNAME_VALIDATION,
      });
    } else {
      next();
    }
  } else {
    res.status(httpStatus.NO_CONTENT).json({
      message: MissingFieldsEnum.BODY_MISSING,
    });
  }
};

const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body) {
    const { uname, pwd } = req.body;
    if (!uname) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.UNAME_MISSING,
      });
    } else if (!RegExpConstants.EmailReg.test(uname)) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.UNAME_VALIDATION,
      });
    } else if (!pwd) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.PASSWORD_MISSING,
      });
    } else {
      next();
    }
  } else {
    res.status(httpStatus.NO_CONTENT).json({
      message: MissingFieldsEnum.BODY_MISSING,
    });
  }
};

const updateValidation = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    const { name, comm_email, rName, dept, pwd } = req.body;
    if (!name) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.NAME_MISSING,
      });
    } else if (!comm_email) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.EMAIL_MISSING,
      });
    } else if (!RegExpConstants.EmailReg.test(comm_email)) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.EMAIL_VALIDATION,
      });
    } else if (!rName.length) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.ROLE_MISSING,
      });
    } else if (!dept) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.DPT_MISSING,
      });
    } else if (!pwd) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.PASSWORD_MISSING,
      });
    } else if (!RegExpConstants.PasswordReg.test(pwd)) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: MissingFieldsEnum.PASSWORD_VALIDATION,
      });
    }else{
      next()
    }
  } else {
    res.status(httpStatus.NO_CONTENT).json({
      message: MissingFieldsEnum.BODY_MISSING,
    });
  }
};
export { registerValidation, loginValidation, updateValidation };
