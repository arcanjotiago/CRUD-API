import {User} from "../interfaces/user";
import pool from "../database/db-util";
import {v4 as uuidv4} from 'uuid';
import { DefaltResponse } from "../utils/response-util";

export class UserService{
    
    private async querySearch(param:string, value:string){
        const queryDb = await pool.query(`SELECT ${param} FROM users`);
        const queryResult:any[] = queryDb.rows;
        const queryResultParameter:string[] = [''];
        
        for(let i = 0; i < queryResult.length; i++){
            queryResultParameter[i] = queryResult[i][param];
        } 
        if((queryResultParameter.includes(value)) === true){
            return true;
        }
        return false
    };

    async getUser(){
        let responseRouter = new DefaltResponse(200, '', {})
        const result = await pool.query("SELECT * FROM users");
        const users:User[] = result.rows;

        try {
            responseRouter.status = 200;
            responseRouter.message = 'Check the list of users bellow:';
            responseRouter.additionalData = users;
            return responseRouter;
          } 
          
          catch (error) { 
            throw new Error("Error get users from database");  
          }
    };

    async getUserById(userId:string){
        let responseRouter = new DefaltResponse(200, '', {})
        
        try {
            if (userId == ':id') {
                responseRouter.status = 400;
                responseRouter.message = "Error: The user id do not be empty!";
                
                return responseRouter;
            } 

            const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);

            if (result.rowCount == 0){
                responseRouter.status = 400;
                responseRouter.message = "Error: The id informed was not found on database!";

                return responseRouter;
            }

            const users:User[] = result.rows;
            
            responseRouter.status = 200;
            responseRouter.message = 'Check the user bellow:';
            responseRouter.additionalData = users;
    
            return responseRouter;

        } catch (error) { 
            throw new Error("Error get users from database");
        };
    };

    async createUser(user:User){
        let responseRouter = new DefaltResponse(200, '', {})
        const errors:string[] = [];
        const querySearchEmail = await this.querySearch('email', user.email);

        if(querySearchEmail === true){
            errors.push("Error: The Email entered already register!");
        }
    
        if (typeof user.name != "string" || user.name.length < 3) {
            errors.push("Error: The name must have 3 or more characters!");
        }
    
        if (typeof user.password != "string" || user.password.length < 5) {
            errors.push("Error: The password informed does not meet the requirements! The password must to have five or more characters!");
        }
        if (errors.length > 0){
            responseRouter.status = 400;
            responseRouter.message = 'Error!';
            responseRouter.additionalData = errors;
            return responseRouter;
        }

        try {
            const getId = uuidv4();
            const dateTime = new Date().toISOString();
            const insertUser = await pool.query(
                `INSERT INTO users (id, name, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [getId, user.name, user.email, user.password, dateTime]);
            const createdUser:User = insertUser.rows[0];
                
            responseRouter.status = 201;
            responseRouter.message = 'User created!';
            responseRouter.additionalData = createdUser;
            return responseRouter;
        } 
     
        catch (error) {
            throw new Error("Error adding user!");
        }
    };

    async deleteUser(userId:string){
        let responseRouter = new DefaltResponse(200, '', {})
        const querySearchId = await this.querySearch('id', userId);

        if (userId === ':id') {
            responseRouter.status = 400;
            responseRouter.message = "Error: The user id do not be empty!";
            responseRouter.additionalData = {};
            return responseRouter;
        } 

        if(querySearchId === false){
            responseRouter.status = 400;
            responseRouter.message = `Error: The id entered don't exist in the list!`;
            responseRouter.additionalData = userId;
            return responseRouter;
        }
     
        try {
            await pool.query("DELETE FROM users WHERE id = $1", [userId]);
            responseRouter.status = 200;
            responseRouter.message = `The user informed has been deleted!`;
            responseRouter.additionalData = `userId: ${userId}`;
            return responseRouter;
        } 
        catch (error) {
            throw new Error("Error deleting user");
        }
    }

    async updateUser(userId:string, userData:any){
        let responseRouter = new DefaltResponse(200, '', {})
        const errors:string[] = [];
        const querySearchId = await this.querySearch('id', userId);

        if (userId === ':id') {
            errors.push("Error: The user id do not be empty!");
        } 
        if(userId != ':id' && querySearchId === false){
            errors.push(`Error: The id entered don't exist in the list!`);
        }
        if (userData.hasOwnProperty('name') === false || userData.hasOwnProperty('password') === false) {
            errors.push("Error: Inform a name and password in parameters!");
        }
        if (typeof userData.name != "string" || userData.name.length < 3) {
            errors.push("Error: The name must have 3 or more characters!");
        }
        if (typeof userData.password != "string" || userData.password.length < 5) {
            errors.push("Error: The password informed does not meet the requirements! The password must to have five or more characters!");
        }
        if (errors.length > 0){
            responseRouter.status = 400;
            responseRouter.message = 'Error!';
            responseRouter.additionalData = errors;
            return responseRouter;
        }

        try {
            await pool.query(`UPDATE users SET name = $2, password = $3  WHERE id = $1`, [userId, userData.name, userData.password]);
            
            responseRouter.status = 200;
            responseRouter.message = `Sucessful: The user informed has been updated!`;
            responseRouter.additionalData = userData;
            return responseRouter;
        } 
        catch (error) {
            throw new Error("Error updating user");
        }
    }
}