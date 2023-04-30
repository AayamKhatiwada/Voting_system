import { useEffect, useState } from "react";
import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent";
import axios from "axios";
import { SuccessNoty } from "../../../Reuseables/notifications";

const AdminVoters = () => {

    const [voterData, setVoterData] = useState([])
    const [updateUseEffect, setUpdateUseEffect] = useState(false)

    useEffect(() => {
        const getVoterData = async () => {
            await axios.get("http://localhost:5000/api/user/getAllUserData")
                .then((response) => {
                    console.log(response.data)
                    setVoterData(response.data)
                }).catch((error) => {
                    console.error(error);
                });
        }
        getVoterData()
    }, [updateUseEffect])

    const deleteVoter = async (voterId) => {
        await axios.delete(`http://localhost:5000/api/user/deleteUser/${voterId}`)
            .then((response) => {
                SuccessNoty(response.data)
                setUpdateUseEffect(true)
            }).catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <AdminDashboardComponent>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                voterData.map((voter) => {
                                    return (
                                        <tr key={voter._id}>
                                            <td><img src={`http://localhost:5000/uploads/${voter.image}`} alt="" width="50px" height="50px" style={{ borderRadius: "50%" }} /></td>
                                            <td>{voter.firstName} {voter.lastName}</td>
                                            <td>{voter.email}</td>
                                            <td>{voter.phoneNumber}</td>
                                            <td><a href={`/admin/voters/${voter._id}`} className="btn btn-primary">View</a> <div onClick={() => deleteVoter(voter._id)} className="btn btn-danger">Delete</div></td>
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

export default AdminVoters;