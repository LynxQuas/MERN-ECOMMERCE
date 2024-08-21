import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ProductCard from "../../components/admin/ProductCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getAllProducts } from "../../libs/product";
import Spinner from "../../components/ui/Spinner";
import Error from "../../components/ui/Error";
import { useState } from "react";
import { deleteProduct } from "../../libs/product";
import toast from "react-hot-toast";

const Products = () => {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    const queryClient = useQueryClient();

    const [searchedProduct, setSearchProduct] = useState("");

    const handleSearchProduct = (event) => {
        setSearchProduct(event.target.value);
    };

    const filteredBySearchProductName = data?.filter((item) =>
        item.name.toLowerCase().includes(searchedProduct.toLocaleLowerCase())
    );

    const { mutate, isPending } = useMutation({
        mutationFn: (productId) => deleteProduct(productId),
        onSuccess: () => {
            toast.success("Product Deleted Successfully.");
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <Error text={error.message} />;
    }

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="max-w-3xl mx-auto">
                <div className="relative mb-6">
                    <input
                        className="bg-white py-3 px-12 rounded-full w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        onChange={handleSearchProduct}
                        value={searchedProduct}
                        placeholder="Search Products..."
                    />
                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2" />
                </div>

                <div className="space-y-4">
                    {filteredBySearchProductName.length > 0 ? (
                        filteredBySearchProductName
                            ?.slice()
                            .reverse()
                            .map((data) => (
                                <ProductCard
                                    key={data._id}
                                    name={data.name}
                                    productId={data._id}
                                    imageUrl={data.imageUrl}
                                    price={data.price}
                                    isFeature={data.isFeature}
                                    onDeleting={isPending}
                                    onDelete={mutate}
                                    category={data.category}
                                />
                            ))
                    ) : (
                        <h3>Product Not Found.</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
