import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWishlist, removeWishlistItem } from "../libs/user";

import toast from "react-hot-toast";

const useWishlist = () => {
    const queryClient = useQueryClient();

    const { mutate: addToWishListMutation, isPending: addingWishlistItem } =
        useMutation({
            mutationFn: addToWishlist,
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ["wishlists"],
                });
                toast.success(data.message);
            },
            onError: (err) => {
                toast.error(err.message || "Failed to add to wishlist.");
            },
        });

    const {
        mutate: removeFromWishlistMutation,
        isPending: removingWishlistItem,
    } = useMutation({
        mutationFn: removeWishlistItem,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["wishlists"],
            });
            toast.success(data.message);
        },
        onError: (err) =>
            toast.error(err.message || "Failed to remove from wishlist."),
    });

    return {
        addToWishListMutation,
        removeFromWishlistMutation,
        addingWishlistItem,
        removingWishlistItem,
    };
};

export default useWishlist;
