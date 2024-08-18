import { MinusCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ name, price, imageUrl }) => {
    return (
        <div className="flex p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="mr-4">
                <img
                    src={imageUrl}
                    alt="Product"
                    className="object-cover w-28 h-28 rounded-lg"
                />
            </div>

            <div className="flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{name}</h3>
                    <p className="text-gray-500 text-sm">Price: ${price}</p>
                    <p className="mt-2">
                        <span className="text-green-600 text-lg font-semibold">
                            5
                        </span>{" "}
                        <span className="text-gray-500">in stock</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end justify-between space-y-2">
                <button className="text-red-500 hover:text-red-700 transition-colors duration-300">
                    <MinusCircleIcon className="w-7 h-7" />
                </button>
                <button className="text-purple-500 hover:text-purple-700 transition-colors duration-300">
                    <PencilSquareIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
