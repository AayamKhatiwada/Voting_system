import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/user/user-action";
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser } from "../store/user/user-selector";
import "./navigateComponent.css"

const NavigateComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);

    const logout = () => {
        localStorage.removeItem("accessToken");
        dispatch(removeUser())
    }

    return (
        <>
            <nav className="navbar">
                <div className="container-fluid nav-full">
                    <div className="navbar-header">
                        <a className="nav-title" href="/"><h2>Online Voting System</h2></a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="/"><h4>Home</h4></a></li>
                        <li><a href="about-us"><h4>About</h4></a></li>
                        <li><a href="/vote-party"><h4>Vote Party</h4></a></li>
                        <li><a href="/"><h4>Vote Candidate</h4></a></li>
                        <li><a href="contact-us"><h4>Contact</h4></a></li>
                        {
                            user.length !== 0 &&
                            <>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <div className="user-image">{user.firstName[0]}</div>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li onClick={() => navigate('/profile')} className=""><a><h4>View profile</h4></a></li>
                                        <li onClick={logout}><a><h4>Log Out</h4></a></li>
                                    </ul>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavigateComponent;