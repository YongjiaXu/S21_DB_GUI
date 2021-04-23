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
}