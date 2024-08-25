import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useUser } from "../../context/UserContext";

import { addToWishlist, removeWishlistItem } from "../../libs/user";
import { getProductDetails } from "../../libs/product";

import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import Error from "../../components/ui/Error";
import ProductCTA from "../../components/Shop/ProductCTA";
import ColorSelector from "../../components/Shop/ColorSelector";
import ProductRating from "../../components/Shop/ProductRating";
import SizeSelector from "../../components/Shop/SizeSelector";

const ItemDetails = () => {
    const { productId } = useParams();
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [sizeError, setSizeError] = useState("");
    const [colorError, setColorError] = useState("");

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductDetails(productId),
    });

    const queryClient = useQueryClient();
    const { auth, setAuth } = useUser();
    const [isInWishlist, setIsInWishlist] = useState(false);

    const {
        _id,
        imageUrl,
        name,
        price,
        salePrice,
        onSale,
        ratings = 0,
        description,
        colors = [],
        sizes = [],
    } = data || {};

    const { mutate: addToWishlistMutation } = useMutation({
        mutationFn: (wishlistData) => addToWishlist(wishlistData),
        onSuccess: (data) => {
            setAuth((prevAuth) => ({
                ...prevAuth,
                user: data.user,
            }));

            queryClient.invalidateQueries({
                queryKey: ["user", auth.user._id],
            });
            toast.success(data.message);
            setIsInWishlist(true);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to add wishlist.");
        },
    });

    const { mutate: removeFromWishlistMutation } = useMutation({
        mutationFn: (wishlistData) => removeWishlistItem(wishlistData),
        onSuccess: (data) => {
            setAuth((prevAuth) => ({
                ...prevAuth,
                user: data.user,
            }));

            queryClient.invalidateQueries({
                queryKey: ["user", auth.user._id],
            });
            toast.success(data.message);
            setIsInWishlist(false);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to remove item from wishlist.");
        },
    });

    const handleQuantityChange = useCallback((operation) => {
        setSelectedQuantity((prev) =>
            operation === "increase" ? prev + 1 : Math.max(prev - 1, 1)
        );
    }, []);

    const handleAddToCart = useCallback(() => {
        if (!selectedColor) {
            setColorError("Please Select the color");
            return;
        }

        if (!selectedSize) {
            setSizeError("Please Select the size");
            return;
        }

        console.log("Ordered successfully.");
    }, [selectedColor, selectedSize]);

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            removeFromWishlistMutation({
                productId: _id,
                userId: auth.user._id,
            });
        } else {
            addToWishlistMutation({ productId: _id, userId: auth.user._id });
        }
    };

    let addToCartSection;

    if (auth?.user && auth?.user?.role !== "admin") {
        addToCartSection = (
            <div className="flex flex-col gap-4 mt-4">
                <ProductCTA
                    onAddToCart={handleAddToCart}
                    onMinus={() => handleQuantityChange("decrease")}
                    onPlus={() => handleQuantityChange("increase")}
                    selectedQuantity={selectedQuantity}
                />

                {auth?.user && (
                    <Button
                        onClick={handleWishlistToggle}
                        className={`w-full py-3 rounded-md font-semibold transition duration-300 ${
                            isInWishlist
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                    >
                        {isInWishlist
                            ? "REMOVE FROM WISHLIST"
                            : "ADD TO WISHLIST"}
                    </Button>
                )}
            </div>
        );
    }

    useEffect(() => {
        setIsInWishlist(auth?.user?.wishlist?.includes(_id));
    }, [auth, _id]);

    if (isLoading) return <Spinner />;

    if (isError)
        return (
            <Error
                text={error.message}
                onRetry={() => window.location.reload()}
            />
        );

    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 p-6 md:p-10 bg-white rounded-lg shadow-lg">
            <div className="relative flex-1">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-[37rem] md:h-[80vh] object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                />
            </div>

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

                    <div>
                        <p className="font-semibold text-gray-800 mb-2">
                            Select Color:
                        </p>
                        <ColorSelector
                            colors={colors}
                            selectedColor={selectedColor}
                            onSelectColor={(e) => {
                                setSelectedColor(e.target.dataset.color);
                                setColorError("");
                            }}
                        />
                        {colorError && (
                            <p className="text-red-500 text-sm mt-1">
                                {colorError}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800 mb-2">
                            Select Size:
                        </p>
                        <SizeSelector
                            sizes={sizes}
                            selectedSize={selectedSize}
                            onSelectSize={(e) => {
                                setSelectedSize(e.target.dataset.size);
                                setSizeError("");
                            }}
                        />
                        {sizeError && (
                            <p className="text-red-500 text-sm mt-1">
                                {sizeError}
                            </p>
                        )}
                    </div>

                    {addToCartSection}
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
