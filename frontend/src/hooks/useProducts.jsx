import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../libs/product";
import { useState } from "react";

const useProducts = () => {
    const [searchProduct, setSearchProduct] = useState("");

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    const products = data || [];

    const searchResults = products.filter((item) =>
        item.name.toLowerCase().includes(searchProduct.toLowerCase())
    );

    return {
        products: searchResults,
        error,
        isLoading,
        isError,
        searchProduct,
        setSearchProduct,
    };
};

export default useProducts;
