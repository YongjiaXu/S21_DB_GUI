import React from 'react'
import { Rating } from './models/rating';
import { NPORepository } from '../api/npoRepository';
import {ReviewRepository} from '../api/reviewRepository'
import {Npo} from './models/npo';

export class NPODashboard extends React.Component
{
    npoRepo = new NPORepository();
    reviewRepo = new ReviewRepository();

    state = {
        npo:[],
        reviews:[]
    };

    componentDidMount() {
        let id = +this.props.match.params.id;
        if (id) {
            this.npoRepo.getNPO(id)
            .then(npo => { 
                this.setState({npo})
             });
             this.reviewRepo.getReviews(id)
             .then(reviews=>{
                 this.setState({reviews})
             })
        }
    }

    render (){
        return(
            <>
            {this.state.npo.map(x=>
                <div class='card' style={{width:'80em'}}>
                    <div class='card-header' style=
                    {{color: 'white', background: '#425088'}}>
                        <h1> NPO Dashboard for { x.title}
                            <button type='button' 
                            className="btn btn-success" 
                            style={{float: 'right'}}> 
                                Return 
                            </button> 
                        </h1>
                    </div>

                    <div class='card-body'>
                        <div class='row'>
                            <div class='col-6'>
                                <div className='card'>
                                    <div className='card-header' style={{ color: 'white', background: '#425088' }}>
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
                                        <input id='newPass' type='text' style={{width: '15em', height: '2em'}}></input>
                                    </p>
                                    <p>
                                        Confirm New Password: <br/>
                                        <input id='newPassConfirm' type='text' style={{width: '15em', height: '2em'}}></input>
                                    </p>
                                    <button type='button' className="btn btn-success">Submit</button>
                                    </div>
                                </div>
                            </div>
                            <div class='col-6'>
                                <div className='card'>
                                <div className='card-header' style={{ color: 'white', background: '#425088' }}>
                                <h2> Change Logo </h2>
                                </div>
                                <div className='card-body'>
                                <img src={x.logoURL}
                                alt="Logo"
                                style={{ height: '20em', width: '20em' }}></img>
                                <br/>
                                <input type='file'></input>
                                </div>
                                </div>
                            </div>
                        </div>

                        <br/><br/>

                        <div class='row'>
                            <div class='col-6'>
                                <div className='card'>
                                <div className='card-header' style={{ color: 'white', background: '#425088' }}>
                                <h2> Edit Description </h2>
                                </div>
                                <div className='card-body'>
                                <p>
                                    New Description: <br/>
                                    <textarea id='newDescription'
                                    style={{width: '30em', height: '6em'}}>
                                    </textarea>
                                </p>
                                <button type='button' className="btn btn-success"> Save Changes </button>
                                </div>
                                </div>
                            </div>
                            <div class='col-6'>
                            <div className='card'>
                            <div className='card-header' style={{ color: 'white', background: '#425088' }}>
                                <h2> Change Location </h2>
                            </div>
                            <div className='card-body'>
                                <p>
                                    New Location: <br/>
                                    <input id='newLocation' type='text' style={{width: '15em', height: '2em'}}></input>
                                </p>
                                <button type='button' className="btn btn-success"> Save Changes </button>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className='card'>
                        <div className='card-header' style={{ color: 'white', background: '#425088' }}>
                        <h2> Add Images </h2> <br/>
                        </div>
                        <div className='card-body'>
                        <p>
                            <img src="https://via.placeholder.com/300x300"
                            alt="Image 1" style={{padding: '0.5em'}}></img>
                            
                            <img src="https://via.placeholder.com/300x400"
                            alt="Image 2" style={{padding: '0.5em'}}></img>

                            <img src="https://via.placeholder.com/500x300"
                            alt="Image 3" style={{padding: '0.5em'}}></img>
                        </p>
                        <p>
                            Add Image<br/>
                            <input id='newImage' type='file'></input>
                        </p>
                        <button type='button' className="btn btn-success"> Save Changes </button>
                        </div>
                        </div>



                        <div class='row' style={{float: 'middle'}}>
                            <h2> Ratings <span> (Display Average Rating Here) </span> </h2>
                            {this.state.reviews.map((x,i)=>
                            <div class="card" style={{width: '77em'}}>
                                    <div class='card-header' style={{ color: 'white', background: '#425088' }}>
                                        <Rating value = {x.rating}/>
                                    </div>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-10' style={{ color:'grey' }}>{x.raterID}</div>
                                            <div class='col-2'>{new Date().toDateString()}</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-10'>{x.comment}</div>
                                            <div class="col-2">
                                                <button type="button" class="btn btn-danger">Flag</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                )}
            </>
        )
    }
}