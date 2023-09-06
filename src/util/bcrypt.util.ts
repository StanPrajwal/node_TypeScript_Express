import * as bcrypt from "bcrypt";
const encryptionPwd = async(pwd:string)=>{
    const saltRound = process.env.SALT_RND
    try {
        if(saltRound){
            const hash = await bcrypt.hash(pwd,Number(saltRound))
            return hash
        }
    } catch (error) {
        console.log(error)
        console.log("Error while creating Encrypted Password")
        throw Error("Error while creating Encrypte Password")
        
    }
   
}
const decryptPwd = async(logPwd:string,orgPwd:string)=>{
  return await bcrypt.compare(logPwd,orgPwd)
 
}
export {encryptionPwd,decryptPwd}