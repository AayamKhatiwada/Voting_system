import "./homeComponent.css"
import HomeImage from '../assets/home-image.png'
import { useNavigate } from "react-router-dom";
import NavigateComponent from "./navigateComponent";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user-selector";
import { useEffect } from "react";
import axios from "axios";
import { setCurrentUser } from "../store/user/user-action";

const HomeComponent = () => {

    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');

    const changeToSignIn = () => {
        navigate("/signIn");
    }

    const changeToRegister = () => {
        navigate("/register");
    }

    useEffect(() => {
        const getUserData = async () => {
            axios.get('/user/getUserData', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    dispatch(setCurrentUser(response.data));
                })
                .catch(error => {
                    console.log(error);
                });
        }
        accessToken !== null && getUserData()
    }, [accessToken, dispatch])

    return (
        <>
            <NavigateComponent />

            <div className="home-body">
                <div className="home-left-part">
                    <div className="home-title">YOUR VOTE MATTERS DON'T LOSE IT</div>
                    {
                        user.length === 0 &&
                        <div className="home-buttons">
                            <button type="button" className="btn btn-primary" onClick={changeToSignIn}>Log in</button>
                            <button type="button" className="btn btn-secondary" onClick={changeToRegister}>Register</button>
                        </div>
                    }
                </div>
                <div className="home-image">
                    <img src={HomeImage} alt="Voter_box" width="100%" />
                </div>
            </div>
        </>
    );
}

export default HomeComponent;