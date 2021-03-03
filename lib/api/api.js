
export class APIHelper {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.token = null;
    }

    ////////////////////////////////////////////////////
    // Requests
    ////////////////////////////////////////////////////
    async get(endpoint, handlerFunction=this.logData) {
        return fetch(this.baseUrl + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            }
        }).then(response => response.json())
        .then((responseJSON) => {
            handlerFunction(responseJSON);
        })
    }

    async post(endpoint, data, handlerFunction=this.logData) {
        return fetch(this.baseUrl + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + this.token
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then((responseJSON) => {
            handlerFunction(responseJSON);
        })
    }


    async put(endpoint, data, handlerFunction=this.logData) {
        return fetch(this.baseUrl + endpoint, {
            method: "PUT",
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

    async delete(endpoint, data=null, handlerFunction=this.logData){
        if(data != null){
            return fetch(this.baseUrl + endpoint, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.token
                },
                body: data
            }).then(response => response.json())
            .then((responseJSON) => {
                handlerFunction(responseJSON)
            });
        }
        return fetch(this.baseUrl + endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            }
        }).then(response => response.json())
        .then((responseJSON) => {
            handlerFunction(responseJSON)
        });
    }

    ////////////////////////////////////////////////////
    // Get Requests
    ////////////////////////////////////////////////////

    login(userJSON, handlerFunction=this.logData){
        return this.post(`/login`, userJSON, handlerFunction=handlerFunction)
    }

    getToken(userName, password) {
        var url = this.baseUrl + `/token/${userName}/${password}`;
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

    getUserByUsername(userName, handlerFunction=this.logData){
        return this.get(`/users/${userName}`, handlerFunction=handlerFunction);
    }

    getWorkoutById(workoutID, handlerFunction=this.logData){
        return this.get(`/workouts/${workoutID}`, handlerFunction=handlerFunction);
    }

    getUserWorkouts(userName, handlerFunction=this.logData){
        return this.get(`/workouts/user/${userName}`, handlerFunction=handlerFunction);
    }

    getUserExerciseById(userName, exerciseID, handlerFunction=this.logData){
        return this.get(`/workouts/user/${userName}/ex/${exerciseID}`, handlerFunction=handlerFunction);
    }

    getUserWorkoutsByDate(userName, date, handlerFunction=this.logData){
        return this.get(`/workouts/user/${userName}/date/${date}`, handlerFunction=handlerFunction);
    }

    getExercises(handlerFunction=this.logData){
        return this.get(`/exercises`, handlerFunction=handlerFunction);
    }

    ////////////////////////////////////////////////////
    // Post Requests
    ////////////////////////////////////////////////////
    createUser(userJSON, handlerFunction=this.logData){
        return this.post('/users', userJSON, handlerFunction=handlerFunction)
    }

    createWorkout(workoutJSON, handlerFunction=this.logData){
        return this.post(`/workouts`, workoutJSON, handlerFunction=handlerFunction);
    }


    ////////////////////////////////////////////////////
    // Put Requests
    ////////////////////////////////////////////////////
    updateUser(userJSON, handlerFunction=this.logData){
        return this.put(`/users/update`, userJSON, handlerFunction=handlerFunction);
    }

    updateWorkout(workoutJSON, handlerFunction=this.logData){
        return this.put(`/workouts/update`, workoutJSON, handlerFunction=handlerFunction);
    }


    ////////////////////////////////////////////////////
    // Delete Requests
    ////////////////////////////////////////////////////
    deleteUser(userName, handlerFunction=this.logData){
        return this.delete(`/users/delete/${userName}`, handlerFunction=handlerFunction);
    }

    deleteWorkout(workoutID, handlerFunction=this.logData){
        return this.delete(`/workouts/delete/${workoutID}`, handlerFunction=handlerFunction);
    }

    ////////////////////////////////////////////////////
    // Helper Functions
    ////////////////////////////////////////////////////
    logData(data){
        console.log(data);
    }

    setToken(token) {
        this.token = token;
    }

}

