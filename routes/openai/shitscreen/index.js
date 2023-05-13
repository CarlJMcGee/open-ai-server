// create express router for route /shitscreen
import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";
const shitScreenRouter = Router();
shitScreenRouter.get("/", (req, res) => {
    res.send("This is the Shit Screen route");
});
shitScreenRouter.get("/coolcat", async (req, res) => {
    const headers = req.headers;
    if (headers.authorization !== "this is a very super secret password") {
        return res.status(500).send("Unauthorized");
    }
    const aiConfig = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const ai = new OpenAIApi(aiConfig);
    try {
        const aiRes = await ai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are Cool Cat from the movie 'Cool Cat Saves the Kids' by Derek Savage",
                },
                { role: "user", content: "Hey Cool Cat, say something new." },
            ],
            max_tokens: 500,
            temperature: 0.7,
            n: 3,
        });
        const coolCat = aiRes.data.choices[0].message.content;
        res.send(coolCat);
    }
    catch (err) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
});
export default shitScreenRouter;
