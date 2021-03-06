
export class APIHelper {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.token = "";
        this.errorFlag = false;
        this.lastError = null;
    }

    ////////////////////////////////////////////////////
    // Requests
    ////////////////////////////////////////////////////
    async get(endpoint) {
        return fetch(this.baseUrl + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            }
        }).then(response => { return response.json() })
    }

    async post(endpoint, data) {
        return fetch(this.baseUrl + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + this.token
            },
            body: JSON.stringify(data)
        }).then(response => { 
            if(response.status == 200){
                return response.json() 
            }
            return response.status;
            })
        // .catch((error) => {
        //     this.handleError(error);
        // })
    }


    async put(endpoint, data) {
        return fetch(this.baseUrl + endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + this.token
            },
            body: JSON.stringify(data)
        }).then(response => { return response.json() })
        .catch((error) => {
            this.handleError(error);
        });
    }

    async delete(endpoint, data=null){
        if(data != null){
            return fetch(this.baseUrl + endpoint, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.token
                },
                body: data
            }).then(response => { return response.json() })
            .catch((error) => {
                this.handleError(error);
            })
        }
        return fetch(this.baseUrl + endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            }
        }).then(response => { return response.json() })
        .catch((error) => {
            this.handleError(error);
        })
    }

    ////////////////////////////////////////////////////
    // Get Requests
    ////////////////////////////////////////////////////

    login(userJSON){
        return this.post(`/login`, userJSON)
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

    getUsers(handler=this.logData) {
        return this.get("/users");
    }

    getUserByUsername(userName){
        return this.get(`/users/${userName}`);
    }

    getWorkoutById(workoutID){
        return this.get(`/workouts/${workoutID}`);
    }

    getUserWorkouts(userName){
        return this.get(`/workouts/user/${userName}`);
    }

    getUserExerciseById(userName, exerciseID){
        return this.get(`/workouts/user/${userName}/ex/${exerciseID}`);
    }

    getUserWorkoutsByDate(userName, date){
        return this.get(`/workouts/user/${userName}/date/${date}`);
    }

    getExercises(){
        return this.get(`/exercises`);
    }

    ////////////////////////////////////////////////////
    // Post Requests
    ////////////////////////////////////////////////////
    createUser(userJSON){
        return this.post('/users', userJSON)
    }

    createWorkout(workoutJSON){
        return this.post(`/workouts`, workoutJSON);
    }


    ////////////////////////////////////////////////////
    // Put Requests
    ////////////////////////////////////////////////////
    updateUser(userJSON){
        return this.put(`/users/update`, userJSON);
    }

    updateWorkout(workoutJSON){
        return this.put(`/workouts/update`, workoutJSON);
    }


    ////////////////////////////////////////////////////
    // Delete Requests
    ////////////////////////////////////////////////////
    deleteUser(userName){
        return this.delete(`/users/delete/${userName}`);
    }

    deleteWorkout(workoutID){
        return this.delete(`/workouts/delete/${workoutID}`);
    }

    ////////////////////////////////////////////////////
    // Helper Functions
    ////////////////////////////////////////////////////
    logData(data){
        console.log(data);
    }

    handleError(err){
        this.lastError = err;
        this.errorFlag = true;
    }

    checkError(){
        if (this.errorFlag) {
            this.errorFlag = false
            return true
        }
        return false
    }

    setToken(token) {
        this.token = token;
    }

}

