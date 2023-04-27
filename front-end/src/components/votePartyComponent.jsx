import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorNoty, SuccessNoty } from '../Reuseables/notifications';
import { selectCurrentUser } from '../store/user/user-selector';
import NavigateComponent from './navigateComponent';
import './votePartyComponent.css'

const VotePartyComponent = () => {

    const [partyData, setPartyData] = useState([])
    const user = useSelector(selectCurrentUser)

    useEffect(() => {
        const getPartyData = async () => {
            await axios.get("http://localhost:5000/api/party/getPartyData")
                .then((response) => {
                    console.log(response.data)
                    setPartyData(response.data)
                }).catch((error) => {
                    console.error(error);
                    ErrorNoty(error.response.data);
                });
        }
        partyData.length === 0 && getPartyData()
    }, [])

    const voteMe = async (party) => {
        await axios.get(`http://localhost:5000/api/party/voteParty/${party._id}`)
            .then((response) => {
                SuccessNoty(response.data)
            }).catch((error) => {
                console.error(error);
                ErrorNoty(error.response.data);
            });
    }

    const CheckLogin = (party) => {
        if (user.length === 0) {
            ErrorNoty("Cannot vote without login")
        } else {
            voteMe(party)
        }
    }

    return (
        <>
            <NavigateComponent />
            <div className='container'>
                <h1>Vote Party</h1>
                <div className="vote-party-main">
                    {
                        partyData.map((party) => {
                            return (
                                <div className="vote-party-card col-sm-3" key={party._id}>
                                    <img src={`http://localhost:5000/uploads/${party.image}`} width="200px" height="200px" />
                                    <div className="vote-party-card-name">{party.name}</div>
                                    <div className="vote-party-card-description">{party.description}</div>
                                    <button className='btn btn-success vote-party-button' onClick={() => CheckLogin(party)}>Vote Me</button>
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