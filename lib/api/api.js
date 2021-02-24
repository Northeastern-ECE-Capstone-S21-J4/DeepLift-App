
export class APIHelper {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.token = null;
    }

    get(endpoint, handlerFunction=this.logData) {
        return fetch(this.baseUrl + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            }
        }).then(response => response.json())
        .then((data) => {
            handlerFunction(data);
        })
    }

    logData(data){
        console.log(data);
    }

    async post(endpoint, data, handlerFunction=this.logData) {
        fetch(this.baseUrl + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + this.token
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then((responseJSON) => {
            handlerFunction(responseJSON)
        });

    }

    setToken(token) {
        this.token = token;
    }

    getToken(username, password) {
        var url = this.baseUrl + `/token/${username}/${password}`;
        return fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => response.json())
        .then((data) => {
            this.setToken(data["access_token"]);
        });
    }

    getUsers(handlerFunction=this.logData) {
        return this.get("/users", handlerFunction=handlerFunction);
    }

    getUserByUsername(username, handlerFunction=this.logData){
        return this.get(`/users/${username}`, handlerFunction=handlerFunction);
    }

    getWorkoutById(workoutID, handlerFunction=this.logData){
        return this.get(`/workouts/${workoutID}`, handlerFunction=handlerFunction);
    }

    getUserWorkouts(username, handlerFunction=this.logData){
        return this.get(`/workouts/user/${username}`, handlerFunction=handlerFunction);
    }

    getUserExerciseById(username, exerciseID, handlerFunction=this.logData){
        return this.get(`/workouts/user/${username}/ex/${exerciseID}`, handlerFunction=handlerFunction);
    }

    getUserWorkoutsByDate(username, date, handlerFunction=this.logData){
        return this.get(`/workouts/user/${username}/date/${date}`, handlerFunction=handlerFunction);
    }

    getExercises(handlerFunction=this.logData){
        return this.get(`/exercises`, handlerFunction=handlerFunction);
    }

    createUser(userJSON, handlerFunction=this.logData){
        return this.post('/users', userJSON, handlerFunction=handlerFunction)
    }

    createWorkout(username, workoutJSON, handlerFunction=this.logData){
        return this.post(`/workouts/${username}`, workoutJSON, handlerFunction=handlerFunction);
    }
}

