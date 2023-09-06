import httpStatus = require("http-status")
import { AppResponse, createResponse } from "../../shared/appResponse.shared"
import { UserAccount } from "../schema/user-account.schema"

// methods logic
const userIsExist = async(uID:string)=>{
    try {
        const user = await UserAccount.findOne({_id:uID},{name:1,pwd:1})
        return user
        
    } catch (error) {
        return createResponse(httpStatus.NOT_FOUND,"User Not Found Please Register!")
    }
    
}
export {userIsExist}