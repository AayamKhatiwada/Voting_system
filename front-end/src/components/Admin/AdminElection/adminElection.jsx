import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent";

const AdminElection = () => {

    const deleteParty = () => {}

    return (
        <>
            <AdminDashboardComponent>
                <div className="container">
                    <div className="party-add-button">
                        <a href="election/newRegister" className="btn btn-primary">Add Party</a>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>party.name</td>
                                <td>party.description</td>
                                <td><a href={"party/${party._id}"} className="btn btn-primary">Edit</a> <div className="btn btn-danger" onClick={() => deleteParty()}>Delete</div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </AdminDashboardComponent>
        </>
    )
}

export default AdminElection;