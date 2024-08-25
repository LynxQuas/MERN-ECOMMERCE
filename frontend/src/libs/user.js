const API = `${import.meta.env.VITE_API}/users`;

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

export const getAllUsers = async () => {
    const res = await fetch(`${API}`);

    if (!res.ok) {
        const errorMsg = await res.json();
        throw new Error(errorMsg.message || "User not found.");
    }

    return res.json();
};

export const deleteUser = async (userId) => {
    const res = await fetch(`${API}/${userId}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorMsg = await res.json();
        throw new Error(errorMsg.message || "User could not delete");
    }

    return res.json();
};

export const addToWishlist = async (wishlistData) => {
    const res = await fetch(`${API}/wishlist/add`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(wishlistData),
    });

    if (res.ok) {
        return res.json();
    }

    throw new Error("Could not add to wishlist.Please try again.");
};

export const removeWishlistItem = async (wishlistData) => {
    const res = await fetch(`${API}/wishlist/remove`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistData),
    });

    if (res.ok) {
        return res.json();
    }

    throw new Error("Could not remove from wishlist.Please try again.");
};

export const getUserWishlist = async (userId) => {
    const res = await fetch(`${API}/${userId}/wishlist`);
    if (res.ok) {
        return res.json();
    }

    throw new Error("Could not get the wishlist please try again.");
};
