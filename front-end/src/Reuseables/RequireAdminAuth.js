import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentAdmin } from "../store/admin/admin-selector";

function RequireAdminAuth({ children }) {
    const authed = useSelector(selectCurrentAdmin);
    console.log(authed)

    return !(Object.keys(authed).length === 0) ? (
        children
    ) : (
        <Navigate to="/" />
    );
}

export default RequireAdminAuth;