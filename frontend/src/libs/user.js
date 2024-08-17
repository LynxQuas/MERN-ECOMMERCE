const API = `${import.meta.env.VITE_API}/users`;

console.log(API);

export const login = async (data) => {
    const res = await fetch(`${API}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "Application/json",
        },
    });

    if (!res.ok) {
        const errorMsg = await res.json();
        throw new Error(errorMsg.message || "Login Failed");
    }

    return res.json();
};

export const register = async (data) => {
    const res = await fetch(`${API}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "Application/json",
        },
    });

    if (!res.ok) {
        const errorMsg = await res.json();
        throw new Error(errorMsg.message || "Registeration failed.");
    }

    return res.json();
};

export const getUserById = async (userId) => {
    const res = await fetch(`${API}/${userId}`);

    if (!res.ok) {
        const errorMsg = await res.json();
        throw new Error(errorMsg.message || "User not found.");
    }

    return res.json();
};
