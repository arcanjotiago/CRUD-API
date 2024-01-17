import router  from "./routes";
import express from 'express';
import { Request, Response } from 'express';
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));

app.use("/", router);
app.listen(port, () => {console.log(`App listening on port ${port}`)});

router.get("/", (req: Request, res: Response) => {res.send("The users.app is working!");})