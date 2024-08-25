import { Link } from "react-router-dom";

const ItemCard = ({ data }) => {
    return (
        <Link
            to={`${data._id}`}
            className="flex flex-col gap-4 w-full md:w-[18rem] md:h-[28rem] bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative">
                <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="w-full h-[20rem] object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-105"
                />
                {data.onSale && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        On Sale
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300">
                    {data.name}
                </h3>
                <p className="font-bold text-amber-500 text-lg">
                    ${data.price}
                </p>
            </div>
        </Link>
    );
};

export default ItemCard;
