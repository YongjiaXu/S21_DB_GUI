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
            <h1 class="userTitle" style={{marginBottom:"25px",textDecoration:"underline"}}> {this.state.userName} </h1>

            <h1 class="userPassChange"> Change Password? </h1>
            <div class="passwordMenu" style={{marginBottom:"170px"}}>
                <PasswordUpdate />
            </div>

            <h1 class="listOfPref" style={{float:"none"}}> List of Preferences</h1>
            <div>
                {this.state.preferences.map((x,i)=> <>
                    <div>
                        {x}
                    </div>
                </>
                )}
            </div>

            <h1 class="listOfNonProfs"> Non-Profit Organinzations </h1>
            <div>
                {this.state.npos.map((x,i)=> <>
                    <div>
                        {x}
                    </div>
                </>
                )}
            </div>
            </>
    }
}