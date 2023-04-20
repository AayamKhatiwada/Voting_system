import axios from "axios";
import { SuccessNoty } from "../Reuseables/notifications";

const VerifyEmail = () => {

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');

    const verifyEmail = async() => {
        await axios.post(`http://localhost:5000/api/user/verifyEmail/${id}`)
        .then((response) => {
            console.log(response.data)
            SuccessNoty(response.data)
        }).catch((err) => {
            // ErrorNoty(err.response.data)
            console.log(err)
        });
    }

    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center mb-4">Email Verification</h1>
                <div className="text-center" style={{ marginTop: "5rem" }}>
                    <button type="button" className="btn btn-primary" id="verifyBtn" onClick={() => verifyEmail()}>Verify</button>
                </div>
            </div>
        </>
    )
}

export default VerifyEmail;