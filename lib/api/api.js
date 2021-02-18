
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

    async post(url, data) {
        fetch(url, {
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + this.token
            },
            body: JSON.stringify(data)
        });

        const content = await rawResponse.json();

        console.log(content);

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
        return this.get("/users");
    }

    getUserById(userID, handlerFunction=this.logData){
        return this.get(`/users/${userID}`);
    }

    getWorkoutById(workoutID, handlerFunction=this.logData){
        return this.get(`/workouts/${workoutID}`);
    }

    getUserWorkouts(userID, handlerFunction=this.logData){
        return this.get(`/workouts/user/${userID}`);
    }

    getUserExerciseById(userID, exerciseID, handlerFunction=this.logData){
        return this.get(`/workouts/user/${userID}/ex/${exerciseID}`);
    }

    getUserWorkoutsByDate(userID, date, handlerFunction=this.logData){
        return this.get(`/workouts/user/${userID}/date/${date}`);
    }

    getExercises(handlerFunction=this.logData){
        return this.get(`/exercises`);
    }
}

