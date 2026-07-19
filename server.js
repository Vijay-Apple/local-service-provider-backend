import express from "express";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import routes from "./src/routes/index.js"
import cors from "cors";

dotenv.config()

const app = express();

app.use(cors())
// app.use(
//     cors({
//         origin: [
//             // "http://localhost:5173",
//             "https://local-service-provider-dun.vercel.app"
//         ],
//         credentials: true,
//     })
// );
app.use(express.json())

connectDB();

app.use("/api/v1", routes);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("your Application is runing on port : " + port))