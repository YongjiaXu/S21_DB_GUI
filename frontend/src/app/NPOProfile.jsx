import React from 'react'
import { Rating } from './models/rating';
import {NPORepository} from '../api/npoRepository'
import {ReviewRepository} from '../api/reviewRepository'
import {styles} from './card-theme.css';

export class NPOProfile extends React.Component
{
    npoRepo = new NPORepository();

    reviewRepo = new ReviewRepository();

    state = {
        userName: '',
        rating: '',
        comment: '',
        npo:[],
        gallery:[],
        reviews:[],
        averageRating: 0
    };

    onSubmitClick() {
        this.props.onReviewAdded(this.state);

        this.setState({
            userName: '',
            rating: '',
            comment: ''
        });
    }

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
            console.log(averageRate);
            debugger;
        }
        averageRate /= this.state.reviews.length;
        return averageRate;
    }

    render (){
        return(
            <>
            <div className="container">
              {this.state.npo.map(x=>               
                <div class="card">
                    <div class="card-header">
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

                    <div class="card-body">
                        <div class="row">
                            <div class="col-4">
                                <img src={x.logoURL}
                                alt="Company Logo"
                                className='profileLogo'>
                                </img>
                            </div>

                            <div class='col-8'>
                            <div className='card'>
                            <div className='card-header'>
                                <h2> Location: {x.location}</h2>
                            </div>
                            <div className='card-body'>
                                <br/>
                                <p>
                                    {x.description}
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>

                        <br/>

                        <div className='card'>
                            <div className='card-header'>
                                <h2> Image Gallery </h2>
                            </div>
                            <div className='card-body'>
                                {this.state.gallery.map((x,i)=>
                                    <img key={i} src={x.imageURL}
                                    alt="Image" 
                                    className='extraImages'>
                                    </img>
                                )}
                            </div>
                        </div>

                        <div class='row'>
                            <div class='col-6'>
                                <h2>Ratings</h2>
                            </div>
                            <div class='col-6'>
                                <h2 className='float-right'>
                                    Average Rating: <Rating value = {this.calculateAverageRating()}/>
                                </h2>
                            </div>
                        </div>

                        <div class="row">
                            <div class='col-12'>
                                {this.state.reviews.map((x,i)=>
                                    <div key={i} className="card">
                                        <div class='card-header'>
                                            <Rating value = {x.rating}/>
                                        </div>
                                    
                                        <div class='card-body'>
                                            <div class='row'>
                                                <div class='col-10'>{x.raterID}</div>
                                                <div class='col-2'>{x.ratingDate.toString().substr(0,10)}</div>
                                            </div>
                                            <div class='row'>
                                                <div class='col-10'>{x.comment}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}                                
                            </div>
                        </div>

                        <br/>

                        <div className='container'>
                        <div class="row">
                            <div class="card">
                                <div class="card-header">
                                    Leave a review
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-8">
                                                <label htmlFor="yourName">Your Name</label>
                                                <br/>
                                                <input type="text"
                                                    className='form-control'
                                                    id="yourName"
                                                    name="yourName"
                                                    value={this.state.userName}
                                                    onChange={ event => this.setState({ userName: event.target.value }) }>
                                                </input>
                                            </div>

                                            <div class="col-2">
                                                <label htmlFor="Rating" >Rating</label>
                                                <br/>
                                                <select 
                                                    className="form-control"
                                                    id="Rating"
                                                    name="Rating"
                                                    value={this.state.rating}
                                                    onChange={ event => this.setState({ rating: event.target.value }) }>
                                                    <option> </option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>

                                            <div class="col-2">
                                                <br/>
                                                <Rating value = {this.state.rating}/>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <label htmlFor="Comment"> Comment </label>
                                                <br/>
                                                <textarea id="Comment"
                                                    className='form-control'
                                                    name="Comment"
                                                    value={this.state.comment}
                                                    onChange={ event => this.setState({ comment: event.target.value }) }>
                                                </textarea>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-12">
                                                <button type="button" className="btn btn-success"
                                                    type="button">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
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