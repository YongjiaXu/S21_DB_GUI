import axios from 'axios';

export class NPORepository{
    url = 'http://localhost:8000';

    config = {};

        // get all the flagged reviews
        getNPO(npoID) {
            return new Promise((resolve, reject) => {
                axios.get(`${this.url}/npos/${npoID}`, this.config)
                    .then(x => resolve(x.data))
                    .catch(e => {
                        alert("catch error when getting npo");
                        reject();});
            });
        }

        getNPOS(){
            return new Promise((resolve, reject) => {
                axios.get(`${this.url}/npos`, this.config)
                    .then(x => resolve(x.data))
                    .catch(error => {
                        alert(error);
                        reject(error);
                    });
            }); 
        }

        getGallery(npoID) {
            return new Promise((resolve, reject) => {
                axios.get(`${this.url}/npos/${npoID}/images`, this.config)
                    .then(x => resolve(x.data))
                    .catch(e => {
                        alert("catch error when getting npo");
                        reject();});
            });
        }

        updateDescription(npoID, description) {
            return new Promise((resolve, reject) => {
                axios.put(`${this.url}/npos/${npoID}/updateDescription`, 
                {
                    "description": description
                }, this.config)
                    .then(x => resolve(x.data))
                    .catch(error => {
                        alert(error);
                        reject(error);
                    });
            });
        }
        
        updateLocation(npoID, location)
        {
            return new Promise((resolve, reject) => {
                axios.put(`${this.url}/npos/${npoID}/updateLocation`,
                {
                    "location": location
                },this.config)
                    .then(x => resolve(x.data))
                    .catch(error => {
                        alert(error);
                        reject(error);
                    });
            });
        }

        
        updateLogo(npoID, logoURL)
        {
            console.log(npoID);
            console.log(logoURL);
            debugger;
            return new Promise((resolve, reject) => {
                axios.put(`${this.url}/npos/${npoID}/updateLogo`,
                {
                    "logoURL": logoURL
                },this.config)
                    .then(x => resolve(x.data))
                    .catch(error => {
                        alert(error);
                        reject(error);
                    });
            });
        }
}