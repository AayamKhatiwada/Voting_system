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
    const [elections, setElections] = useState([])
    const [choosedElection, setChoosedElection] = useState('')
    const [posts, setPosts] = useState([])
    const [choosedPost, setChoosedPost] = useState('')
    const navigate = useNavigate()

    const url = window.location.pathname
    const newUrl = url.replace("/admin/candidate/", "");

    useEffect(() => {
        const fecthData = () => {
            axios.get(`http://localhost:5000/api/party/getPartyData`)
                .then(response => {
                    // console.log(response.data);
                    setFetchedParty(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        const fetchElectionData = () => {
            axios.get(`http://localhost:5000/api/election/getAllElections`)
                .then(response => {
                    // console.log(response.data);
                    setElections(response.data)
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
                    setChoosedElection(response.data.election)
                    getPostData(response.data.election)
                    setChoosedPost(response.data.post)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        fecthData()
        fetchElectionData()
        newUrl !== "newCandidate" && fecthCandidateData()
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
        formData.append('post', choosedPost);
        formData.append('election', choosedElection);

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

    const getPostData = async (electionName) => {
        axios.get(`http://localhost:5000/api/election/getPostByName/${electionName}`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
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
                            <InputLabel id="demo-simple-select-label" sx={{ color: "white", fontSize: 14 }}>Election</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={choosedElection}
                                onChange={(e) => {
                                    setChoosedElection(e.target.value)
                                    getPostData(e.target.value)
                                }}
                                label="Election"
                                sx={{ color: "white", fontSize: 14 }}
                            >
                                {
                                    elections.map((election) => {
                                        return (
                                            <MenuItem value={election.name} key={election._id}>{election.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                        {
                            choosedElection !== "" && (
                                <FormControl fullWidth sx={{ borderBottom: "0.5px solid white", color: "white" }}>
                                    <InputLabel id="demo-simple-select-label" sx={{ color: "white", fontSize: 14 }}>Post</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        value={choosedPost}
                                        onChange={(e) => setChoosedPost(e.target.value)}
                                        label="Post"
                                        sx={{ color: "white", fontSize: 14 }}
                                    >
                                        {
                                            posts.map((post) => {
                                                return (
                                                    <MenuItem value={post} key={post}>{post}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            )
                        }

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
                                <MenuItem value='1'>Province 1</MenuItem>
                                <MenuItem value='2'>Province 2</MenuItem>
                                <MenuItem value='3'>Province 3</MenuItem>
                                <MenuItem value='4'>Province 4</MenuItem>
                                <MenuItem value='5'>Province 5</MenuItem>
                                <MenuItem value='6'>Province 6</MenuItem>
                                <MenuItem value='7'>Province 7</MenuItem>
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