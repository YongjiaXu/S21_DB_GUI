import React from 'react'
import { Rating } from './models/rating';
import {NPORepository} from '../api/npoRepository'
import {ReviewRepository} from '../api/reviewRepository'

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
        reviews:[]
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



    render (){
        return(
            <>
              {this.state.npo.map(x=>               
                <div class="card" style={{width: '80em'}}>
                    <div class="card-header" style={{ color: 'white', background: '#425088' }}>
                        <h1> {x.title}
                            <span style={{float: 'right'}}> (Display Average Rating Here) </span>
                        </h1>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div className='card' style={{'border': 'none'}}>
                                <div class="col-4">
                                    <img src={x.logoURL}
                                    alt="Company Logo" style={{ height: '20em', width: '20em' }}>
                                    </img>
                                </div>
                            </div>
                            
                            <div class='col-8' style={{float: 'left', overflow: 'auto'}}>
                            <div className='card'>
                            <div className='card-header' style={{ color: 'white', background: '#425088' }}>
                                <h2>{x.location}</h2>
                            </div>
                            <div className='card-body'>
                                <br/>
                                <p style={{'font-size': '1.05em'}}>
                                    {x.description}
                                </p>
                                </div>
                            </div>
                        </div>
                        </div>

                        <br/>

                        <div class="row">
                            <div class='col-12'>
                                <h2 style={{'text-align': 'center'}}> Image Gallery </h2>
                                {this.state.gallery.map((x,i)=>
                                <img key={i} src={x}
                                alt="Image 1" style={{padding: '0.5em'}}></img>
                                )}
                            </div>
                        </div>

                        <div class="row">
                            <div class='col-12'>
                                <h2 style={{'text-align': 'center'}}> Ratings </h2>
                                {this.state.reviews.map((x,i)=>
                                    <div key={i} class="card" style={{width: '77em'}}>
                                        <div class='card-header' style={{ color: 'white', background: '#425088' }}>
                                            <Rating value = {x.rating}/>
                                        </div>
                                    
                                        <div class='card-body'>
                                            <div class='row'>
                                                <div class='col-10' style={{ color:'grey' }}>{x.raterID}</div>
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

                        <div class="row">
                            <div class="card" style={{width: '80em'}}>
                                <div class="card-header" style={{ color: 'white', background: '#425088' }}>
                                    Leave a review
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-8">
                                                <label htmlFor="yourName">Your Name</label>
                                                <br/>
                                                <input type="text"
                                                    id="yourName"
                                                    name="yourName"
                                                    value={this.state.userName}
                                                    onChange={ event => this.setState({ userName: event.target.value }) }
                                                    style={{width: '43em', height: '2em'}}>
                                                </input>
                                            </div>

                                            <div class="col-2">
                                                <label htmlFor="Rating" >Rating</label>
                                                <br/>
                                                <select id="Rating"
                                                    name="Rating"
                                                    style={{width: '10em', height: '2em'}}
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
                                                <label htmlFor="Comment">Comment</label>
                                                <br/>
                                                <textarea id="Comment"
                                                    name="Comment"
                                                    style={{width: '76em', height: '6em'}}
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
              )}
            </>
        )
    }
}