// create express app on port 3001
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import openAiRouter from "./routes/openai/index.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/openai", openAiRouter);
app.listen(3001, () => {
    console.log("Express server started on port 3001");
});
