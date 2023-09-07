import { Schema, SchemaTypes, model } from "mongoose";
import { Roles } from "../../shared/enums.shared";

const readOnlyRoleSchema = new Schema({
    rid:{
        type: SchemaTypes.Number,
        required: true,
    },	
	rname:{
        type: SchemaTypes.String,
        required: true,
        enum:Roles
    }		
})
const ReadOnlyRoles = model("readonlyroles", readOnlyRoleSchema)