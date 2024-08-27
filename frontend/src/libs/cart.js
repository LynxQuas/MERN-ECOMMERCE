const API = `${import.meta.env.VITE_API}/orders`;

export const getOrderByUserId = async (userId) => {
    const res = await fetch(`${API}/${userId}`);
    if (res.ok) {
        return res.json();
    }
    throw new Error("Cart Item not found.");
};

export const addToCartFetch = async (data) => {
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        return res.json();
    }
    throw new Error("Failed to create order.");
};

export const removeCartItem = async ({ userId, productId }) => {
    const res = await fetch(`${API}/${productId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });
    if (res.ok) {
        return res.json();
    }

    throw new Error("Failed to remove item.Please try again.");
};

export const updateQuantity = async ({
    userId,
    productId,
    quantity,
    size,
    color,
}) => {
    const res = await fetch(`${API}/update-quantity`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId, quantity, size, color }),
    });

    if (res.ok) {
        return res.json();
    }

    throw new Error("Failed to update quantity. Please try again.");
};
