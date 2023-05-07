import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorNoty, SuccessNoty } from '../Reuseables/notifications';
import { selectCurrentUser } from '../store/user/user-selector';
import NavigateComponent from './navigateComponent';
import './votePartyComponent.css'
import { useNavigate } from 'react-router-dom';

const VotePartyComponent = () => {

    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    const verified = user.length === 0 ? false : ((user.is_Email_Verified === '1' && user.is_Phone_Number_Verified === "1") ? false : true)
    const [electionData, setElectionData] = useState([])
    const [electionCondition, setElectionCondition] = useState([])

    useEffect(() => {
        const fecthData = () => {
            axios.get(`http://localhost:5000/api/election/getAllElections`)
                .then(response => {
                    // console.log(response.data);
                    setElectionData(response.data)
                    user.length !== 0 && getElectionCondition()
                })
                .catch(error => {
                    console.log(error);
                });
        }

        const getElectionCondition = () => {
            console.log(user._id)
            axios.get(`http://localhost:5000/api/vote/getVotedUser/${user._id}`)
                .then(response => {
                    // console.log(response.data);
                    setElectionCondition(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        fecthData()
    }, [])

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
                    {
                        electionData.map((election) => {
                            let condition = true
                            return (
                                <div key={election._id}>
                                    {
                                        election.status === "1" && (
                                            <div className="card card-img-top col-sm-5" onClick={() => {
                                                for (let index = 0; index < electionCondition.length; index++) {
                                                    if(election.name === electionCondition[index].election){
                                                        condition = false
                                                    }
                                                }
                                                if(condition === true && user.length !== 0 && user.is_Email_Verified === "1" && user.is_Phone_Number_Verified === "1"){
                                                    navigate(`/vote/${election._id}`)
                                                }else if(condition === false){
                                                    ErrorNoty("You have alreay voted in the election")
                                                }else if(user.length === 0){
                                                    ErrorNoty("You are not loged in")
                                                }else if(user.is_Email_Verified === "0" || user.is_Phone_Number_Verified === "0"){
                                                    ErrorNoty("Please verify email and phone number before voting")
                                                }
                                            }}>
                                                <img src={`http://localhost:5000/uploads/${election.image}`} alt="Card image cap" width="400px" height="200px" style={{ borderRadius: "20px", objectFit: "cover", opacity: "0.6" }} />
                                                <div className='vote-title-div'>
                                                    <h5 className="card-title vote-card-title container">{election.name}</h5>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default VotePartyComponent;