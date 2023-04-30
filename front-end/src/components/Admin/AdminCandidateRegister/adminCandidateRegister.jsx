import { useEffect, useState } from "react"
import { ErrorNoty, SuccessNoty } from "../../../Reuseables/notifications"
import axios from 'axios'
import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

const AdminCandidateRegister = () => {

    const [candidateId, setCandidateId] = useState(null)
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")
    const [party, setParty] = useState('')
    const [gender, setGender] = useState('')
    const [province, setProvince] = useState('')
    const [fetchedParty, setFetchedParty] = useState([])
    const [situation, setSituation] = useState("Submit")
    const navigate = useNavigate()

    const url = window.location.pathname
    const newUrl = url.replace("/admin/candidate/", "");

    useEffect(() => {
        const fecthData = () => {
            axios.get(`http://localhost:5000/api/party/getPartyData`)
                .then(response => {
                    console.log(response.data);
                    setFetchedParty(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        const fecthCandidateData = () => {
            axios.get(`http://localhost:5000/api/candidate/getCandidate/${newUrl}`)
                .then(response => {
                    console.log(response.data);
                    setName(response.data.name)
                    setImage(response.data.image)
                    setDescription(response.data.description)
                    setParty(response.data.party)
                    setGender(response.data.gender)
                    setProvince(response.data.province)
                    setSituation("Update")
                    setCandidateId(response.data._id)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        fecthData()
        newUrl !== "newRegister" && fecthCandidateData()

    }, [])


    const submitParty = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('party', party);
        formData.append('gender', gender);
        formData.append('province', province);

        if (candidateId) {
            await axios.put(`http://localhost:5000/api/candidate/updateCandidate/${candidateId}`, formData)
                .then((response) => {
                    SuccessNoty(response.data);
                    navigate("/admin/candidate")
                }).catch((error) => {
                    console.error(error);
                    ErrorNoty(error.response.data);
                });
        } else {
            await axios.post("http://localhost:5000/api/candidate/registerCandidate", formData)
                .then((response) => {
                    // console.log(response)
                    SuccessNoty(response.data);
                    navigate("/admin/candidate")
                }).catch((error) => {
                    console.log(error);
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
        } else if (party === "") {
            ErrorNoty("Cannot leave the party field empty")
        } else if (province === "") {
            ErrorNoty("Cannot leave the province field empty")
        } else if (gender === "") {
            ErrorNoty("Cannot leave the gender field empty")
        } else {
            submitParty(e)
        }
    }

    return (
        <>
            <AdminDashboardComponent>
                <div className="party-back-button">
                    <a href="/admin/candidate" className="btn">Back</a>
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

                        <FormControl fullWidth sx={{ borderBottom: "0.5px solid white", color: "white" }}>
                            <InputLabel id="demo-simple-select-label" sx={{ color: "white", fontSize: 14 }}>Party</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={party}
                                onChange={(e) => setParty(e.target.value)}
                                label="Party"
                                sx={{ color: "white", fontSize: 14 }}
                            >
                                {
                                    fetchedParty.map((partyy) => {
                                        return (
                                            <MenuItem value={partyy.name} key={partyy._id}>{partyy.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ borderBottom: "0.5px solid white", color: "white" }}>
                            <InputLabel id="demo-simple-select-label" sx={{ color: "white", fontSize: 14 }}>Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                label="Gender"
                                sx={{ color: "white", fontSize: 14 }}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ borderBottom: "0.5px solid white", color: "white" }}>
                            <InputLabel id="demo-simple-select-label" sx={{ color: "white", fontSize: 14 }}>Province</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                label="Province"
                                sx={{ color: "white", fontSize: 14 }}
                            >
                                <MenuItem value='one'>Province 1</MenuItem>
                                <MenuItem value='two'>Province 2</MenuItem>
                                <MenuItem value='three'>Province 3</MenuItem>
                                <MenuItem value='four'>Province 4</MenuItem>
                                <MenuItem value='five'>Province 5</MenuItem>
                                <MenuItem value='six'>Province 6</MenuItem>
                                <MenuItem value='seven'>Province 7</MenuItem>
                            </Select>
                        </FormControl>

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

export default AdminCandidateRegister;