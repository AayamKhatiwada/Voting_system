import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../store/user/user-selector";

function RequireAuth({ children }) {
    const authed = useSelector(selectCurrentUser);
    
    return !(Object.keys(authed).length === 0) ? (
        children
    ) : (
        <Navigate to="/signIn" />
    );
}

export default RequireAuth;