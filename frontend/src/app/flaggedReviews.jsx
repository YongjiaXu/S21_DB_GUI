import React, { useState, useEffect } from 'react';
import {Review} from './models/review';
import {ReviewRepository} from '../api/reviewRepository';

var months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


export const FlaggedReviewList = props =>{

    const [flagged, setFlagged] = useState('');

    const reviewRepository = new ReviewRepository();

    useEffect(()=>{
        if(!flagged){
            reviewRepository.getFlagged().then(x=>{
                setFlagged(x);
            });
        }
    });

    // removePost(reviews,index){
    //     reviews.splice(index,1);
    //     this.setState({
    //         flagged:reviews
    //     })
    // };

    if(!flagged){
        return<>
        <h2>Loading Falgged Reviews....</h2>
        </>
    }
        return<>
        <h2>Flagged Reviews</h2>
        <div className="card">
            {
                !flagged.length && <h5>No Flagged Reviews</h5>
            }
            {
                flagged.map((x, i) => <div key={ i } style={{marginRight:"55px"}}>
                <div className="card"style={{background:"#ebebeb"}}>
                    <div className="card-body">
                        <p className="text-secondary card-text">{x.raterID} on {x.npoID} for {x.rating} stars</p>
                        <p className="float-right text-secondary card-text">{x.date}</p>
                        <p className="card-text">"{x.comment}"</p>
                        <button className="delete" onClick={()=>this.removePost(flagged,i)}>Delete Post</button>
                        <button className="ban">Ban User</button>
                        <button className="keep" onClick={()=>this.removePost(flagged,i)}>Keep Post</button>
                    </div>
                    </div>
                <br/>
            </div>)
            }
        </div>
        </>
}