import ProductRating from "../Shop/ProductRating";

const ProductDetails = ({
    name,
    ratings,
    description,
    salePrice,
    price,
    onSale,
}) => {
    return (
        <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
            <div className="flex items-center gap-2">
                <ProductRating rating={ratings} />
                <span className="text-gray-600">({ratings})</span>
            </div>
            <p className="text-lg text-gray-700">{description}</p>
            <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-gray-800">
                        ${salePrice || price}
                    </span>
                    {onSale && (
                        <span className="text-gray-500 line-through">
                            ${price}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
