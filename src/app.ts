import * as express from "express";
import { config } from "dotenv";
import { initiateDB } from "./database/connection.mongo";
const app = express();
config({ path: ".env.development" });
const PORT = process.env.PORT || 5000;
import authRouter from './router/auth.routes'
import userActRouter from "./router/user.routes"
app.use(express.json());


app.use("/api/auth", authRouter)
app.use('/api/user',userActRouter)


app.listen(PORT, async() => {
    console.log(`server started http://localhost:${PORT}`);
    await initiateDB()
});
