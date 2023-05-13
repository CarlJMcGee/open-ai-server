// create express router at route /testing

import { Router } from "express";
import { OpenAIApi, Configuration } from "openai";

const testRouter = Router();

testRouter.get("/", async (req, res) => {
  const headers = req.headers;
  if (headers.authorization !== "this is a very super secret password") {
    return res.status(401).send("Unauthorized");
  }
  const { prompt } = req.body as { prompt: string };

  try {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(config);
    const body = {
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 2500,
    };
    const response = await openai.createCompletion(body);

    if (response.status !== 200) {
      res.status(response.status).send("sadge :(");
    }

    res.status(response.status).send(response.data.choices[0].text);
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
});

export default testRouter;
