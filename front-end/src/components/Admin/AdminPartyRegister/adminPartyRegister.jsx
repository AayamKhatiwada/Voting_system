import { useState } from "react"
import { ErrorNoty, SuccessNoty } from "../../../Reuseables/notifications"

const AdminPartyRegister = () => {

    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [htmlData, setHtmlData] = useState("")

    const submitResume = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="container">
                <form className="row" encType="multipart/form-data" onSubmit={(e) => submitResume(e)}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control my-3" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" className="form-control-file my-3" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    <label htmlFor="info">Additional Information</label>
                    <textarea className="form-control my-3" id="info" rows="3" placeholder="Enter html resume" style={{ height: "500px" }} value={htmlData} onChange={(e) => setHtmlData(e.target.value)}></textarea>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AdminPartyRegister;