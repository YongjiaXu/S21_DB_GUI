import React from 'react'
import { Rating } from './models/rating';
import { NPORepository } from '../api/npoRepository';
import {ReviewRepository} from '../api/reviewRepository'
import {UserRepository} from '../api/userRepository'

import {Npo} from './models/npo';
import {styles} from './card-theme.css';

export class NPODashboard extends React.Component
{
    npoRepo = new NPORepository();
    reviewRepo = new ReviewRepository();
    userRepo = new UserRepository();

    state = {
        npo:[],
        gallery:[],
        reviews:[],
        users:[]
    };

    componentDidMount() {
            let id = +this.props.match.params.id;
            if (id) {
                this.npoRepo.getNPO(id)
                .then(npo => { 
                    this.setState({npo})
                 });
                 this.npoRepo.getGallery(id)
                 .then(gallery=>{
                     this.setState({gallery})
                 });
                 this.userRepo.getUsers()
                 .then(users=>{
                     this.setState({users})
                });
                 this.reviewRepo.getReviews(id)
                 .then(reviews=>{
                     this.setState({reviews})
                 });
            }
    }

    calculateAverageRating(){
        let averageRate = 0;
        for(let i = 0; i < this.state.reviews.length; ++i)
        {
            averageRate += this.state.reviews[i].rating;
        }
        averageRate /= this.state.reviews.length;
        return averageRate;
    }

    username(raterID){
        let result = this.state.users.find(({userID})=> userID===raterID);
        return result.username;
    }

    render (){
        return(
            <>
            <div className='container'>
            {this.state.npo.map((x,i)=>
            <div key={i} className='container'>
                <div className='card'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col-6'>
                                <h1>{x.title}</h1>
                            </div>
                            <div className='col-6'>
                                <h1 className="float-right">
                                    <button type='button' 
                                    className="btn btn-success"> 
                                        Home 
                                    </button> 
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='card'>
                                    <div className='card-header'>
                                    <h2> Change Password </h2>
                                    </div>
                                    <div className='card-body'>
                                    <p>
                                        **Password must contain at least one uppercase and
                                        one lowercase letter, a number, a special symbol, other
                                        generic disclaimer
                                    </p>
                                    <p>
                                        New Password: <br/>
                                        <input id='newPass' type='text' className='form-control'></input>
                                    </p>
                                    <p>
                                        Confirm New Password: <br/>
                                        <input id='newPassConfirm' type='text' className='form-control'></input>
                                    </p>
                                    <button type='button' className="btn btn-success">Submit</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='card'>
                                <div className='card-header'>
                                <h2> Change Logo </h2>
                                </div>
                                <div className='card-body'>
                                <img src={x.logoURL}
                                alt="Logo"
                                className='logo'></img>
                                <br/>
                                <input type='file' className='form-control-file'></input>
                                </div>
                                </div>
                            </div>
                        </div>

                        <br/><br/>

                        <div className='row'>
                            <div className='col-6'>
                                <div className='card'>
                                <div className='card-header'>
                                <h2> Edit Description </h2>
                                </div>
                                <div className='card-body'>
                                <p>
                                    New Description: <br/>
                                    <textarea className='form-control' id='newDescription' rows='7'></textarea>
                                </p>
                                <button type='button' className="btn btn-success"> Save Changes </button>
                                </div>
                                </div>
                            </div>
                            <div className='col-6'>
                            <div className='card'>
                            <div className='card-header'>
                                <h2> Change Location </h2>
                            </div>
                            <div className='card-body'>
                                <p>
                                    New Location: <br/>
                                    <input id='newLocation' type='text' className='form-control'></input>
                                </p>
                                <button type='button' className="btn btn-success"> Save Changes </button>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className='card'>
                        <div className='card-header'>
                        <h2> Add Images </h2>
                        </div>
                        <div className='card-body'>
                        <p>
                            {this.state.gallery.map((x,i)=>
                            <img key={i} src={x.imageURL}
                            alt="Image"
                            className='extraImages'>
                            </img>
                            )}
                        </p>
                        <p>
                            Add Image
                            <input id='newImage' type='file' className='form-control-file'></input>
                        </p>
                        <button type='button' className="btn btn-success"> Save Changes </button>
                        </div>
                        </div>



                        <div className='row'>
                            <div className='col-6'>
                                <h2>Ratings</h2>
                            </div>
                            <div className='col-6'>
                                <h2 className='float-right'>
                                    Average Rating: <Rating value = {this.calculateAverageRating()}/>
                                </h2>
                            </div>
                        </div>
                        <div className='row'>
                            {this.state.reviews.map((x,i)=>
                            <div key={i} className="card">
                                    <div className='card-header'>
                                        <Rating value = {x.rating}/>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-10'>{this.username(x.raterID)}</div>
                                            <div className='col-2'>{x.ratingDate.toString().substring(0,10)}</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-10'>{x.comment}</div>
                                            <div className="col-2">
                                                <button type="button" className="btn btn-danger">Flag</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>
                )}
                </div>
            </>
        )
    }
}