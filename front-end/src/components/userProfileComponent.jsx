import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IsEmptyObject from "../Reuseables/isEmptyObject";
import { ErrorNoty, SuccessNoty } from "../Reuseables/notifications";
import { setCurrentUser } from "../store/user/user-action";
import { selectCurrentUser } from "../store/user/user-selector";
import NavigateComponent from "./navigateComponent";
import './userProfileComponent.css'
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const UserProfileComponent = () => {

    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem('accessToken');

    const [fname, setFname] = useState(user.firstName);
    const [lname, setLname] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [province, setProvince] = useState(user.province);
    const [contact, setContact] = useState(user.phoneNumber);
    const [citizennum, setCitizennum] = useState(user.citizenNumber);
    const [gender, setGender] = useState(user.gender);
    const [image, setImage] = useState(user.image);
    const [displayImage, setDisplayImage] = useState(null);
    const [emailVerified, setEmailVerified] = useState(user.is_Email_Verified)
    const [phoneVerified, setPhoneVerified] = useState(user.is_Phone_Number_Verified)

    const [errorFname, setErrorFname] = useState(false);
    const [errorLname, setErrorLname] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorContact, setErrorContact] = useState(false);
    const [errorCitizennum, setErrorCitizennum] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file)
        const reader = new FileReader();

        reader.onloadend = () => {
            setDisplayImage(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setDisplayImage(null);
        }
    }

    const handleSubmit = async () => {

        if (!fname || fname[0] === " ") {
            setErrorFname(true)
        } else {
            setErrorFname(false)
        }

        if (!lname || lname[0] === " ") {
            setErrorLname(true)
        } else {
            setErrorLname(false)
        }

        if (!email || email[0] === " ") {
            setErrorEmail(true)
        } else {
            setErrorEmail(false)
        }

        if (!contact || contact[0] === " ") {
            setErrorContact(true)
        } else {
            setErrorContact(false)
        }

        if (!citizennum || citizennum[0] === " ") {
            setErrorCitizennum(true)
        } else {
            setErrorCitizennum(false)
        }

        if (!fname || fname[0] === " " ||
            !lname || lname[0] === " " ||
            !email || email[0] === " " ||
            !contact || contact[0] === " " ||
            !citizennum || citizennum[0] === " "
        ) {
            console.log(province, gender)
            ErrorNoty("Please fill all the field properly")
        }
        else {
            const formData = new FormData();
            formData.append('firstName', fname);
            formData.append('lastName', lname);
            formData.append('email', email);
            formData.append('province', province);
            formData.append('phoneNumber', contact);
            formData.append('citizenNumber', citizennum);
            formData.append('image', image);

            await axios.put(`http://localhost:5000/api/user/${user._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then((response) => {
                // console.log(response)   
                SuccessNoty("Data updated successfully");
                dispatch(setCurrentUser(response.data));
            }).catch((error) => {
                console.error(error);
                ErrorNoty(error.response.data);
            });
        }
    }

    return (
        <>
            <NavigateComponent />
            <section>
                <div className="profile-main">
                    <div className="profile-left col-sm-5">
                        <div className="profile-left-account">
                            My Account
                        </div>
                        <div className="profile-left-image">
                            <label htmlFor="file-upload">
                                {
                                    ((displayImage !== null || IsEmptyObject(image)) && user.image !== "[object Object]") ?
                                        <img src={displayImage !== null ? displayImage : `http://localhost:5000/uploads/${image}`} alt="profile" />
                                        :
                                        <div className="profile-user-image">{user.firstName[0]}</div>
                                }
                            </label>
                            <input type="file" id="file-upload" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
                        </div>
                        <div className="profile-left-name">
                            {user.firstName + ' ' + user.lastName}
                        </div>
                    </div>
                    <div className="profile-right col-sm-7">
                        <div className="profile-right-textbox">
                            <TextField
                                label="First Name"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                fullWidth
                                InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                                InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                            />
                        </div>
                        <div className="profile-right-textbox">
                            <TextField
                                label="Last Name"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                fullWidth
                                InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                                InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                            />
                        </div>
                        <div className="profile-right-textbox">
                            <div style={{ width: "100%" }} >
                                <TextField
                                    label="Email"
                                    value={email}
                                    fullWidth
                                    InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                                    InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                                />

                                {
                                    emailVerified === "0" && (
                                        <>
                                            <br />
                                            <div className="register-error-message">Email not verified</div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <div className="profile-right-textbox">
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
                        </div>
                        <div className="profile-right-textbox">
                            <TextField
                                label="Phone Number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                fullWidth
                                InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                                InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                            />
                            {
                                phoneVerified === "0" && (
                                    <>
                                        <br />
                                        <div className="register-error-message">Phone Number not verified</div>
                                    </>
                                )
                            }
                        </div>
                        <div className="profile-right-textbox">
                            <TextField
                                label="Citizenship Number"
                                value={citizennum}
                                onChange={(e) => setCitizennum(e.target.value)}
                                fullWidth
                                InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                                InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                            />
                        </div>
                        <div className="profile-right-textbox">
                            <FormControl fullWidth sx={{ borderBottom: "0.5px solid white", color: "white" }}>
                                <InputLabel id="demo-simple-select-label" sx={{ color: "white", fontSize: 14 }}>Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    label="Gender"
                                    sx={{ color: "white", fontSize: 14 }}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="profile-right-button">
                            <button type='submit' className="btn btn-success" onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserProfileComponent;
