import React, { Component } from 'react';

export class DeletedAccount extends Component{
    render(){
        return <>
            <div className="signup-form">
                <form>
                    <h3>Account Deleted</h3>

                    <div className="exit-text">
                        <p>
                            Sorry it didn't work out. :(
                        </p>
                    </div>
                </form>
            </div>    
        </>
    }
}