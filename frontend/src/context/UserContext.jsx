import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        return localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData"))
            : null;
    });

    const login = (userData) => {
        localStorage.setItem("userData", JSON.stringify(userData));
        setAuth(userData);
    };

    const logout = () => {
        localStorage.removeItem("userData");
        setAuth(null);
    };

    return (
        <UserContext.Provider
            value={{
                auth,
                setAuth,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};

export default UserContextProvider;
