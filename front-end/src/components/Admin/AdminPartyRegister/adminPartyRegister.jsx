import { useEffect, useState } from "react"
import { ErrorNoty, SuccessNoty } from "../../../Reuseables/notifications"
import axios from 'axios'
import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent"
import { TextField } from "@mui/material"
import './adminPartyRegister.css'
import { useNavigate } from "react-router-dom"

const AdminPartyRegister = () => {

    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")
    const [partyId, setPartyId] = useState(null)
    const [situation, setSituation] = useState("Submit")
    const navigate = useNavigate()

    const url = window.location.pathname
    const newUrl = url.replace("/admin/party/", "");

    useEffect(() => {
        const fecthData = () => {
            axios.get(`http://localhost:5000/api/party/getPartyData/${newUrl}`)
                .then(response => {
                    // console.log(response.data);
                    setName(response.data.name)
                    setImage(response.data.image)
                    setDescription(response.data.description)
                    setSituation("Update")
                    setPartyId(response.data._id)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        newUrl !== "newRegister" && fecthData()
    }, [])


    const submitParty = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('description', description);

        if (partyId) {
            console.log(partyId)
            await axios.put(`http://localhost:5000/api/party/partyUpdate/${partyId}`, formData)
                .then((response) => {
                    SuccessNoty(response.data);
                    navigate("/admin/party")
                }).catch((error) => {
                    console.error(error);
                    ErrorNoty(error.response.data);
                });
        } else {
            await axios.post("http://localhost:5000/api/party/partyRegister", formData)
                .then((response) => {
                    SuccessNoty(response.data);
                    navigate("/admin/party")
                }).catch((error) => {
                    console.error(error);
                    ErrorNoty(error.response.data);
                });
        }
    }

    const checkInput = (e) => {
        e.preventDefault()

        if (name === "") {
            ErrorNoty("Cannot leave the name field empty")
        } else if (name.length < 3) {
            ErrorNoty("Name Cannot be less than 3 letters")
        } else if (description === "") {
            ErrorNoty("Cannot leave the description field empty")
        } else if (description.length < 3) {
            ErrorNoty("Description Cannot be less than 3 letters")
        } else if (image === null) {
            ErrorNoty("Please insert an image")
        } else {
            submitParty(e)
        }
    }

    return (
        <>
            <AdminDashboardComponent>
                <div className="party-back-button">
                    <a href="/admin/party" className="btn">Back</a>
                </div>
                <div className="container adminRegister-party">
                    <form className="row" encType="multipart/form-data" onSubmit={(e) => checkInput(e)}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                            InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                        />
                        <div>
                            <label htmlFor="image">Image</label>
                            <input type="file" name="image" className="form-control-file my-3" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                        </div>

                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white", minHeight: "10rem" } }}
                            InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                        />
                        <button type="submit" className="btn btn-primary">{situation}</button>
                    </form>
                </div>
            </AdminDashboardComponent>
        </>
    )
}

export default AdminPartyRegister;