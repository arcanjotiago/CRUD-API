import {usersRoutes}  from "./routes";
import { DefaltResponse } from "./defaltResponse";
import express from 'express';
import { Request, Response } from 'express';
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));

app.use("/", usersRoutes);
app.listen(port, () => {console.log(`App listening on port ${port}`)});


router.get("/", (req: Request, res: Response) => {res.send("The users.app is working!");})










// res.status(400).json(emailResponse);