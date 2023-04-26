import "./contactusComponent.css"
import NavigateComponent from "./navigateComponent";
import TextField from '@mui/material/TextField';
import ContactImage from '.././assets/Contact/ContactImage.png'
import BlueBubbleFull from '.././assets/Contact/ContactBlueBubbleFull.png'
import { useState } from "react";

const ContactusComponent = () => {
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [message, setMessage] = useState("");

    return (
        <>
            <NavigateComponent />

            <div className="contact-main">
                <div className="contact-title">
                    <img src={BlueBubbleFull} alt="" />
                    Contact <span>Us</span>
                </div>
                <div className="contact-body container">
                    <div className="contact-left-side col-sm-6">
                        <div className="contact-left-title">
                            Get In <span>Touch</span>
                        </div>
                        <div className="contact-textfield">
                            <TextField
                                label="First Name"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                fullWidth
                                InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                                InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                            />
                        </div>

                        <div className="contact-textfield">
                            <TextField
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                                InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                            />
                        </div>

                        <div className="contact-textfield">
                            <TextField
                                label="Phone Number"
                                value={phoneno}
                                onChange={(e) => setPhoneno(e.target.value)}
                                fullWidth
                                InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                                InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                            />
                        </div>

                        <div className="contact-textfield">
                            <TextField
                                label="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                fullWidth
                                InputProps={{ style: { fontSize: 14, color: "white", borderBottom: "0.5px solid white" } }}
                                InputLabelProps={{ style: { fontSize: 14, color: "white" } }}
                            />
                        </div>
                        <button className="btn btn-primary">Send</button>
                    </div>

                    <div className="contact-right-side col-sm-6">
                        <img src={ContactImage} alt="" width="100%" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactusComponent;