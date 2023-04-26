import './sign-in.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { ErrorNoty, SuccessNoty } from '../Reuseables/notifications';

const SignInComponent = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 left-side">
                    <div className='text-center'>
                        <h1>Welcome Back</h1>
                        <p>Welcome back please enter your details</p>
                    </div>
                    <div>
                        <h3>Email</h3>
                        <input type="text" placeholder="Please enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Password</h3>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='same-line-spaceBetween'>
                        <div className='same-line'>
                            <div style={{ marginRight: "5px" }}>
                                <input type="checkbox" name="remember" />
                            </div>
                            <label name="remember">Remember for 30days</label>
                        </div>
                        <a href='/'>Forget Password</a>
                    </div>
                    <button type="button" className='btn btn-success button-style' onClick={login}>Sign in</button>
                    <button type="button" className='btn btn-light button-style'>Sign in with Google</button>
                    <p className='text-center'>Dont't have an account? &nbsp;<a href="/register">Sign Up</a></p>
                </div>
                <div className="col-sm-6">
                    {/* <img src={VoterBox} alt="Voter_box" width="100%" className='image-style' /> */}
                </div>
            </div>
        </div>
    );
}

export default SignInComponent;
