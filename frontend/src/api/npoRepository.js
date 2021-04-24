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
                        alert("catch error when getting npo images");
                        reject();});
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
}