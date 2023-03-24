import { useState } from "react";
import NavigateComponent from "./navigateComponent";
import './userProfileComponent.css'

const UserProfileComponent = () => {

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

    const handleSubmit = () => {

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
                            <img src="https://randomwordgenerator.com/img/picture-generator/chair-1840011_640.jpg" alt="" />
                        </div>
                        <div className="profile-left-name">
                            Bises Adk
                        </div>
                    </div>
                    <div className="profile-right col-sm-7">
                        <div className="profile-right-textbox">
                            <div className="col-sm-6">First Name</div>
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
                        <div className="profile-right-textbox">
                            <div className="col-sm-6">Last Name</div>
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
                        <div className="profile-right-textbox">
                            <div className="col-sm-6">Email</div>
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
                        <div className="profile-right-textbox">
                            <div className="col-sm-6">Password</div>
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
                        <div className="profile-right-textbox">
                            <div className="col-sm-6">Confirm Password</div>
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
                        <div className="profile-right-textbox">
                            <div className="col-sm-6">Province
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
                        <div className="profile-right-textbox">
                            <div className="col-sm-6">Phone Number</div>
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
                        <div className="profile-right-textbox">
                            <div className="col-sm-6">Citizenship Number</div>
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
                        <div className="profile-right-textbox">
                            <div className="col-sm-6">Gender
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
