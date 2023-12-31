import cors from "cors"
import * as dotenv from "dotenv"
import express from "express"

import connectDB from "./mongodb/connect.js"
import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"

dotenv.config()

const app = express()
app.use(express.json({ limit: "50mb" }))
app.use(cors());
app.options('*', cors());

app.use("/api/v1/post", postRoutes)
app.use("/api/v1/dalle", dalleRoutes)

app.get("/", async (req, res) => {
     res.send("hello world")
})

const startServer = async () => {
     try {
          connectDB(process.env.MONGODB_URL)
          app.listen(8080, () => console.log("Server started on https://midjourney-2-0.onrender.com"))
     } catch (error) {
          console.log(error);
     }
}

startServer()
