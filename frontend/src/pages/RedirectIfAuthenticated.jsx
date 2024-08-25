import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const RedirectIfAuthenticated = ({ children }) => {
    const { auth } = useUser();

    if (auth) {
        return (
            <Navigate
                to={auth.user?.role === "admin" ? "/admin" : "/"}
                replace
            />
        );
    }

    return children;
};

export default RedirectIfAuthenticated;
