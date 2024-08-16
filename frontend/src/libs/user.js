export const login = async (data) => {
    const res = await fetch("http://localhost:3000/api/users/login", {
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
    const res = await fetch("http://localhost:3000/api/users/register", {
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
