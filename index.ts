
import express, { Application, Request, Response } from "express";
import cors from "cors";
import OpenAI from "openai"

const PORT: number = 8000
const API_KEY: string = '';

const app: Application = express();
app.use(cors());
app.use(express.json());

//init openai
const openai = new OpenAI({apiKey: API_KEY});


//create a route
app.post("/completions", async(req: Request, res: Response) => {

    try{
        //make the request to openai gpt
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {"role": "user", "content": "Create and SQL request to " + req.body.message}
            ]
        })

       res.status(200).send(completion.choices[0].message);

    }catch(error){
        console.log(error);
        res.status(500).send("SERVER ERROR");

    }

})



app.listen(PORT, () => {
    console.log("server running on port: ", PORT)
})