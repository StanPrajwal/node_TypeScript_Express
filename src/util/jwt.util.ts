import * as JWT from 'jsonwebtoken'
const jwtKey = process.env.JWT_KEY
const createToken = (uID:string)=>{
  
    if(jwtKey){
        const token =  JWT.sign({uID},jwtKey)
        console.log()
        return token
    }
    
}

const verifyToken =async (token:string) => {
    if(jwtKey){
        try {
            const decodedToken = JWT.verify(token,jwtKey)
            console.log(decodedToken)
            return decodedToken
        } catch (error) {
            console.log(error)
        }
    
   
    }
    
    
}
export {createToken,verifyToken}