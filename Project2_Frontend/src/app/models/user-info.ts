export class UserInfo {
    userId: number;
    username: string;
    userRole: string;
    userToken: string;

    constructor(userId: number, username: string, userRole: string, userToken:string){
        this.userId = userId;
        this.username = username;
        this.userRole = userRole;
        this.userToken = userToken;
    }
}
