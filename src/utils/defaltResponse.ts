export class DefaltResponse{
    constructor(status:number, message:string, additionalData?:any){
        this.status = status;
        this.message = message;
    }
    status:number;
    message:string;
    additionalData?:any;
}