import React from 'react';
import {PasswordUpdate} from './passwordUpdate';
import {userRepository} from '../api/userRepository'

export class UserDash extends React.Component{
    state={
        userName: 'Place Holder',
        preferences: ["Freddy", "Yes"],
        password: '',
        npos: ["Kaer Morhen", "Kaer Trolde", "Styggian Castle"]
    }

    render (){
        return <>
            <nav>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Log Out</a></li>
                </ul>
            </nav>
            <h1 class="userTitle" style={{textDecoration:"underline"}}> {this.state.userName} </h1>

            <div id="profs" style={{float:"left"}}>
                <h1 class="listOfNonProfs"> Non-Profit Organinzations </h1>
                {this.state.npos.map((x,i)=> <>
                    <div>
                        {x}
                    </div>
                </>
                )}
            </div>

            <button class="userPassChange" type="button" className=" btn btn-success btn-block" onClick={{}} >
                Change Password?
            </button>

            <h1 class="listOfPref" style={{float:"right"}}> List of Preferences</h1>
            <div>
                {this.state.preferences.map((x,i)=> <>
                    <div>
                        {x}
                    </div>
                </>
                )}
            </div>
            </>
    }
}