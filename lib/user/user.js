import { sha256 } from "js-sha256";

export class User {
    
    constructor(username, password){
        this.userName = username;
        this.pw = sha256(password);
    }

    setPassword(password){
        this.pw = password;
    }

    setToken(token){
        this.token = token;
    }
}