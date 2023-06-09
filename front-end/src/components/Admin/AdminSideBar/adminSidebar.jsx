import { useNavigate } from 'react-router-dom';
import './adminSidebar.css'

const AdminSideBar = () => {

    const currentUrl = window.location.pathname;
    const navigate = useNavigate();

    return (
        <nav className="col-md-2 d-none d-md-block sidebar">
            <div className="sidebar-sticky">
                <div className="adminsidebar-title adminsidebar-underline-padding">Admin</div>
                <div className="adminsidebar-options">
                    <div className={currentUrl === "/admin/" ? "adminsidebar-active nav-link link": "nav-link link"} id='dashboard' onClick={() => navigate("/admin/")}>Dashboard</div>
                    <div className={currentUrl.includes("/admin/party") ? "adminsidebar-active nav-link link": "nav-link link"} id='community' onClick={() => navigate("/admin/party")}>Party</div>
                    <div className={currentUrl.includes("/admin/voters") ? "adminsidebar-active nav-link link": "nav-link link"} id='community' onClick={() => navigate("/admin/voters")}>Voters</div>
                    <div className={currentUrl.includes("/admin/candidate") ? "adminsidebar-active nav-link link": "nav-link link"} id='community' onClick={() => navigate("/admin/candidate")}>Candidate</div>
                    <div className={currentUrl.includes("/admin/election") ? "adminsidebar-active nav-link link": "nav-link link"} id='community' onClick={() => navigate("/admin/election")}>Election</div>
                </div>
            </div>
        </nav>
    )
}

export default AdminSideBar;