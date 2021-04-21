import React from 'react'
import { Rating } from './models/rating';

export class NPOProfile extends React.Component
{
    state = {
        userName: '',
        rating: '',
        comment: ''
    };

    onSubmitClick() {
        this.props.onReviewAdded(this.state);

        this.setState({
            userName: '',
            rating: '',
            comment: ''
        });
    }



    render (){
        return(
            <>                
                <div class="card" style={{width: '80em'}}>
                    <div class="card-header" style=
                    {{color: 'white', background: 'black'}}>
                        <h1> (Insert NPO Here) Overview 
                            <span style={{float: 'right'}}> (Display Average Rating Here) </span>
                        </h1>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-4" style={{float: 'left', clear: 'both', overflow: 'auto'}}>
                                <img src="https://via.placeholder.com/300x300"
                                alt="Company Logo">
                                </img>
                            </div>
                            
                            <div class='col-8' style={{float: 'left', overflow: 'auto'}}>
                                <h2>Location: (insert location here)</h2>
                                <br/>
                                <h2 style={{'text-align': 'left'}}>Description</h2>
                                <p style={{'font-size': '1.05em'}}>
                                    "Did you ever hear the tragedy of Darth Plagueis The Wise? 
                                    I thought not. It’s not a story the Jedi would tell you. 
                                    It’s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, 
                                    so powerful and so wise he could use the Force to influence 
                                    the midichlorians to create life… He had such a knowledge of 
                                    the dark side that he could even keep the ones he cared about 
                                    from dying. The dark side of the Force is a pathway to many 
                                    abilities some consider to be unnatural. He became so powerful… 
                                    the only thing he was afraid of was losing his power, which 
                                    eventually, of course, he did. Unfortunately, he taught his 
                                    apprentice everything he knew, then his apprentice killed 
                                    him in his sleep. Ironic. He could save others from death, 
                                    but not himself."
                                </p>
                            </div>
                        </div>

                        <br/>

                        <div class="row">
                            <div class='col-12'>
                                <h2 style={{'text-align': 'center'}}> Image Gallery </h2>
                                <img src="https://via.placeholder.com/300x300"
                                alt="Image 1" style={{padding: '0.5em'}}></img>
                                
                                <img src="https://via.placeholder.com/300x400"
                                alt="Image 2" style={{padding: '0.5em'}}></img>

                                <img src="https://via.placeholder.com/500x300"
                                alt="Image 3" style={{padding: '0.5em'}}></img>
                            </div>
                        </div>

                        <div class="row">
                            <div class='col-12'>
                                <h2 style={{'text-align': 'center'}}> Ratings </h2>

                                <div class="card" style={{width: '77em'}}>
                                    <div class='card-header' style={{background: 'black', color: 'white'}}>
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
                                    <div class='card-header' style={{background: 'black', color: 'white'}}>
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
                                    <div class='card-header' style={{background: 'black', color: 'white'}}>
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

                        <br/>

                        <div class="row">
                            <div class="card" style={{width: '80em'}}>
                                <div class="card-header" style={{background: 'black', color: 'white'}}>
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
                                                <button type="button" class="btn btn-primary"
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
            </>
        )
    }
}
