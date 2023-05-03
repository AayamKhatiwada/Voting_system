import axios from "axios";
import { ErrorNoty, SuccessNoty } from "../Reuseables/notifications";
import { useState } from "react";

const VerifyEmail = () => {

    const [phoneOTP, setPhoneOTP] = useState('');
    const [emailOTP, setEmailOTP] = useState('');
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');

    const verifyEmail = async () => {
        await axios.post(`http://localhost:5000/api/user/verifyEmail/${id}`,{
            emailOTP
        })
            .then((response) => {
                console.log(response)
                SuccessNoty(response.data)
            }).catch((err) => {
                console.log(err)
                ErrorNoty(err.response.data)
            });
    }

    const verifyPhone = async () => {
        await axios.post(`http://localhost:5000/api/user/verifyPhone/${id}`,{
            phoneOTP
        })
            .then((response) => {
                console.log(response.data)
                SuccessNoty(response.data)
            }).catch((err) => {
                ErrorNoty(err.response.data)
                console.log(err)
            });
    }

    return (
        <>
            <div className="container">
                <h1 style={{ marginBottom: "3rem" }}>Verification page</h1>
                <div>
                    <div style={{ marginBottom: "3rem" }}>
                        <div className="form-group">
                            <label htmlFor="email-otp">Email OTP:</label>
                            <input type="text" className="form-control" id="email-otp" placeholder="Enter Email OTP" value={emailOTP} onChange={(e) => setEmailOTP(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => verifyEmail()}>Verify Email</button>
                        <button type="button" className="btn btn-link" id="resend-otp">Send OTP again</button>
                    </div>
                    <div>
                        <div className="form-group">
                            <label htmlFor="phone-otp">Phone Number OTP:</label>
                            <input type="text" className="form-control" id="phone-otp" placeholder="Enter Phone Number OTP" value={phoneOTP} onChange={(e) => setPhoneOTP(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => verifyPhone()}>Verify Phone number</button>
                        <button type="button" className="btn btn-link" id="resend-otp">Send OTP again</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyEmail;