import { useEffect, useState } from 'react';
import AdminDashboardComponent from '../AdminDashboardComponent/adminDashboardComponent';
import './adminDashboardItemComponent.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboardItemComponent = () => {

    const [dataCount, setDataCount] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const getAllData = async () => {
            await axios.get("http://localhost:5000/api/auth/getDataCount")
                .then((response) => {
                    setDataCount(response.data)
                }).catch((error) => {
                    console.error(error);
                });
        }
        getAllData()
    }, [])


    return (
        <>
            <AdminDashboardComponent>
                <section>
                    <div className="container mt-5">
                        <div className="row admindashboard-cards">
                            <div className="col-md-3" onClick={() => navigate("/admin/voters")}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Users</h5>
                                        <p className="card-text">{dataCount?.userCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3"  onClick={() => navigate("/admin/party")}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Party</h5>
                                        <p className="card-text">{dataCount?.partyCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3"  onClick={() => navigate("/admin/candidate")}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Candidate</h5>
                                        <p className="card-text">{dataCount?.candidateCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3"  onClick={() => navigate("/admin/election")}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Election</h5>
                                        <p className="card-text">{dataCount?.electionCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AdminDashboardComponent>
        </>
    )
}

export default AdminDashboardItemComponent;