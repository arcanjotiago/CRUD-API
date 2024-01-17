export class MakeListID{
    // constructor(queryResult:any){
    //     this.queryResult = queryResult;
    // }
    // queryResult:any;
    
    mountList(queryResult:any){
        const listUsersId:any[] = queryResult.rows;
        let responseListID:string[] = [''];
        
        for(let i = 0; i < listUsersId.length; i++){
            responseListID[i] = listUsersId[i].id;
        }
        return responseListID;
    }
}