import { useEffect, useState } from "react";
import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent";
import axios from "axios";
import { SuccessNoty } from "../../../Reuseables/notifications";

const AdminCandidate = () => {

    const [candidateData, setCandidateData] = useState([])
    const [updateUseEffect, setUpdateUseEffect] = useState(false)

    useEffect(() => {
        const getCandidateData = async () => {
            await axios.get("http://localhost:5000/api/candidate/getCandidateData")
                .then((response) => {
                    // console.log(response.data)
                    setCandidateData(response.data)
                }).catch((error) => {
                    console.error(error);
                });
        }
        getCandidateData()
    }, [updateUseEffect])

    const deleteCandidate = async (candidateId) => {
        await axios.delete(`http://localhost:5000/api/candidate/deleteCandidate/${candidateId}`)
            .then((response) => {
                SuccessNoty(response.data)
                setUpdateUseEffect(true)
            }).catch((error) => {
                console.error(error);
            });
    }

    return (
        <AdminDashboardComponent>
            <div className="container">
                <div className="party-add-button">
                    <a href="candidate/newCandidate" className="btn btn-primary">Add Candidate</a>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Party</th>
                            <th>Description</th>
                            <th>Election</th>
                            <th>Post</th>
                            <th>Province</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            candidateData.map((candidate) => {
                                return (
                                    <tr key={candidate._id}>
                                        <td><img src={`http://localhost:5000/uploads/${candidate.image}`} alt="" width="50px" height="50px" style={{ borderRadius: "50%", objectFit: "cover" }} /></td>
                                        <td>{candidate.name}</td>
                                        <td>{candidate.party}</td>
                                        <td>{candidate.description}</td>
                                        <td>{candidate.election}</td>
                                        <td>{candidate.post}</td>
                                        <td>Province no. {candidate.province}</td>
                                        <td>{candidate.gender}</td>
                                        <td><a href={`/admin/candidate/${candidate._id}`} className="btn btn-primary">Edit</a> <div onClick={() => deleteCandidate(candidate._id)} className="btn btn-danger">Delete</div></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </AdminDashboardComponent>
    )
}

export default AdminCandidate;