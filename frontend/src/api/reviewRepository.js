import axios from 'axios';

export class ReviewRepository{
    url = 'http://localhost:8000';

    config = {};

        // get all the flagged reviews
        getFlagged(params) {
            return new Promise((resolve, reject) => {
                if (params) {
                    let config = this.config;
                    config.params = params;
                }
                axios.get(`${this.url}/flagged`, this.config)
                    .then(x => resolve(x.data))
                    .catch(e => {
                        alert("catch error when getting flagged reviews");
                        reject();});
            });
        }

        getReviews(npoID) {
            return new Promise((resolve, reject) => {
                axios.get(`${this.url}/ratings/${npoID}`, this.config)
                    .then(x => resolve(x.data))
                    .catch(e => {
                        alert("catch error when getting npo");
                        reject();});
            });
        }

        flagToggle(ratingID){
            return new Promise((resolve, reject)=>{
                axios.put(
                    `${this.url}/ratings/${ratingID}/toggleFlag`,
                )
                .catch(error=>alert(error));
            });

        }

        deletePost(ratingID){
            return new Promise((resolve, reject)=>{
                axios.delete(
                    `${this.url}/reviews/${ratingID}`,
                )
                .catch(error=>alert(error));
            });
        }


        postReview(raterID,rating,comment,npoID){
            //hard coding date for now
            let fulldate = new Date().toString();
            let date = "2021-04-24";
            let flag = 0;
            console.log(date);
            return new Promise((resolve, reject)=>{
                axios.post(
                    `${this.url}/postit/review?rating=${rating}&raterID=${raterID}&flagged=${flag}&comment=${comment}&npoID=${npoID}&ratingDate=${date}`, 
                    this.config)
                .catch(error=>alert(error));
            });
        }

}