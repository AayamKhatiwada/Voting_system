import { useState } from 'react';
import AdminDashboardItemComponent from '../AdminDashboardItemComponent/adminDashBoardItemComponent';
import AdminPartyRegister from '../AdminPartyRegister/adminPartyRegister';
import AdminSideBar from '../AdminSideBar/adminSidebar';
import './adminDashboardComponent.css'

const AdminDashboardComponent = () => {

    const [options, setOptions] = useState("Dashboard")
    const [displayOption, setDisplayOption] = useState(false);
    const [displayAdminOption, setDisplayAdminOption] = useState(false);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <AdminSideBar setOptions={setOptions} options={options} />
                    <div className="col-md-10 main-content">
                        <div className='admin-dashboard-header'>
                            <div className="h1 text-secondary">{options}</div>
                            <div className='admin-profile' onClick={() => setDisplayAdminOption(!displayAdminOption)}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBQn5Cw7Sx51hfAqjTm2iWshuqBA6UVnWL0g&usqp=CAU" className="admin-button link" id="floating-button" alt="profile"/>
                                <div className='p-3 admin-profile-text h4'>Bises Adk</div>
                            </div>
                        </div>
                        {
                            displayAdminOption && (
                                <div className="floating-menu-admin" id="floating-menu-admin">
                                    <ul>
                                        <li>Log Out</li>
                                    </ul>
                                </div>
                            )
                        }

                        <button className="floating-button link" id="floating-button" onClick={() => setDisplayOption(!displayOption)}>+</button>
                        {
                            displayOption && (

                                <div className="floating-menu" id="floating-menu">
                                    <ul>
                                        <li onClick={() => setOptions("Party register")}>Add a party</li>
                                    </ul>
                                </div>
                            )
                        }

                        {
                            options === "Dashboard" && <AdminDashboardItemComponent />
                        }

                        {
                            options === "Party register" && <AdminPartyRegister />
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboardComponent;