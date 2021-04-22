import React from 'react';
import { Npo } from './models/npo'
import { Rating } from './models/rating'
import { User } from './models/user';
//import {PasswordUpdate} from './passwordUpdate';
// Requires Bootstrap

export class UserDash extends React.Component{
    state={
        user: new User('Place Holder Name','', [new Npo(1, "Kaer Morhen", "Kaedwan",'', 1, "Sucks", true),
            new Npo(2, "Mahakam", 'Dwarf Fortress', '', 5, "Rules", true)])
    }

    addPreference(pref){
        var preferences = this.state.preferences;
        preferences.push(pref);
        this.setState({preferences});
    }

    render (){
        return <>
            <nav> 
                <ul id="head" className="breadcrumb">
                    <li id="head"className="breadcrumb-item active"><a id="head" href="#"> Log Out </a></li>
                </ul>
            </nav>

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
                        {this.state.user.npos.map((x,i)=> <>
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
                                <button type="button" className="btn btn-danger btn-block"> 
                                    Remove NPO?
                                </button>
                            </div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </>
    }
}