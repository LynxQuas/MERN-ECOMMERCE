const API = `${import.meta.env.VITE_API}/products`;

export const getAllProducts = async () => {
    const res = await fetch(API);
    return res.json();
};

export const getProductDetails = async (productId) => {
    const res = await fetch(`${API}/${productId}`);
    return res.json();
};

export const createProduct = async (productData) => {
    const res = await fetch(`${API}`, {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
            "content-type": "application/json",
        },
    });

    return res.json();
};
