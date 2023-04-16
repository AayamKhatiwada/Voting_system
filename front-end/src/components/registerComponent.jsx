import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./registerComponent.css"
import axios from 'axios'
import { ErrorNoty, SuccessNoty } from '../Reuseables/notifications'

const RegisterComponent = () => {

    const navigate = useNavigate();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [province, setProvince] = useState('one');
    const [contact, setContact] = useState('');
    const [citizennum, setCitizennum] = useState('');
    const [gender, setGender] = useState('male');

    const [error, setError] = useState(false)

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
            !citizennum || citizennum[0] === " "||
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
            <div className="d-flex justify-content-center align-items-center head">
                <div className="main-container">
                    <h3 className="text-center text-success">Register</h3>

                    <div className="input-form rounded">
                        <div>
                            <div>First Name</div>
                            <input type="text"
                                placeholder="Please enter your first name"
                                className="input-box rounded"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Last Name</div>
                            <input type="text"
                                placeholder="Please enter your last name"
                                className="input-box rounded"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Email</div>
                            <input type="email"
                                placeholder="Please enter your email address"
                                className="input-box rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Password</div>
                            <input type="password"
                                placeholder="Please enter your password"
                                className="input-box rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Confirm Password</div>
                            <input type="password"
                                placeholder="Please enter your password"
                                className="input-box rounded"
                                value={cpassword}
                                onChange={(e) => setCpassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Province
                                <span>
                                    <select
                                        type="text"
                                        name="province"
                                        id="province"
                                        value={province}
                                        onChange={(e) => setProvince(e.target.value)}
                                        style={{ margin: "5px 15px" }}
                                    >
                                        <option value="one">Province No. 1</option>
                                        <option value="two">Province No. 2</option>
                                        <option value="three">Province No. 3</option>
                                        <option value="four">Province No. 4</option>
                                        <option value="five">Province No. 5</option>
                                        <option value="six">Province No. 6</option>
                                        <option value="seven">Province No. 7</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                        <div>
                            <div>Phone Number</div>
                            <input type="number"
                                placeholder="Please enter your phone number"
                                className="input-box rounded"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Citizenship Number</div>
                            <input type="number"
                                placeholder="Please enter your citizenship number"
                                className="input-box rounded"
                                value={citizennum}
                                onChange={(e) => setCitizennum(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Gender
                                <span>
                                    <select
                                        type="text"
                                        name="gender"
                                        id="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        style={{ margin: "5px 15px" }}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </span>
                            </div>
                        </div>

                        <button type='submit' className="btn btn-success register-submit-button" onClick={handleSubmit}>Register</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterComponent;