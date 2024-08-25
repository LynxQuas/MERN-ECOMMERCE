import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
    const { auth } = useUser();
    const user = auth?.user;

    console.log(user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user && user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
