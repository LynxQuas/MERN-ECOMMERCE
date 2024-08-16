import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        return localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData"))
            : null;
    });

    return (
        <UserContext.Provider
            value={{
                auth,
                setAuth,
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
