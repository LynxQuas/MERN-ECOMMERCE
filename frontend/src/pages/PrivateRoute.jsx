import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({ requireRole, children }) => {
    const { auth } = useUser();
    const user = auth?.user;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user && user.role !== requireRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
