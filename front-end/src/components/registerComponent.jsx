import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./registerComponent.css"
import axios from 'axios'
import { ErrorNoty, SuccessNoty } from '../Reuseables/notifications'
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import RegisterImage from '.././assets/RegisterImage.png'
import NavigateComponent from './navigateComponent'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RegisterComponent = () => {

    const navigate = useNavigate();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [province, setProvince] = useState("1");
    const [contact, setContact] = useState('');
    const [citizennum, setCitizennum] = useState('');
    const [gender, setGender] = useState("male");

    const [error, setError] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showCpassword, setShowCpassword] = useState(false);
    const handleClickShowCpassword = () => setShowCpassword((show) => !show);

    const handleSubmit = async () => {

        if (!fname) {
            ErrorNoty("Cannot leave first name blank")
            setError(true)
        } else if (fname[0] === " ") {
            ErrorNoty("First name must not start with space")
            setError(true)
        } else if (fname.length < 3) {
            ErrorNoty("First name must be more than or equal to 3 letter")
            setError(true)
        }

        if (!lname) {
            ErrorNoty("Cannot leave last name blank")
            setError(true)
        } else if (lname[0] === " ") {
            ErrorNoty("last name must not start with space")
            setError(true)
        } else if (lname.length < 3) {
            ErrorNoty("First name must be more than or equal to 3 letter")
            setError(true)
        }

        // Check if email is valid
        if (/\S+@\S+\.\S+/.test(email)) {

        } else {
            ErrorNoty("Invalid email address.");
            setError(true)
        }

        if (!password) {
            ErrorNoty("Cannot leave password blank")
            setError(true)
        } else if (password[0] === " ") {
            ErrorNoty("Password must not start with space")
            setError(true)
        } else if (password.length < 3) {
            ErrorNoty("Password must be more than or equal to 3 letter")
            setError(true)
        }

        if (cpassword !== password) {
            ErrorNoty("Mismatch password and conform password")
            setError(true)
        }

        if (!contact) {
            ErrorNoty("Cannot leave phone number blank")
            setError(true)
        } else if (contact[0] === " ") {
            ErrorNoty("Phone number must not start with space")
            setError(true)
        } else if (contact.length !== 10) {
            ErrorNoty("Phone number must be of 10 digits")
            setError(true)
        }

        if (!citizennum) {
            ErrorNoty("Cannot leave citizenship number blank")
            setError(true)
        } else if (citizennum[0] === " ") {
            ErrorNoty("Citizenship number must not start with space")
            setError(true)
        }

        if (!fname || fname[0] === " " || fname.length < 3 ||
            !lname || lname[0] === " " || lname.length < 3 ||
            !password || password[0] === " " || password.length < 3 ||
            !contact || contact[0] === " " || contact.length !== 10 ||
            !citizennum || citizennum[0] === " " ||
            !(/\S+@\S+\.\S+/.test(email)) ||
            cpassword !== password
        ) {
            setError(true)
        }
        else {
            await axios.post("http://localhost:5000/api/auth/register", {
                fname,
                lname,
                email,
                password,
                province,
                contact,
                citizennum,
                gender,
            }).then(() => {
                SuccessNoty("Register Successful")
                navigate('/signIn')
            }).catch((err) => {
                console.log(err)
                ErrorNoty(err.response.data)
            });
        }
    }

    return (
        <>
            <NavigateComponent />

            <div className="register-main">
                <div className="register-left col-sm-5">
                    <div className="register-left-title">
                        Join for <span>VOTE</span>
                    </div>
                    <img src={RegisterImage} alt="" width='80%' />
                </div>

                <div className="register-right col-sm-6">

                    <div className="register-textfield">
                        <TextField
                            label="First Name"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            fullWidth
                            InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                            InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                        />
                    </div>

                    <div className="register-textfield">
                        <TextField
                            label="Last Name"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            fullWidth
                            InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                            InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                        />
                    </div>

                    <div className="register-textfield">
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                            InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                        />
                    </div>

                    <div className="register-textfield">
                        <FormControl sx={{ fontSize: 14, width: "100%", borderBottom: "0.5px solid white", color: "white" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: "white", fontSize: 14 }}>Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            sx={{ color: "white" }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ color: "white", fontSize: 14 }}
                            />
                        </FormControl>
                    </div>

                    <div className="register-textfield">
                        <FormControl sx={{ fontSize: 14, width: "100%", borderBottom: "0.5px solid white", color: "white" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: "white", fontSize: 14 }}>Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showCpassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowCpassword}
                                            edge="end"
                                            sx={{ color: "white" }}
                                        >
                                            {showCpassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                                value={cpassword}
                                onChange={(e) => setCpassword(e.target.value)}
                                sx={{ color: "white", fontSize: 14 }}
                            />
                        </FormControl>
                    </div>

                    <div className="register-textfield">
                        <TextField
                            label="Phone Number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            fullWidth
                            InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                            InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                        />
                    </div>

                    <div className="register-textfield">
                        <TextField
                            label="Citizenship Number"
                            value={citizennum}
                            onChange={(e) => setCitizennum(e.target.value)}
                            fullWidth
                            InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                            InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                        />
                    </div>

                    <div className="register-textfield">
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
                    </div>

                    <div className="register-textfield">
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
                    <div style={{ display: 'flex', justifyContent: "center", margin: "0px" }}>
                        <button type='submit' className="btn btn-primary register-submit-button" onClick={handleSubmit}>Register</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterComponent;