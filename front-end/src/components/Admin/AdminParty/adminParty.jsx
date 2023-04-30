import { useEffect, useState } from "react";
import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent";
import axios from "axios";
import './adminParty.css'
import { SuccessNoty } from "../../../Reuseables/notifications";

const AdminParty = () => {

    const [partyData, setPartyData] = useState([])
    const [updateUseEffect, setUpdateUseEffect] = useState(false)

    useEffect(() => {
        const getPartyData = async () => {
            await axios.get("http://localhost:5000/api/party/getPartyData")
                .then((response) => {
                    console.log(response.data)
                    setPartyData(response.data)
                }).catch((error) => {
                    console.error(error);
                });
        }
        getPartyData()
    }, [updateUseEffect])

    const deleteParty = async (partyId) => {
        await axios.delete(`http://localhost:5000/api/party/deleteParty/${partyId}`)
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
                    <div className="party-add-button">
                        <a href="party/newRegister" className="btn btn-primary">Add Party</a>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                partyData.map((party) => {
                                    return (
                                        <tr key={party._id}>
                                            <td>{party.name}</td>
                                            <td>{party.description}</td>
                                            <td><a href={`party/${party._id}`} className="btn btn-primary">Edit</a> <div className="btn btn-danger" onClick={() => deleteParty(party._id)}>Delete</div></td>
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

export default AdminParty;