
export class APIHelper {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.token = null;
    }

    getRequest(endpoint) {
        return fetch(this.baseUrl + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            }
        }).then(response => response.json())
        .then((data) => {
            console.log(data);
        })
    }

    async postRequest(url, data) {
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
}

