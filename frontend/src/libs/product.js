const API = `${import.meta.env.VITE_API}/products`;

export const getAllProducts = async () => {
    const res = await fetch(API);
    return res.json();
};

export const getProductDetails = async (productId) => {
    const res = await fetch(`${API}/${productId}`);
    return res.json();
};

export const createOrUpdateProduct = async (productData, isUpdate = false) => {
    console.log(productData);
    const url = isUpdate ? `${API}/${productData.productId}` : `${API}`;
    const method = isUpdate ? "PUT" : "POST";

    const res = await fetch(url, {
        method,
        body: JSON.stringify(productData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
    }

    return res.json();
};

export const deleteProduct = async (productId) => {
    const res = await fetch(`${API}/${productId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        return res.json();
    }

    throw new Error("Could not delete product.Please try again.");
};
