import { Schema, SchemaTypes, model } from "mongoose";
import {  Roles } from "../../shared/enums.shared";

const roleSchema = new Schema({
  _id: {
    type: SchemaTypes.String,
    default: undefined,
  },
  rID: {
    type: SchemaTypes.Number,
    required: true,
  },
  rName: {
    type: SchemaTypes.String,
    required: true,
    enum: Roles,
  },
  start_ts: {
    type: SchemaTypes.Number,
    required: true,
  },
  end_ts: {
    type: SchemaTypes.Number,
    required: true,
  },
});
const userSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    uname: {
      type: SchemaTypes.String,
      required: true,
      unique:true
    },
    emp_id: {
      type: SchemaTypes.String,
      required: true,
      unique:true
    },
    comm_email: {
      type: SchemaTypes.String,
      required: true,
      unique:true
    },
    dept: {
      type: SchemaTypes.String,
      required: true,
    },
    pwd: {
      type: SchemaTypes.String,
      required: true,
    },
    roles: [roleSchema],
    isactive: {
      type: SchemaTypes.Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const UserAccount = model("userAccounts", userSchema);

export { UserAccount };
