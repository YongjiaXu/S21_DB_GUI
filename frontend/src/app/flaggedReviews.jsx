import React from 'react';
import {Review} from './models/review';

var months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


export class FlaggedReviewList extends React.Component{
    state={
        flagged : [
        new Review("Jake","RandomNPO",0,"THIS IS TRASH",new Date()),
        new Review("Bella","A Different NPO",5, "Wow, This is pretty cool!",new Date())
    ]
    }
    removePost(reviews,index){
        reviews.splice(index,1);
        this.setState({
            flagged:reviews
        })
    }
    render(){
        return<>
        <h2>Flagged Reviews</h2>
        <div className="card">
            {
                !this.state.flagged.length && <h5>No Flagged Reviews</h5>
            }
            {
                this.state.flagged.map((x, i) => <div key={ i } style={{marginRight:"55px"}}>
                <div className="card"style={{background:"#ebebeb"}}>
                    <div className="card-body">
                        <p className="text-secondary card-text">{x.user} on {x.npo} for {x.rating} stars</p>
                        <p className="float-right text-secondary card-text">{months[x.date.getMonth()]} {x.date.getDate()}, {x.date.getFullYear()}</p>
                        <p className="card-text">"{x.comment}"</p>
                        <button className="delete" onClick={()=>this.removePost(this.state.flagged,i)}>Delete Post</button>
                        <button className="ban">Ban User</button>
                        <button className="keep" onClick={()=>this.removePost(this.state.flagged,i)}>Keep Post</button>
                    </div>
                    </div>
                <br/>
            </div>)
            }
        </div>
        </>
    }
}