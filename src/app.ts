import router  from "./controllers/user.controller";
import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true,}));

app.use("/", router);
app.listen(port, () => {console.log(`App listening on port ${port}`)});