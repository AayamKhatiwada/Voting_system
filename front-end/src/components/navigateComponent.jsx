import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/user/user-action";
import { selectCurrentUser } from "../store/user/user-selector";
import "./navigateComponent.css"

const NavigateComponent = () => {

    const dispatch = useDispatch();
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
                                <li onClick={logout}><a><h4>Log Out</h4></a></li>
                                <li className="nav-item">
                                    <a href="#">
                                        <div className="user-image">{user.firstName[0]}</div>
                                    </a>
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