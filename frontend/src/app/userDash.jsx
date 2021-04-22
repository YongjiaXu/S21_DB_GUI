import React from 'react';
import { Npo } from './models/npo'
import { Rating } from './models/rating'
import { User } from './models/user';
import {UserRepository} from '../api/userRepository'
import {NPORepository} from '../api/npoRepository'
import {Link} from 'react-router-dom'
//import {PasswordUpdate} from './passwordUpdate';
// Requires Bootstrap

export class UserDash extends React.Component{

    userRepo = new UserRepository();
    npoRepo = new NPORepository();

    state={
        user: new User('Place Holder Name','',''),
        npos:[]
    }

    componentDidMount() {
        let id = +this.props.match.params.id;
        if (id) {
            this.userRepo.getUser(id)
            .then(user => { 
                this.setState({user})
             });
        }

        this.npoRepo.getNPOS()
        .then(npos=>{
            this.setState({npos})
        });
    }

    render (){
        return <>
            <div className="row">
                <div className="col-9">
                    <h1> {this.state.user.username}</h1>
                </div>

                <div id="password"className="col-3">
                    <div className="row">
                        <div>
                            <button type="button" className="btn btn-primary btn-block"> 
                                Change Password?
                            </button>
                            <button type="button" className="btn btn-primary btn-block"> 
                                Delete Account?
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <h1 id="listOfNonProfs"> Non-Profit Organinzations </h1>
                    <br/>
                    <div>
                        {this.state.npos.map((x,i)=> <>
                            <div id="npoCard" className="card">
                                <div id="name"className="card-header">
                                    {x.title} 
                                    <div className="float-right">
                                        <Rating value = {x.rating}/>
                                    </div> 
                                </div>
                                <div className="card-body">
                                    <div>
                                        <div>"{x.description}"</div>
                                    </div>
                                </div>
                                <Link to={'/NPOProfile/'+x.npoID} type="button" className="btn btn-danger btn-block"> 
                                    View NPO Profile
                                </Link>
                            </div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </>
    }
}