import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IsEmptyObject from "../Reuseables/isEmptyObject";
import { ErrorNoty, SuccessNoty } from "../Reuseables/notifications";
import { setCurrentUser } from "../store/user/user-action";
import { selectCurrentUser } from "../store/user/user-selector";
import NavigateComponent from "./navigateComponent";
import './userProfileComponent.css'

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
            alert("Please fill all the field properly")
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
                                    (displayImage!== null || IsEmptyObject(image)) ?
                                    <img src={displayImage!==null ? displayImage: `http://localhost:5000/uploads/${image}`} alt="profile" />
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
