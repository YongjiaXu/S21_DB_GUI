import React, { useState, useEffect } from 'react';
import {ReviewRepository} from '../api/reviewRepository';
import {UserRepository} from '../api/userRepository';
import {NPORepository} from '../api/npoRepository';

export const FlaggedReviewList = props =>{

    const [npos, setNpos] = useState('');


    const reviewRepository = new ReviewRepository();

    const userRepository = new UserRepository();

    const npoRepository = new NPORepository();

    useEffect(()=>{
        if(!flagged){
            npoRepository.getNANPOS().then(z=>{
                setNpos(z);
            })
        }
    });


    // removePost(reviews,index){
    //     reviews.splice(index,1);
    //     this.setState({
    //         flagged:reviews
    //     })
    // };

    if(!npos){
        return<>
        <h2>Loading NPOs....</h2>
        </>
    }
        return<>
        <div className="card">
            {
                !flagged.length && <h5>No Flagged Reviews</h5>
            }
            {
                flagged.map((x, i) => <div key={ i } style={{}}>
                <div className="card"style={{background:"#ebebeb"}}>
                    <div className="card-body">
                        <p className="text-secondary card-text">{username(x.raterID)} on {npo(x.npoID)} for {x.rating} stars</p>
                        <p className="float-right text-secondary card-text">{x.date}</p>
                        <p className="card-text">"{x.comment}"</p>
                        <button className="btn btn-warning" onClick={()=>this.removePost(flagged,i)}>Delete Post</button>
                        <button className="btn btn-danger">Ban User</button>
                        <button className="btn btn-success" onClick={()=>this.removePost(flagged,i)}>Keep Post</button>
                    </div>
                    </div>
                <br/>
            </div>)
            }
        </div>
        </>
}