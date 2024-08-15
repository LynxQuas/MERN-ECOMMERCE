import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

import Spinner from "../components/ui/Spinner";
import Error from "../components/ui/Error";
import ProductCTA from "../components/Shop/ProductCTA";
import ColorSelector from "../components/Shop/ColorSelector";
import ProductRating from "../components/Shop/ProductRating";
import SizeSelector from "../components/Shop/SizeSelector";

import { getProductDetails } from "../libs/product";
import Button from "../components/ui/Button";

const ItemDetails = () => {
    const { productId } = useParams();
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductDetails(productId),
    });

    const handleQuantityChange = (operation) => {
        setSelectedQuantity((prev) =>
            operation === "increase" ? prev + 1 : Math.max(prev - 1, 1)
        );
    };

    const handleAddToCart = () => {
        const orderData = {
            _id: data._id,
            name: data.name,
            price: data.price,
            color: selectedColor,
            size: selectedSize,
            quantity: selectedQuantity,
            imageUrl: data.imageUrl,
            status: "pending",
        };

        console.log(orderData);
    };

    if (isLoading) return <Spinner />;

    if (isError)
        return (
            <Error
                text={error.message}
                onRetry={() => window.location.reload()}
            />
        );

    return (
        <div className="flex flex-col gap-4 md:justify-center md:flex-row md:mx-10 my-2 md:px-5 md:bg-white rounded-3xl shadow-2xl md:p-10 center">
            <img
                src={data?.imageUrl}
                alt={data?.name}
                className="md:w-[50%] object-cover rounded-lg overflow-clip"
            />

            <div className="flex flex-col py-4 px-5 md:px-10 gap-4 grow">
                <div className="flex items-center justify-between flex-wrap">
                    <h1 className="text-xl md:text-2xl font-bold">
                        {data?.name}
                    </h1>
                    <p className="font-semibold">
                        ${data?.price}
                        <span className="ml-4 line-through text-gray-400">
                            $20.00
                        </span>
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <ProductRating rating={data?.ratings} />
                    <span>({data.ratings})</span>
                </div>

                <p>{data?.description}</p>

                <hr />

                <p>Select Color:</p>
                <ColorSelector
                    colors={data?.colors || []}
                    selectedColor={selectedColor}
                    onSelectColor={(e) =>
                        setSelectedColor(e.target.dataset.color)
                    }
                />

                <hr />

                <p>Select Size:</p>
                <SizeSelector
                    sizes={data?.sizes || []}
                    selectedSize={selectedSize}
                    onSelectSize={(e) => setSelectedSize(e.target.dataset.size)}
                />

                <ProductCTA
                    onAddToCart={handleAddToCart}
                    onMinus={() => handleQuantityChange("decrease")}
                    onPlus={() => handleQuantityChange("increase")}
                    selectedQuantity={selectedQuantity}
                />
                <Button className="border border-black p-2 rounded-md font-semibold">
                    ADD TO WISHLIST
                </Button>
            </div>
        </div>
    );
};

export default ItemDetails;
