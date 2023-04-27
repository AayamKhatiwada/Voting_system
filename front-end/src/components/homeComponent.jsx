import "./homeComponent.css"
import HomeImage from '../assets/Home/HomeImage.png'
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
            axios.get('http://localhost:5000/api/user/getUserData', {
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
                <div className="home-left-side col-sm-6">
                    <img src={HomeImage} alt="" width="90%"/>
                </div>
                <div className="home-right-side col-sm-6">
                    <div className="home-right-title">
                        YOUR VOTE MATTERS<br /> DON'T LOSE IT
                    </div>
                    <div className="home-right-desc">
                        Vote Your Favourite Leader
                    </div>
                    {
                        user.length === 0 &&
                        <div className="home-buttons">
                            <button type="button" className="btn btn-primary home-buttons-login" onClick={changeToSignIn}>Log in</button>
                            <button type="button" className="btn home-buttons-register" onClick={changeToRegister}>Register</button>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default HomeComponent;