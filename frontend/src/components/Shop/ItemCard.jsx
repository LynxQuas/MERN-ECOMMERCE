import { Link } from "react-router-dom";

const ItemCard = ({ data }) => {
    return (
        <Link
            to={`${data._id}`}
            className="flex flex-col gap-3 w-[12rem] mb-7 md:w-[20rem]"
        >
            <div className="w-full h-[12rem] md:h-[20rem] overflow-hidden rounded-lg relative">
                <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="w-full h-full object-cover"
                />

                {data.onSale && (
                    <div className="absolute text-sm font-semibold top-0 left-0 m-4 rounded-full px-4 py-1 bg-red-500 text-white">
                        <span>On Sale</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between flex-wrap px-2">
                <h3 className="md:text-xl font-semibold">{data.name}</h3>
                <p className="font-bold text-amber-500">${data.price}</p>
            </div>
        </Link>
    );
};

export default ItemCard;
