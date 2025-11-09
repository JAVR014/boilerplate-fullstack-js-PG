import Express from "express";

const app=Express()

app.use(Express.json())

app.get("/", (req,res)=>res.status(200).send({message:"Hello World"}))

export default app