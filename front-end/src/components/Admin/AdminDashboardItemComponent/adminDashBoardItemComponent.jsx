import AdminDashboardComponent from '../AdminDashboardComponent/adminDashboardComponent';
import './adminDashboardItemComponent.css'

const AdminDashboardItemComponent = () => {
    return (
        <>
            <AdminDashboardComponent>
                <div>
                    <div>
                        Number of users: 10
                    </div>
                    <div>
                        Number of parties: 11
                    </div>
                    <div>
                        Number of verified users: 12
                    </div>
                </div>
            </AdminDashboardComponent>
        </>
    )
}

export default AdminDashboardItemComponent;