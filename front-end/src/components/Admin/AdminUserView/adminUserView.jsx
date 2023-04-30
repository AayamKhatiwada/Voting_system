import { useEffect, useState } from "react";
import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent";
import axios from "axios";
import './adminUserView.css'

const AdminUserView = () => {

    const url = window.location.pathname
    const newUrl = url.replace("/admin/voters/", "");

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [province, setProvince] = useState("1");
    const [contact, setContact] = useState('');
    const [citizennum, setCitizennum] = useState('');
    const [gender, setGender] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        const fecthData = () => {
            axios.get(`http://localhost:5000/api/user/getUserData/${newUrl}`)
                .then(response => {
                    console.log(response.data);
                    setName(response.data.firstName + " " + response.data.lastName)
                    setEmail(response.data.email)
                    setProvince(response.data.province)
                    setContact(response.data.phoneNumber)
                    setCitizennum(response.data.citizenNumber)
                    setGender(response.data.gender)
                    setImage(response.data.image)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        newUrl !== "newRegister" && fecthData()
    }, [])

    return (
        <>
            <AdminDashboardComponent>
                <div className="party-back-button">
                    <a href="/admin/voters" className="btn">Back</a>
                </div>
                <div className="container adminUser-main">
                    <img src={`http://localhost:5000/uploads/${image}`} alt="User Profile Image" className="img-fluid col-sm-4" width="300px" height="300px" style={{ borderRadius: "50%", objectFit: "cover" }} />
                    <div className="card col-sm-6">
                        <div className="card-header">
                            <h3>User Information</h3>
                        </div>
                        <div className="card-body adminUser-cardBody">
                            <div className="row">
                                <div className="col-md-4">
                                    <p><strong>Username:</strong></p>
                                </div>
                                <div className="col-md-8">
                                    <p>{name}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p><strong>Email:</strong></p>
                                </div>
                                <div className="col-md-8">
                                    <p>{email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p><strong>Contact:</strong></p>
                                </div>
                                <div className="col-md-8">
                                    <p>{contact}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p><strong>Province:</strong></p>
                                </div>
                                <div className="col-md-8">
                                    <p>Province number {province}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p><strong>Citizenship Number:</strong></p>
                                </div>
                                <div className="col-md-8">
                                    <p>{citizennum}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p><strong>Gender:</strong></p>
                                </div>
                                <div className="col-md-8">
                                    <p>{gender}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminDashboardComponent>
        </>
    )
}

export default AdminUserView;