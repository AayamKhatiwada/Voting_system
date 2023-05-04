import axios from "axios";
import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent";
import { useEffect, useState } from "react";
import { SuccessNoty } from "../../../Reuseables/notifications";

const AdminElection = () => {

    const [electionData, setElectionData] = useState([])
    const [updateUseEffect, setUpdateUseEffect] = useState(false)

    const deleteElection = async (electionId) => {
        await axios.delete(`http://localhost:5000/api/election/deleteElection/${electionId}`)
            .then((response) => {
                SuccessNoty(response.data)
                setUpdateUseEffect(true)
            }).catch((error) => {
                console.error(error);
                SuccessNoty(error.response.data)
            });
    }

    useEffect(() => {
        const getElectionData = async () => {
            await axios.get("http://localhost:5000/api/election/getAllElections")
                .then((response) => {
                    // console.log(response.data)
                    setElectionData(response.data)
                }).catch((error) => {
                    console.error(error);
                });
        }
        getElectionData()
    }, [updateUseEffect])


    const changeElectionStatus = async (id, status) => {
        await axios.put(`http://localhost:5000/api/election/changeStatus/${id}`, { status })
            .then((response) => {
                SuccessNoty(response.data)
                setUpdateUseEffect(!updateUseEffect)
            }).catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <AdminDashboardComponent>
                <div className="container">
                    <div className="party-add-button">
                        <a href="election/newRegister" className="btn btn-primary">Add Election</a>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                electionData.map((election) => {
                                    return (
                                        <tr key={election._id}>
                                            <td><img src={`http://localhost:5000/uploads/${election.image}`} alt="" width="50px" height="50px" style={{ borderRadius: "50%", objectFit: "cover" }} /></td>
                                            <td>{election.name}</td>
                                            <td>{election.status === "0" ? "Stopped" : "Running"}</td>
                                            <td><div className={election.status === "0" ? "btn btn-success" : "btn btn-warning"} onClick={() => changeElectionStatus(election._id, election.status === "0" ? "1" : "0")}>{election.status === "0" ? "Start" : "Stop"}</div> {election.status === "0" && <><a href={`election/${election._id}`} className="btn btn-primary">Edit</a> <div className="btn btn-danger" onClick={() => deleteElection(election._id)}>Delete</div></>}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </AdminDashboardComponent>
        </>
    )
}

export default AdminElection;