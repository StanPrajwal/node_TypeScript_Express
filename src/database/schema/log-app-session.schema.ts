import { Schema, SchemaTypes,model } from "mongoose";

const logAppSessionSchema = new Schema({
  uid: {
    type: SchemaTypes.ObjectId,
    required: true,
    unique:true
  },
  rid: { type: SchemaTypes.Number, required: true },
  rname: { type: SchemaTypes.String, required: true },
  start_ts: { type: SchemaTypes.Number, required: true },
  end_ts: { type: SchemaTypes.Number, required: true },
});
const LogsAppSessions = model("logsappsessions", logAppSessionSchema)

export {LogsAppSessions}