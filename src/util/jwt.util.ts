import * as JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import httpStatus = require("http-status");
import { INVALIDE_TOKEN, UNAUTHORIZED } from "../shared/ErrorMessage.shared";
import { createResponse } from "../shared/appResponse.shared";
const jwtKey = process.env.JWT_KEY;
const createToken = async (payloads: any) => {
  if (jwtKey) {
    const roles = [];
    for (let i = 0; i < payloads.roles.length; i++) {
      let role = payloads.roles[i];
      roles.push(role.rName);
    }
    // console.log(payloads.roles)
    const payload = {
      sub: payloads._id,
      name: payloads.name,
      roles,
      username: payloads.uname,
    };
    const token = JWT.sign({ payload }, jwtKey, { expiresIn: "1h" });
    console.log();
    return token;
  } else {
    return "";
  }
};

const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader && jwtKey) {
      const token = authHeader.split(" ")[1];
      JWT.verify(token, jwtKey, (err: any, decoded: any) => {
        if (err) {
          res.status(httpStatus.UNAUTHORIZED).json({
            message: INVALIDE_TOKEN,
          });
        }
        console.log(decoded)
        req.claims = decoded;
        next();
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: INVALIDE_TOKEN,
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      message: INVALIDE_TOKEN,
    });
  }
};

export { createToken, verifyToken };
