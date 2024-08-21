import { MinusCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({
    name,
    price,
    imageUrl,
    isFeature,
    productId,
    onDelete,
    category,
}) => {
    const navigate = useNavigate();
    return (
        <div className="flex p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <Link to={`/shop/${category}/${productId}`}>
                <div className="mr-4">
                    <img
                        src={imageUrl}
                        alt="Product"
                        className="object-cover w-28 h-28 rounded-lg"
                    />
                </div>
            </Link>

            <div className="flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{name}</h3>
                    <p className="text-gray-500 text-sm">Price: ${price}</p>
                    {isFeature && (
                        <span className="text-green-500 text-sm">
                            Feature Item
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-end justify-between space-y-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(productId);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                    <MinusCircleIcon className="w-7 h-7" />
                </button>
                <button
                    onClick={() =>
                        navigate(`/admin/create-product/${productId}`)
                    }
                    className="text-purple-500 hover:text-purple-700 transition-colors duration-300"
                >
                    <PencilSquareIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
