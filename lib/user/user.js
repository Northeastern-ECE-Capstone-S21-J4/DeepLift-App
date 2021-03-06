import { sha256 } from "js-sha256";

export class User {
    
    constructor(username, password){
        this.userName = username;
        this.setPassword(password);
    }

    setPassword(password){
        if(password == "" || password == null){
            return null;
        } else {
            this.pw = sha256(password);
        }
    }

    setToken(token){
        this.token = token;
    }
}