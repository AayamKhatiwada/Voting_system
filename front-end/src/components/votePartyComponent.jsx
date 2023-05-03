import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorNoty, SuccessNoty } from '../Reuseables/notifications';
import { selectCurrentUser } from '../store/user/user-selector';
import NavigateComponent from './navigateComponent';
import './votePartyComponent.css'

const VotePartyComponent = () => {

    const user = useSelector(selectCurrentUser)
    const verified = user.length === 0 ? false : ((user.is_Email_Verified === '1' && user.is_Phone_Number_Verified === "1") ? false : true)

    const CheckLogin = () => {
        if (user.length === 0) {
            ErrorNoty("Cannot vote without login")
        } else {
            console.log("succcess")
        }
    }

    const verifyUserPage = () => {
        window.open(`/verify?id=${user._id}`, '_blank');
    }

    return (
        <>
            <NavigateComponent />
            <div className='container'>
                <h1>Vote</h1>
                {
                    user.length !== 0 && verified && (
                        <h5 className='vote-party-user-verify'>You are still not verified. Please verify your email and phone number. You can verify from this <span className='user-verify-link' onClick={() => verifyUserPage()}>link</span></h5>
                    )
                }

                <div className="vote-main-card">
                    <div className="card card-img-top col-sm-5">
                        <img src="https://picsum.photos/id/237/536/354" alt="Card image cap" width="400px" height="200px" style={{ borderRadius: "20px", objectFit: "cover" }} />
                        <div className='vote-title-div'>
                            <h5 className="card-title vote-card-title container">Your Title</h5>
                        </div>
                    </div>

                    <div className="card card-img-top col-sm-5">
                        <img src="https://picsum.photos/id/237/536/354" alt="Card image cap" width="400px" height="200px" style={{ borderRadius: "20px", objectFit: "cover" }} />
                        <div className='vote-title-div'>
                            <h5 className="card-title vote-card-title container">Your Title is very long</h5>
                        </div>
                    </div>

                    <div className="card card-img-top col-sm-5">
                        <img src="https://picsum.photos/id/237/536/354" alt="Card image cap" width="400px" height="200px" style={{ borderRadius: "20px", objectFit: "cover" }} />
                        <div className='vote-title-div'>
                            <h5 className="card-title vote-card-title container">Your Title is very long</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VotePartyComponent;