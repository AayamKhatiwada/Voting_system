import "./homeComponent.css"
import HomeImage from '../assets/Home/HomeImage.png'
import { useNavigate } from "react-router-dom";
import NavigateComponent from "./navigateComponent";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user-selector";
import { useEffect, useState } from "react";
import axios from "axios";
import { setCurrentUser } from "../store/user/user-action";

const HomeComponent = () => {

    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');

    const [electionData, setElectionData] = useState([])
    const [voteData, setVoteData] = useState([])

    const changeToSignIn = () => {
        navigate("/signIn");
    }

    const changeToRegister = () => {
        navigate("/register");
    }

    useEffect(() => {
        const getUserData = async () => {
            axios.get('http://localhost:5000/api/user/getUserData', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    dispatch(setCurrentUser(response.data));
                })
                .catch(error => {
                    console.log(error);
                });
        }
        accessToken !== null && getUserData()

        const fecthData = () => {
            axios.get(`http://localhost:5000/api/election/getAllElections`)
                .then(response => {
                    setElectionData(response.data)
                    for (let index = 0; index < response.data.length; index++) {
                        getVoteDetail(response.data[index].name)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

        const getVoteDetail = (name) => {
            axios.get(`http://localhost:5000/api/vote/getVoteDetail/${name}`)
                .then(response => {
                    console.log(response.data);
                    setVoteData(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        fecthData()
    }, [accessToken, dispatch])

    return (
        <>
            <NavigateComponent />

            <div className="home-body">
                <div className="home-left-side col-sm-6">
                    <img src={HomeImage} alt="" width="90%" />
                </div>
                <div className="home-right-side col-sm-6">
                    <div className="home-right-title">
                        YOUR VOTE MATTERS<br /> DON'T LOSE IT
                    </div>
                    <div className="home-right-desc">
                        Vote Your Favourite Leader
                    </div>
                    {
                        user.length === 0 &&
                        <div className="home-buttons">
                            <button type="button" className="btn btn-primary home-buttons-login" onClick={changeToSignIn}>Log in</button>
                            <button type="button" className="btn home-buttons-register" onClick={changeToRegister}>Register</button>
                        </div>
                    }
                </div>
            </div>

            {
                electionData?.map((election) => {
                    return (
                        <div className="container mt-4" key={election._id}>
                            <h1>{election.name} election</h1>
                            {
                                voteData ? (
                                    <table className="table table-bordered mt-4">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Party</th>
                                                <th>No. of votes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                voteData.map((vote) => {
                                                    return (
                                                        <tr key={vote._id}>
                                                            <td>{vote.party}</td>
                                                            <td>1</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                ) : (
                                    <div>No has yet voted</div>
                                )
                            }

                        </div>
                    )
                })
            }

        </>
    );
}

export default HomeComponent;