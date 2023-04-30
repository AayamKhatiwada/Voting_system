import AdminDashboardComponent from "../AdminDashboardComponent/adminDashboardComponent";

const AdminCandidate = () => {
    return (
        <AdminDashboardComponent>
            <div class="container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>john.doe</td>
                            <td>john.doe@example.com</td>
                            <td>Admin</td>
                        </tr>
                        <tr>
                            <td>jane.doe</td>
                            <td>jane.doe@example.com</td>
                            <td>User</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AdminDashboardComponent>
    )
}

export default AdminCandidate;