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

        getNANPOS(){
            return new Promise((resolve, reject) => {
                axios.get(`${this.url}/npos/notApproved`, this.config)
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
                        alert("catch error when getting npo images");
                        reject();});
            });
        }

        approve(npoID){
            return new Promise((resolve, reject) => {
                axios.put(`${this.url}/npos/${npoID}/approve`, this.config)
                    .catch(e => {
                        alert("error approving npo");
                        reject();});
            });           
        }

        deny(npoID){
            return new Promise((resolve, reject) => {
                axios.delete(`${this.url}/deleteit/npos/${npoID}`, this.config)
                    .catch(e => {
                        alert("error approving npo");
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

        addImage(npoID, imageURL)
        {
            return new Promise((resolve, reject) => {
                axios.post(`${this.url}/npos/${npoID}/images`,
                {
                    "imageURL": imageURL
                },this.config)
                    .then(x => resolve(x.data))
                    .catch(error => {
                        alert(error);
                        reject(error);
                    });
            });
        }
}