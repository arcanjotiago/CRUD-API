import {UserService} from '../services/user.service';
import { DefaltResponse } from '../utils/response-util';
import {User} from "../interfaces/user";
import { Router, Request, Response} from "express";
const router = Router();

router.get("/status", (req: Request, res: Response) => {
    const responseRouter = new DefaltResponse(200, "list users.app is working!", {})
    res.send(responseRouter);
})


router.get("/users", async (req: Request, res: Response) => {
    const userService = new UserService();
    const result = await userService.getUser();
    
    res.json(result);   
});


router.post("/users", async (req: Request, res: Response) => {
    const user:User = req.body;
    const userService = new UserService();
    const result = await userService.addUser(user);
    
    if (result.status === 400){
        return res.status(400).json(result);
    }
    res.status(201).json(result); 
});


router.delete("/users/:id", async (req: Request, res: Response) => {
    const userId:string = (req.params.id).toString();
    const userService = new UserService();
    const result = await userService.deleteUser(userId);
    
    if (result.status === 400){
        return res.status(400).json(result);
    }
    res.status(200).json(result); 
});

 
router.put("/users/:id", async (req: Request, res: Response) => {
    const userData = req.body;
    const userId = req.params.id.toString();
    const userService = new UserService();
    const result = await userService.updateUser(userId, userData);

    if (result.status === 400){
        return res.status(400).json(result);
    }
    res.status(200).json(result); 
  });

export default router;