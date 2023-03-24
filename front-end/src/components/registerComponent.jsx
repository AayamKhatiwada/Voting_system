import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

    const [errorFname, setErrorFname] = useState(false);
    const [errorLname, setErrorLname] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorCpassword, setErrorCpassword] = useState(false);
    const [errorContact, setErrorContact] = useState(false);
    const [errorCitizennum, setErrorCitizennum] = useState(false);

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

        if (!password || password[0] === " ") {
            setErrorPassword(true)
        } else {
            setErrorPassword(false)
        }

        if (cpassword !== password) {
            setErrorCpassword(true)
        } else {
            setErrorCpassword(false)
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
            !password || password[0] === " " ||
            password !== cpassword ||
            !contact || contact[0] === " " ||
            !citizennum || citizennum[0] === " "
        ) {
            console.log(province, gender)
            alert("Please fill all the field properly")
        }
        else {
            await axios.post("/auth/register", {
                fname,
                lname,
                email,
                password,
                province,
                contact,
                citizennum,
                gender
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
                            {
                                errorFname === true && (
                                    <div className="register-error-message">Cannot leave the field empty</div>
                                )
                            }
                        </div>
                        <div>
                            <div>Last Name</div>
                            <input type="text"
                                placeholder="Please enter your last name"
                                className="input-box rounded"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                            />
                            {
                                errorLname === true && (
                                    <div className="register-error-message">Cannot leave the field empty</div>
                                )
                            }
                        </div>
                        <div>
                            <div>Email</div>
                            <input type="email"
                                placeholder="Please enter your email address"
                                className="input-box rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {
                                errorEmail === true && (
                                    <div className="register-error-message">Cannot leave the field empty</div>
                                )
                            }
                        </div>
                        <div>
                            <div>Password</div>
                            <input type="password"
                                placeholder="Please enter your password"
                                className="input-box rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {
                                errorPassword === true && (
                                    <div className="register-error-message">Cannot leave the field empty</div>
                                )
                            }
                        </div>
                        <div>
                            <div>Confirm Password</div>
                            <input type="password"
                                placeholder="Please enter your password"
                                className="input-box rounded"
                                value={cpassword}
                                onChange={(e) => setCpassword(e.target.value)}
                            />
                            {
                                errorCpassword === true && (
                                    <div className="register-error-message">Password and Confirm password doesnot match</div>
                                )
                            }
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
                            {
                                errorContact === true && (
                                    <div className="register-error-message">Cannot leave the field empty</div>
                                )
                            }
                        </div>
                        <div>
                            <div>Citizenship Number</div>
                            <input type="number"
                                placeholder="Please enter your citizenship number"
                                className="input-box rounded"
                                value={citizennum}
                                onChange={(e) => setCitizennum(e.target.value)}
                            />
                            {
                                errorCitizennum === true && (
                                    <div className="register-error-message">Cannot leave the field empty</div>
                                )
                            }
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