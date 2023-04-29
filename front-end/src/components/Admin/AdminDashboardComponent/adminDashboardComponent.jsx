import './adminDashboardComponent.css'
import { useDispatch } from 'react-redux';
import { removeAdmin } from '../../../store/admin/admin-action';
import { useNavigate } from 'react-router-dom';

const AdminDashboardComponent = ({children}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    var name = "Dashboard"
    const currentUrl = window.location.pathname;


    if(currentUrl === "/admin/"){
        name = "Dashboard"
    }else if (currentUrl.includes("/admin/voters")){
        name = "Voters"
    } else if (currentUrl.includes("/admin/party")){
        name = "Party"
    } else if (currentUrl.includes("/admin/candidate")){
        name = "Candidate"
    }

    const logout = () => {
        dispatch(removeAdmin());
        navigate('/')
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 main-content">
                        <div className='admin-dashboard-header'>
                            <div className="h1 text-secondary">{name}</div>
                            <div className="dropdown">
                                <div className="admin-profile" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBQn5Cw7Sx51hfAqjTm2iWshuqBA6UVnWL0g&usqp=CAU" className="admin-button link" id="floating-button" alt="profile" />
                                    <div className='p-3 admin-profile-text h4'>Bises Adk</div>
                                </div>
                                <div className="dropdown-menu admin-nav-dropdown" aria-labelledby="navbarDropdownMenuLink">
                                    <div onClick={logout}>Log Out</div>
                                </div>
                            </div>
                        </div>
                        <hr style={{ marginTop: "0" }} />

                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboardComponent;