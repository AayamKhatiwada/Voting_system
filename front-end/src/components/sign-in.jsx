import './sign-in.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { ErrorNoty, SuccessNoty } from '../Reuseables/notifications';
import SignInImage from ".././assets/LoginImage.png"
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NavigateComponent from './navigateComponent';

const SignInComponent = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const login = async () => {
        await axios.post("http://localhost:5000/api/auth/login", {
            email,
            password,
        }).then((data) => {
            localStorage.setItem('accessToken', data.data.accessToken);
            SuccessNoty("Login Successful")
            navigate('/')
        }).catch((err) => {
            ErrorNoty(err.response.data)
            console.log(err)
        });
    }

    const checkInputAndLogin = () => {
        // Check if email is valid
        if (!(/\S+@\S+\.\S+/.test(email))) {
            ErrorNoty("Invalid email address.");
        } else if (!password) {
            ErrorNoty("Cannot leave password blank")
        } else if (password[0] === " ") {
            ErrorNoty("Password must not start with space")
        } else if (password.length < 3) {
            ErrorNoty("Password must be more than or equal to 3 letter")
        } else {
            login()
        }
    }

    return (
        <>
            <NavigateComponent />
            <div className="signin-main">
                <div className="signin-left col-sm-6">
                    <img src={SignInImage} alt="" width="90%" />
                </div>

                <div className="signin-right col-sm-6">
                    <div className="signin-right-title">
                        Log <span>In</span>
                    </div>

                    <div className="signin-right-desc">
                        Welcome back please enter your details
                    </div>

                    <div className="signin-textfield">
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                            InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                        />
                    </div>

                    <div className="signin-textfield">
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

                    <div className="signin-forget-password">
                        Forget Password ?
                    </div>

                    <div className="signin-register">
                        Not a user? <span onClick={() => navigate('/register')}>Register now</span>
                    </div>

                    <div className="signin-right-button">
                        <button className='btn' onClick={checkInputAndLogin}>Login</button>
                    </div>
                </div>
            </div >
        </>
    );
}

export default SignInComponent;
