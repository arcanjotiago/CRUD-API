import { Router, Request, Response} from "express";
import pool from "./pg";

const router = Router();

interface User{
    id:number;
    name:string;
    enable:boolean;
}


router.get("/", (req: Request, res: Response) => {res.send("list users.app is working!");})

router.get("/users", async (req: Request, res: Response) => {
    try {
      const result = await pool.query("SELECT * FROM users");
      const users:User[] = result.rows;
      res.json(users);
    } catch (error) {
      console.error("Error fetching users", error);
      res.status(500).json({ error: "Error fetching listusers" });
    }
  });

router.post("/users", async (req: Request, res: Response) => {
    const {user} = req.body;

    // TypeScript type-based input validation
    if (typeof user !== "string" || user.trim() === "") {
        return res.status(400).json({ error: "Invalid task data" });
    }
    
    try {
    const result = await pool.query(
        "INSERT INTO users (user) VALUES ($1) RETURNING *",
        [user]
    );
    const createdUser:User = result.rows[0];
    res.status(201).json(createdUser);
    } catch (error) {
    console.error("Error adding user", error);
    res.status(500).json({ error: "Error adding user" });
    }
});

router.delete("/users/:id", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
 
    // TypeScript type-based input validation
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user id" });
    }
 
    try {
      await pool.query("DELETE FROM users WHERE id = $1", [userId]);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error deleting user", error);
        res.status(500).json({ error: "Error deleting user" });
    }
  });
 

 
