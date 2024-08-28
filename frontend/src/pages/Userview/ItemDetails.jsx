import { useCallback } from "react";

import Spinner from "../../components/ui/Spinner";
import Error from "../../components/ui/Error";

import useProductDetails from "../../hooks/useProductDetails";
import ProductOptions from "../../components/productDetails/ProductOptions";
import ProductDetails from "../../components/productDetails/ProductDetails";
import ProductImage from "../../components/productDetails/ProductImage";
import AddToCartSection from "../../components/Shop/AddToCartSection";

import AddToWishlistSection from "../../components/productDetails/AddToWishlistSection";
import useWishlist from "../../hooks/useWishlist";
import { useUser } from "../../context/UserContext";
import { getUserWishlist } from "../../libs/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useProductOption from "../../hooks/useProductOption";
import { addToCartFetch } from "../../libs/cart";
import toast from "react-hot-toast";

const ItemDetails = () => {
    const {
        data: product = [],
        isLoading,
        isError,
        error,
    } = useProductDetails();

    const {
        state,
        handleSelectColor,
        handleSelectSize,
        handleQuantityChange,
        validateSelections,
    } = useProductOption();

    const {
        addingWishlistItem,
        removingWishlistItem,
        addToWishListMutation,
        removeFromWishlistMutation,
    } = useWishlist();
    const { auth } = useUser();

    const { data: userWishlist = [] } = useQuery({
        queryKey: ["wishlists"],
        queryFn: () => getUserWishlist(auth?.user?._id),
        enabled: !!auth?.user,
    });

    const isInWishlist = userWishlist.some((item) => item._id === product?._id);

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: addToCartFetch,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["carts"],
            });
            toast.success(data.message);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const handleAddToCart = useCallback(() => {
        if (!validateSelections()) return;

        const orderData = {
            productId: product._id,
            imageUrl: product.imageUrl,
            size: state.selectedSize,
            color: state.selectedColor,
            quantity: state.selectedQuantity,
            price: product.salePrice || product.price,
            userId: auth.user._id,
        };

        mutate(orderData);
    }, [
        state,
        product._id,
        product.imageUrl,
        product.salePrice,
        product.price,
        auth?.user?._id,
        validateSelections,
        mutate,
    ]);

    const toggleWishlistHandler = () => {
        const data = {
            productId: product._id,
            userId: auth?.user?._id,
        };
        if (isInWishlist) {
            removeFromWishlistMutation(data);
        } else {
            addToWishListMutation(data);
        }
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
        <div className="flex flex-col justify-center md:flex-row gap-6 md:gap-12 p-6 md:p-20 bg-white rounded-lg shadow-lg md:m-10">
            <ProductImage src={product.imageUrl} alt={product.name} />

            <div className="flex-col gap-4">
                <ProductDetails
                    name={product.name}
                    rating={product.ratings}
                    description={product.description}
                    salePrice={product.salePrice}
                    price={product.price}
                    onSale={product.onSale}
                />

                <ProductOptions
                    colors={product.colors}
                    sizes={product.sizes}
                    selectedColor={state.selectedColor}
                    selectedSize={state.selectedSize}
                    onSelectColor={handleSelectColor}
                    onSelectSize={handleSelectSize}
                    colorError={state.colorError}
                    sizeError={state.sizeError}
                />

                {!auth?.user ||
                    (auth.user.role !== "admin" && (
                        <div className="flex flex-col gap-4">
                            <AddToCartSection
                                onAddToCart={handleAddToCart}
                                onMinus={() => handleQuantityChange("decrease")}
                                onPlus={() => handleQuantityChange("increase")}
                                selectedQuantity={state.selectedQuantity}
                                isAdding={isPending}
                            />

                            <AddToWishlistSection
                                onToggleWishlist={toggleWishlistHandler}
                                isInWishlist={isInWishlist}
                                adding={addingWishlistItem}
                                removing={removingWishlistItem}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ItemDetails;
