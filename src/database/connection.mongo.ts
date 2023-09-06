import { connect } from "mongoose";
const initiateDB = async () => {
  console.log("Db", process.env.MONGO_URL);
  const connectionString = process.env.MONGO_URL;
  if (connectionString) {
    await connect(connectionString);
    console.log("Connected to mongodb");
  } else {
    throw new Error("Please provide a valid connection string!");
  }
};
export { initiateDB };
