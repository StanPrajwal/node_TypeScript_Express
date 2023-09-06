import {Schema,SchemaTypes,model} from 'mongoose'

enum Roles {
    role1 = "Admin",
    role2 = "User"
}

const roleSchema = new Schema({
    _id:{
        type:SchemaTypes.String,
        default:undefined
    },
    rID:{
        type:SchemaTypes.ObjectId,
        required:true
    },
    rName:{
        type:SchemaTypes.String,
        required:true,
        enum:Roles,
        
    },
    start_ts:{
        type:SchemaTypes.Date,
        required:true,
        default:Date.now(),
    },
    end_ts:{
        type:SchemaTypes.Date,
        required:true,
        
    }
})
const userSchema  = new Schema({
    name:{
        type:SchemaTypes.String,
        required:true
    },
    dept:{
        type:SchemaTypes.String,
        required:true
    },
    pwd:{
        type:SchemaTypes.String,
        required:true
    },
    roles:[roleSchema],  

},{ timestamps: true })

const UserAccount = model('userAccounts',userSchema)

export {UserAccount}