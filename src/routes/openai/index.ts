// create express js router
import express from "express";
import testRouter from "./testing/index.js";
import shitScreenRouter from "./shitscreen/index.js";

const openAiRouter = express.Router();

openAiRouter.use("/testing", testRouter);
openAiRouter.use("/shitscreen", shitScreenRouter);

export default openAiRouter;
