import { MinusCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import useCustomMutation from "../../hooks/useCustomMutation";
import { deleteProduct } from "../../libs/product";
import { useState } from "react";
import Modal from "../ui/Modal";

const ProductCard = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const { auth } = useUser();

    const { mutate: deleteProductMutation, isPending } = useCustomMutation({
        mutationFn: deleteProduct,
        onSuccessMessage: "Product deleted successfully.",
        onErrorMessage: "Failed to delete product",
        queryKey: ["products"],
    });

    return (
        <>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={() => deleteProductMutation(product._id)}
                    isDeleting={isPending}
                />
            )}
            <div className="flex p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="mr-4">
                    <img
                        src={product?.imageUrl}
                        alt="Product"
                        className="object-cover w-28 h-28 rounded-lg"
                    />
                </div>

                <div className="flex flex-col justify-between flex-grow shrink">
                    <div>
                        <Link
                            to={`/shop/${product.category}/${product._id}`}
                            className="font-bold text-lg text-gray-800 hover:text-blue-500"
                        >
                            {product.name}
                        </Link>
                        <p className="text-gray-500 text-sm">
                            Price: ${product.price}
                        </p>
                        {product.isFeature && (
                            <span className="text-green-500 text-sm">
                                Feature Item
                            </span>
                        )}
                    </div>
                </div>
                {auth?.user?.role === "admin" && (
                    <div className="flex flex-col items-end justify-between space-y-2">
                        <button
                            onClick={() => {
                                console.log("click");
                                setIsModalOpen(true);
                            }}
                            className="text-red-500 hover:text-red-700 transition-colors duration-300"
                        >
                            <MinusCircleIcon className="w-7 h-7" />
                        </button>
                        <button
                            onClick={() =>
                                navigate(`/admin/create-product/${product._id}`)
                            }
                            className="text-purple-500 hover:text-purple-700 transition-colors duration-300"
                        >
                            <PencilSquareIcon className="w-7 h-7" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductCard;
