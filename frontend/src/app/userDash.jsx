import React from 'react';
import { Npo } from '../app/models/npo'
import { Rating } from '../app/models/rating'
import { PasswordUpdate } from './passwordUpdate';
// Requires Bootstrap
// Base User Dashboard, does nothing yet

export class UserDash extends React.Component{
    state={
        userName: 'Place Holder Name',
        preferences: ["Freddy", "Yes"],
        password: '',
        npos: [new Npo("Kaer Morhen", 1, "Sucks"),
            new Npo("Mahakam", 5, "Rules")]
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
                <div className="col-7">
                    <h1> {this.state.userName}</h1>
                </div>

                <div className="col-5">
                    <div id="password" className="row">
                        <div className="col-4">
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn btn-primary btn-block"> 
                                Change Password?
                            </button>
                        </div>
                        <div className="col-4">
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
                                    {x.name} 
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
                
                <div className="col-6">
                    <div id="listOfPref">
                        <h1> List of Preferences</h1>
                        <br/>
                        <button type="button" className="btn btn-primary btn-block"> 
                            Add Preference?
                        </button>
                        <div>
                            {this.state.preferences.map((x,i)=> <>
                                <div id="pref"className="card">
                                    <div className="card-body">
                                        {x}
                                    </div>
                                </div>
                            </>
                            )}
                        </div>
                    </div>
                </div>  
            </div>
        </>
    }
}