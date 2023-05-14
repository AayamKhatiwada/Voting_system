import { useEffect, useState } from "react";
import "./electionForm.css"
import axios from "axios";
import { selectCurrentUser } from "../store/user/user-selector";
import { useSelector } from "react-redux";
import { ErrorNoty, SuccessNoty } from "../Reuseables/notifications";
import { useNavigate } from "react-router-dom"

const ElectionForm = () => {

    const url = window.location.pathname
    const newUrl = url.replace("/vote/", "");
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate()

    const [electionData, setElectionData] = useState([])
    const [candidateElection, setCandidateElection] = useState([])
    const [choosedCandidate, setChoosedCandidate] = useState([])
    const [candidateElectionParty, setCandidateElectionParty] = useState([])

    useEffect(() => {
        const fecthData = () => {
            axios.get(`http://localhost:5000/api/election/getElectionData/${newUrl}`)
                .then(response => {
                    // console.log(response.data);
                    setElectionData(response.data)
                    fetchCandidateData(response.data.name)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        const fetchCandidateData = (name) => {
            axios.get(`http://localhost:5000/api/candidate/getCandidatesByElection/${name}`)
                .then(response => {
                    // console.log(response.data);
                    setCandidateElection(response.data)
                    // console.log(response.data)

                    for (let index = 0; index < response.data.length; index++) {
                        fetchPartyData(response.data[index].party, index)   
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

        const fetchPartyData = (name, index) => {
            axios.get(`http://localhost:5000/api/party/getPartyByName/${name}`)
                .then(response => {
                    setCandidateElectionParty(candidateElectionParty => {
                        const newArray = [...candidateElectionParty];
                        newArray[index] = response.data[0];
                        return newArray;
                      });
                })
                .catch(error => {
                    console.log(error);
                });
        }

        fecthData()
    }, [])

    const submitVote = async (e) => {
        e.preventDefault();
        console.log(choosedCandidate._id, choosedCandidate.party, choosedCandidate.election, choosedCandidate.post, user._id)

        await axios.post(`http://localhost:5000/api/vote/registerVote`, {
            "candidate_id" : choosedCandidate._id,
            "party" : choosedCandidate.party,
            "post" : choosedCandidate.post,
            "election" : choosedCandidate.election,
            "user_id" : user._id,
        })
            .then((response) => {
                SuccessNoty(response.data);
                navigate('/vote')
            }).catch((error) => {
                console.error(error);
                ErrorNoty(error.response.data);
            });
    }
    // console.log(candidateElectionParty)

    return (
        <>
            {
                electionData.length !== 0 && (

                    <div className="electionForm-container">
                        <div className="container electionForm-main">
                            <h2 className="electionForm-h2">Election Form for {electionData.name} election</h2>
                            <form onSubmit={(e) => submitVote(e)}>
                                {
                                    electionData.posts.map((post) => {
                                        return (
                                            <div className="electionForm-form-group" key={post}>
                                                <label htmlFor={post} className="electionForm-label">{post}:</label>
                                                {
                                                    candidateElection.map((candidate) => {

                                                        var image = ""
                                                        for (let index = 0; index < candidateElectionParty.length; index++) {
                                                            if(candidateElectionParty[index]?.name === candidate.party){
                                                                image = candidateElectionParty[index].image
                                                            }
                                                        }
                                                        console.log(image)

                                                        return (
                                                            <div key={candidate._id}>
                                                                {
                                                                    candidate.post === post && (
                                                                        <div className="electionForm-radio">
                                                                            <label className="electionForm-label"><input type="radio" name={post} value={candidate.name} onChange={(e) => setChoosedCandidate(candidate)} /><img src={`http://localhost:5000/uploads/${candidate.image}`} alt="" width="100px" height="100px" style={{borderRadius: "50%", objectFit:"contain"}}/>{candidate.name} from <img src={`http://localhost:5000/uploads/${image}`} alt="" width="100px" height="100px" style={{borderRadius: "50%", objectFit:"contain"}}/> {candidate.party} </label>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <button type="submit" className="btn btn-primary electionForm-submit">Submit</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ElectionForm;