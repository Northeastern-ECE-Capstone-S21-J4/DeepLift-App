import  AsyncStorage  from "@react-native-community/async-storage";
import { APIHelper } from "../api/api";
import { User } from "./user";

export class Session {
    constructor(apiURL="https://api.deepliftcapstone.xyz"){//"http://127.0.0.1:8000"){//
        this.apiInstance = new APIHelper(apiURL);
        this.user = new User();
    }

    async saveSessionVar(key, val){
        try{
            await AsyncStorage.setItem(key, val);
        }catch(error){
            console.log(`Error writing '${key}' to storage`);
            console.log(error);
        }
    }

    async saveToken(){
        this.saveSessionVar('api:token', this.apiInstance.token);
    }

    async saveUserName(){
        this.saveSessionVar('user:userName', this.user.userName);
    }

    async savePW(){
        this.saveSessionVar('user:pw', this.user.pw);
    }

    async saveAllSessionVars(){
        this.saveToken();
        this.saveUserName();
        this.savePW();
    }

    async loadSessionVar(key){
        //If the key includes api, it should be sent to apiInstance
        if(key.includes("api")){
            try{
                return AsyncStorage.getItem(key).then(val =>
                    this.apiInstance[key] = val
                    )
            }catch(error){
                console.log(`Error loading session variable '${key}'`);
                console.log(error);
            }
        } else { // Otherwise it goes to user
            try{
            
                return AsyncStorage.getItem(key).then(val =>
                    this.user[key.substring(5)] = val
                    )
            }catch(error){
                console.log(`Error loading session variable '${key}'`);
                console.log(error);
            }
        }
    }

    async loadAllSessionVars(){
        //Get all the keys then loop through
        var keys = await AsyncStorage.getAllKeys()
        for (let key = 0; key < keys.length; key++){
            await this.loadSessionVar(keys[key]);
        }
    }

    async wipeSessionVars(){
        try {
            let keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            console.log("Error wiping session variables");
            console.log(error);
        }
    }

    async checkLogin(){ //Checks if a login is needed
        if(this.user.userName == null || this.user.pw == null){
            console.log("Login needed");
            return true;
        } else if(this.apiInstance.token == null){
            await this.login(); //If there is a username and password attempt to get a token
            if(this.apiInstance.token == null){
                //If no token is set after calling login, a login is still needed
                return true;
            }
            return false;
        }
    }

    getToken(){
        return this.apiInstance.token;
    }

    getUserName(){
        return this.user.userName;
    }

    setUserName(userName){
        this.user.userName = userName;
        this.saveUserName();
    }

    setPW(pw){
        this.user.pw = pw;
        this.savePW();
    }

    setToken(token){
        this.apiInstance.token = token;
        this.saveToken();
    }

    async login(){
        let token = await this.apiInstance.login(this.user)
        //If the token is an object it's a valid response, 
        // otherwise it will just return an error code
        if (typeof(token) == "object"){
            this.setToken(token["access_token"]);
            this.saveAllSessionVars();
            return 200;
        } else {
            //If it's not a valid token, return the error code
            return token;
        }
    }

    
} 