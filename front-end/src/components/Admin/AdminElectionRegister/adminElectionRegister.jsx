import { useState } from "react";
import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const AdminElectionRegister = () => {

    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")
    const [situation, setSituation] = useState("Submit")
    const navigate = useNavigate()

    const checkInput = () => {}

    return (
        <>
            <AdminDashboardComponent>
                <div className="party-back-button">
                    <a href="/admin/election" className="btn">Back</a>
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

export default AdminElectionRegister;