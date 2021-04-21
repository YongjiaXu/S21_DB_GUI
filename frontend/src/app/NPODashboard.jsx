import React from 'react'
import { Rating } from './models/rating';
import { UserRepository } from '../api/userRepository';

export class NPODashboard extends React.Component
{
    userRepo = new UserRepository();

    state = {
    }

    componentDidMount() {
        this.userRepo.getUser('user').then(x => {
            this.setState( x );
        })
    }

    render (){
        return(
            <>
                <div class='card' style={{width:'80em'}}>
                    <div class='card-header' style=
                    {{color: 'white', background: '#425088'}}>
                        <h1> NPO Dashboard
                            <span style={{float: 'right'}}> 
                                (Display Average Rating Here) 
                            </span> 
                        </h1>
                        <h1>{ this.state.username }</h1>
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
                                <img src="https://via.placeholder.com/300x300"
                                alt="Logo"></img>
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
                        </div>
                        </div>

                        <div class='row' style={{float: 'middle'}}>
                            <h2> Ratings </h2>

                            <div class="card" style={{width: '77em'}}>
                                    <div class='card-header' style={{ color: 'white', background: '#425088' }}>
                                        <Rating value = {3}/>
                                    </div>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-10' style={{ color:'grey' }}>JoeShmoe</div>
                                            <div class='col-2'>{new Date().toDateString()}</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-10'>"Decent charity I guess"</div>
                                            <div class="col-2">
                                                <button type="button" class="btn btn-danger">Flag</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/>

                                <div class="card" style={{width: '77em'}}>
                                    <div class='card-header' style={{ color: 'white', background: '#425088' }}>
                                        <Rating value = {5}/>
                                    </div>
                                    
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-10' style={{ color:'grey' }}>HanShotFirst</div>
                                            <div class='col-2'>{new Date().toDateString()}</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-10'>"Very helpful to the community! Needs more funding"</div>
                                            <div class="col-2">
                                                <button type="button" class="btn btn-danger">Flag</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/>

                                <div class="card" style={{width: '77em'}}>
                                    <div class='card-header' style={{ color: 'white', background: '#425088' }}>
                                        <Rating value = {1}/>
                                    </div>
                                    
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-10' style={{ color:'grey' }}>GaryOak</div>
                                            <div class='col-2'>{new Date().toDateString()}</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-10'>"This charity Stinks"</div>
                                            <div class="col-2">
                                                <button type="button" class="btn btn-danger">Flag</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}