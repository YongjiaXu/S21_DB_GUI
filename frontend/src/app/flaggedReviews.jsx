import React, { useState, useEffect } from 'react';
import {ReviewRepository} from '../api/reviewRepository';
import {UserRepository} from '../api/userRepository';
import {NPORepository} from '../api/npoRepository';

export const FlaggedReviewList = props =>{

    const [flagged, setFlagged] = useState('');
    const [users, setUsers] = useState('');
    const [npos, setNpos] = useState('');

    const reviewRepository = new ReviewRepository();

    const userRepository = new UserRepository();

    const npoRepository = new NPORepository();

    useEffect(()=>{
        if(!flagged){
            reviewRepository.getFlagged().then(x=>{           
                setFlagged(x);
            });
            userRepository.getUsers().then(v=>{
                setUsers(v);
            });
            npoRepository.getNPOS().then(z=>{
                setNpos(z);
            })
        }
    });

    function username(raterID){
        const result = users.find(({userID})=> userID===raterID);
        return result.username;
    }

    function npo(id){
        const result = npos.find(({npoID})=> npoID===id);
        return result.title;
    }


    function removePost(id){
        reviewRepository.deletePost(id)  
    };

    function unflag(id){
        reviewRepository.flagToggle(id);
    }

    function ban(id){
        userRepository.banUser(id);
    }


    if(!flagged||!users||!npos){
        return<>
        <h2>Loading Flagged Reviews....</h2>
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
                        <div className="d-flex justify-content-center"> 
                        <button className="btn btn-warning" onClick={()=>removePost(x.ratingID)} style={{width:'30%'}}>Delete Post</button>
                        <button className="btn btn-danger mx-2" style={{width:'30%'}} onClick={()=>ban(x.raterID)}>Ban User</button>
                        <button className="btn btn-success" onClick={()=>unflag(x.ratingID)} style={{width:'30%'}}>Keep Post</button>
                        </div>
                    </div>
                    </div>
                <br/>
            </div>)
            }
        </div>
        </>
}