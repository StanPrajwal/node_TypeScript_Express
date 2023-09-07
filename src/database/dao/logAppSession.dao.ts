import { start } from "repl";
import { LogsAppSessions } from "../schema/log-app-session.schema";
import { sessionExpire } from "../../shared/enums.shared";
import {
  getErrorFieldWithMessage,
  isDuplicateError,
} from "../../shared/customeError.shared";
import { AppResponse, createResponse } from "../../shared/appResponse.shared";
import httpStatus = require("http-status");
import { INTERNAL_SERVER_ERROR } from "../../shared/ErrorMessage.shared";
import { NextFunction, Request, Response } from "express";

const createSession = async (session: any)=> {
  try {
    const { _id, roles } = session;
    // console.log(_id, roles)
    const userSession = await LogsAppSessions.findOne({ uid: _id });
    if (userSession) {
      if (userSession.end_ts > Date.now()) {
        userSession.start_ts = Date.now();
        userSession.end_ts = userSession.start_ts + sessionExpire;
        await userSession.save();
      }

      return true;
    } else {
      const role = roles[0];
      console.log(role)
      const start_ts = Date.now();
      const createSess = await LogsAppSessions.create({
        uid: _id,
        rname: role.rName,
        rid: role.rID,
        start_ts,
        end_ts: start_ts + sessionExpire,
      });
      console.log(createSess)
      return true;
    }
  } catch (error) {
    return false
  }
};

const verifySession = async(req:any,res:Response,next:NextFunction)=>{
  try {
    const {sub} = req.claims.payload
    
  } catch (error) {
    
  }
}
export { createSession ,verifySession};
