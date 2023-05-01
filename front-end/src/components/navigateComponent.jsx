import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/user/user-action";
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser } from "../store/user/user-selector";
import "./navigateComponent.css"
import IsEmptyObject from "../Reuseables/isEmptyObject";
import PinkBubble from '../assets/Home/PinkBubble.png'
import { SuccessNoty } from "../Reuseables/notifications";

const NavigateComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);

    const logout = () => {
        localStorage.removeItem("accessToken");
        dispatch(removeUser())
        SuccessNoty("LogOut Successful")
    }

    const currentUrl = window.location.pathname;

    return (
        <>
            <nav className="navbar">
                <div className="nav-full">
                    <div className="navbar-header">
                        <a className="nav-title" href="/">Online Voting System</a>
                    </div>
                    <ul className="nav navbar-nav navbar-buttons">
                        <li><a href="/" className={currentUrl === "/" ? "navbar-active": ""}><h4>Home</h4></a></li>
                        <li><a href="about-us" className={currentUrl === "/about-us" ? "navbar-active" : ''}><h4>About</h4></a></li>
                        <li><a href="vote" className={currentUrl === "/vote" ? "navbar-active" : ''}><h4>Vote</h4></a></li>
                        <li><a href="contact-us" className={currentUrl === "/contact-us" ? "navbar-active" : ''}><h4>Contact</h4></a></li>
                        {
                            user.length !== 0 &&
                            <>
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {
                                            (IsEmptyObject(user.image) && user.image !== "[object Object]") ?
                                                <img src={`http://localhost:5000/uploads/${user.image}`} className="user-image" alt="profile" />
                                                :
                                                <div className="user-image">{user.firstName[0]}</div>
                                        }
                                    </div>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li onClick={() => navigate('/profile')} ><a><h4>View profile</h4></a></li>
                                        <li onClick={logout}><a><h4>Log Out</h4></a></li>
                                    </ul>
                                </li>
                            </>
                        }
                    </ul>
                    <img src={PinkBubble} alt="" className="home-pinkBubble" />
                </div>
            </nav>
        </>
    );
}

export default NavigateComponent;