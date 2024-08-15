export const getAllProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    return res.json();
};

export const getProductDetails = async (productId) => {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`);
    return res.json();
};
