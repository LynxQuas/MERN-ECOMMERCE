import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../libs/product";
import { useParams } from "react-router-dom";

const useProductDetails = () => {
    const { productId } = useParams();
    return useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductDetails(productId),
    });
};

export default useProductDetails;
