import { Router, Request, Response} from "express";
import { DefaltResponse } from "./defaltResponse";
import { MakeListID } from "./MakeListID";
import pool from "./pg";

const router = Router();
interface User{
    id:string;
    name:string;
    enable:boolean;
}


router.get("/", (req: Request, res: Response) => {
    const responseStatus = new DefaltResponse("list users.app is working!", 200)
    res.send(responseStatus);
})


router.get("/users", async (req: Request, res: Response) => {
    
    try {
      const result = await pool.query("SELECT * FROM users");
      const users:User[] = result.rows;
      const responseListUsers = new DefaltResponse(users, 200);
      res.json(responseListUsers);
    } 
    
    catch (error) {
        console.error("Error fetching users", error);
        const responseListUsersError = new DefaltResponse("Error: Error fetching users!", 500);
        res.status(500).json(responseListUsersError);
    }
});


router.post("/users", async (req: Request, res: Response) => {
    const user:User = req.body;
    const queryUsersID = await pool.query("SELECT id FROM users");
    const makelistIDS = new MakeListID();
    const listIDS = makelistIDS.mountList(queryUsersID);

    const errors:string[] = [];

    if((listIDS.includes(user.id)) === true){
        errors.push("Error: The id entered already exist in the list!");
    }
    
    if (typeof user.id != "string" || user.id.length < 1) {
        errors.push("Error: identifier not defined or empty!");
    }
    
    if (typeof user.name != "string" || user.name.length < 3) {
        errors.push("Error: The name parameter must have 3 or more characters!");
    }
    
    if (typeof user.enable != 'boolean') {
        errors.push("Error: The enable parameter must be boolean!");
    }

    if (errors.length){
        const responseAddUser = new DefaltResponse(errors, 400)
        return res.status(400).json(responseAddUser);
    }
   

    try {
    const result = await pool.query(
        `INSERT INTO users (id, name, enable) VALUES ($1, $2, $3) RETURNING *`, [user.id, user.name, user.enable]);

        const createdUser:User = result.rows[0];
        const responseAddUser = new DefaltResponse(`user ${createdUser.name} added successfully`, 201)
        return res.status(201).json(responseAddUser);
    } 
    
    catch (error) {
        const catchError = console.error("Error adding user", error);
        const responseAddUser = new DefaltResponse(catchError, 500)
        res.status(500).json(responseAddUser);
    }
});


router.delete("/users/:id", async (req: Request, res: Response) => {
    const userId:string = (req.params.id).toString();
    const queryUsersID = await pool.query("SELECT id FROM users");
    const makelistIDS = new MakeListID();
    const listIDS = makelistIDS.mountList(queryUsersID);
    
    if (userId === ':id') {
        const responseDeleteUser = new DefaltResponse("Error: The user id do not be empty!", 400)
        return res.status(400).json(responseDeleteUser);
    }else 
        if((listIDS.includes(userId)) === false){
            const responseDeleteUser = new DefaltResponse("Error: the id entered does not exist in the list!", 400)
            return res.status(400).json(responseDeleteUser);
        }
 
    try {
      await pool.query("DELETE FROM users WHERE id = $1", [userId]);
        const responseDelete = new DefaltResponse('deleting user sucessful!', 200);
        res.status(200).json(responseDelete);
    } catch (error) {
        console.error("Error deleting user", error);
        res.status(500).json({ error: "Error deleting user" });
    }
  });

 
router.put("/users/:id", async (req: Request, res: Response) => {
    const user = req.body.id;
    const userId = req.params.id.toString();
    const queryUsersID = await pool.query("SELECT id FROM users");
    const makelistIDS = new MakeListID();
    const listIDS = makelistIDS.mountList(queryUsersID);


    if (userId === ':id' || user === '') {
        const responseDeleteUser = new DefaltResponse("Error: The user id do not be empty!", 400)
        return res.status(400).json(responseDeleteUser);
    }else
    if((listIDS.includes(userId)) === false){
        const responseAddUser = new DefaltResponse("Error: The id entered does not exist in the list!", 400)
        return res.status(400).json(responseAddUser);
    }
 

    try {
        await pool.query("UPDATE users SET id = $1 WHERE id = $2", [
            user,
            userId,
        ]);
        const responseUpdate = new DefaltResponse('update user sucessful!', 200);
        res.status(200).json(responseUpdate);
    } catch (error) {
      console.error("Error updating user", error);
      res.sendStatus(500).json({ error: "Error updating user" });
    }

  });
 

export default router;