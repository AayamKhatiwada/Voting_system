import { useState } from "react"
import { ErrorNoty, SuccessNoty } from "../../../Reuseables/notifications"
import axios from 'axios'

const AdminPartyRegister = () => {

    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")

    const submitResume = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('description', description);

        await axios.post("http://localhost:5000/api/party/partyRegister", formData)
            .then((response) => {
                SuccessNoty(response.data);
            }).catch((error) => {
                console.error(error);
                ErrorNoty(error.response.data);
            });

    }

    return (
        <>
            <div className="container">
                <form className="row" encType="multipart/form-data" onSubmit={(e) => submitResume(e)}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control my-3" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" className="form-control-file my-3" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    <label htmlFor="info">Description</label>
                    <textarea className="form-control my-3" id="info" rows="3" placeholder="Enter party description" style={{ height: "200px" }} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AdminPartyRegister;