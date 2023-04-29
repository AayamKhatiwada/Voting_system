import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent";

const AdminVoters = () => {
    return (
        <>
            <AdminDashboardComponent>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John Doe</td>
                                <td>johndoe@example.com</td>
                                <td>555-555-5555</td>
                                <td>123 Main St, Anytown USA</td>
                                <td><a href="#" className="btn btn-primary">View</a> <a href="party/" className="btn btn-danger">Delete</a></td>
                            </tr>
                            <tr>
                                <td>Jane Smith</td>
                                <td>janesmith@example.com</td>
                                <td>555-555-5555</td>
                                <td>456 Oak St, Anytown USA</td>
                                <td><a href="#" className="btn btn-primary">View</a> <a href="party/" className="btn btn-danger">Delete</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </AdminDashboardComponent>
        </>
    )
}

export default AdminVoters;