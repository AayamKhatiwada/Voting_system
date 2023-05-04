import { useEffect, useState } from "react";
import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import './adminElectionRegister.css'
import axios from "axios";
import { ErrorNoty, SuccessNoty } from "../../../Reuseables/notifications";

const AdminElectionRegister = () => {

    const [electionId, setElectionId] = useState(null)
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [numFields, setNumFields] = useState(1);
    const [fieldValues, setFieldValues] = useState([""]);
    const [situation, setSituation] = useState("Submit")
    const navigate = useNavigate()

    const url = window.location.pathname
    const newUrl = url.replace("/admin/election/", "");

    useEffect(() => {
        const fecthData = () => {
            axios.get(`http://localhost:5000/api/election/getElectionData/${newUrl}`)
                .then(response => {
                    console.log(response.data);
                    setName(response.data.name)
                    setImage(response.data.image)
                    setNumFields(response.data.posts.length)
                    setFieldValues(response.data.posts)
                    setElectionId(response.data._id)
                    setSituation("Update")
                })
                .catch(error => {
                    console.log(error);
                });
        }

        newUrl !== "newRegister" && fecthData()
    }, [])

    const handleFieldValueChange = (index, event) => {
        var newValues = [...fieldValues];
        newValues[index] = event.target.value;
        setFieldValues(newValues);
    };

    const renderTextFields = () => {
        var fields = [];
        for (let i = 0; i < numFields; i++) {
            fields.push(
                <TextField
                    key={i}
                    label={`Position ${i + 1} name`}
                    value={fieldValues[i]}
                    onChange={(event) => handleFieldValueChange(i, event)}
                    fullWidth
                    InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                    InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                />
            );
        }
        return fields;
    };

    const checkInput = (e) => {
        e.preventDefault();
        const actualFieldValue = [];

        for (let index = 0; index < numFields; index++) {
            actualFieldValue[index] = fieldValues[index];
        }

        SubmitElectionData(actualFieldValue)
    }

    const SubmitElectionData = async (actualFieldValue) => {
        console.log(name, image, actualFieldValue)

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('fieldValues', actualFieldValue);

        if (electionId) {
            await axios.put(`http://localhost:5000/api/election/electionUpdate/${electionId}`, formData)
                .then((response) => {
                    SuccessNoty(response.data);
                    navigate("/admin/election")
                }).catch((error) => {
                    console.error(error);
                    ErrorNoty(error.response.data);
                });
        } else {
            await axios.post("http://localhost:5000/api/election/electionRegister", formData)
                .then((response) => {
                    SuccessNoty(response.data);
                    navigate("/admin/election")
                }).catch((error) => {
                    console.error(error);
                    ErrorNoty(error.response.data);
                });
        }
    }

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
                            label="Number of Positions"
                            value={numFields}
                            type="number"
                            onChange={(e) => setNumFields(e.target.value > 9 ? 9 : e.target.value && e.target.value < 1 ? 1 : e.target.value)}
                            InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                            InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                        />
                        {renderTextFields()}
                        <button type="submit" className="btn btn-primary">{situation}</button>
                    </form>
                </div>
            </AdminDashboardComponent>
        </>
    )
}

export default AdminElectionRegister;