import axios from "axios";

export class UserRepository {
    url = 'http://localhost:8000';
    // url = 'http//3.21.114.143:8000'; // switch to cloud once pulled
    config = {};

    // get all the users
    getUsers(params) {
        return new Promise((resolve, reject) => {
            if (params) {
                let config = this.config;
                config.params = params;
            }
            axios.get(`${this.url}/getit/users`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert("catch error when getting users");
                    reject();});
        });
    }


    getUsername(id){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getit/username/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert("User does not exist!.");
                reject();
            });
        });
    }


    // get specific user by username
    getUser(username) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getit/user?username=${username}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert("User does not exist!.");
                reject();
            });
        });
    }

    // login
    login(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/postit/login`,
                {
                    "username": username,
                    "password": password,
                }
                , this.config)
                .then(x => {
                    console.log('logged in');
                    resolve(x.data);
                })
                .catch(e => {
                alert("can't find user");
                reject();
            });
        });
    }
    
    
    register(username,email, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/postit/register`,
                {
                "username": username,
                "password": password,
                }
                , this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert("Register Failed.");
                reject();
            });
        });
    }

    // post new npo
    createNPO(title, location, logoURL, description) {
        return new Promise((resolve, reject) => {
            axios.post(
                `${this.url}/npos`,
                {
                    "title": title,
                    "location": location,
                    "logoURL": logoURL,
                    "description": description,
                },
            )
            .then(response => resolve(response.data))
            .catch(error => alert(error));
        });
    }

    changePW(username,pw){
        return new Promise((resolve, reject)=>{
            axios.put(
                `${this.url}/userpwd`,
                {"username":username,
                 "newpwd": pw},
            )
            .catch(error=>alert(error));
        });

    }

}