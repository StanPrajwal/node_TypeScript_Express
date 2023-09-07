export enum Roles {
    role1 = "Admin",
    role2 = "User"
}
const EmployeeIDComm = "G7CR"

 const roleExpireDate = 30 * 24 * 60 * 60 * 1000
 const sessionExpire = 20 * 60 * 1000
 const RegExpConstants = {
    EmployeeIdReg : /^[a-zA-Z0-9]{14,14}$/,
    PasswordReg :/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/,
    EmailReg : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
}
export {roleExpireDate,RegExpConstants,EmployeeIDComm,sessionExpire}

