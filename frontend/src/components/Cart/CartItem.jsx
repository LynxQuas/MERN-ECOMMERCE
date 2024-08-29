import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItem, updateQuantity } from "../../libs/cart";
import toast from "react-hot-toast";
import { cn } from "../../utils/clsx";

const CartItem = ({ data = {} }) => {
    const queryClient = useQueryClient();

    const { mutate: removeCartItemMutation, isPending: isDeleting } =
        useMutation({
            mutationFn: removeCartItem,
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

    const { mutate: updateQuantityMutation, isPending: isUpdating } =
        useMutation({
            mutationFn: updateQuantity,
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ["carts"],
                });

                toast.success(data.message);
            },
            onError: (err) => {
                console.log(err);
                toast.error(err.message);
            },
        });

    const handleRemoveCartItem = () => {
        removeCartItemMutation({
            userId: data.userId,
            productId: data.productId,
        });
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantityMutation({
            userId: data.userId,
            productId: data.productId._id,
            quantity: newQuantity,
            color: data.color,
            size: data.size,
        });
    };

    return (
        <div className="relative flex gap-2 py-2 px-3 items-center justify-between md:gap-6 shadow-md">
            {(isUpdating || isDeleting) && (
                <div className="absolute bg-black w-full top-0 left-0 z-50 h-full opacity-50 flex items-center justify-center">
                    <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin" />
                </div>
            )}
            <img
                className="w-28 h-28 object-cover"
                src={data.imageUrl}
                alt={data?.productId?.name}
            />
            <div className="flex flex-col gap-2 grow">
                <h3 className="font-semibold">{data?.productId?.name}</h3>
                <div className="flex gap-3 items-center">
                    <p>${data.price}</p>
                    <div
                        className={cn("w-5 h-5 border shadow-sm rounded-full")}
                        style={{
                            backgroundColor: data.color,
                        }}
                    />
                    <span>{data.size}</span>
                </div>
                <div>
                    <span className="text-orange-400 font-semibold">
                        Total: ${(data.price * data.quantity).toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-center items-center gap-2 rounded-md bg-gray-200 p-2">
                    <button
                        onClick={() => handleQuantityChange(data.quantity - 1)}
                        disabled={isUpdating || data.quantity <= 1}
                        aria-disabled={isUpdating}
                    >
                        <MinusIcon className="w-5 h-5" />
                    </button>
                    <span className="text-xl">{data.quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(data.quantity + 1)}
                        disabled={isUpdating}
                        aria-disabled={isUpdating}
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </div>
                <Button
                    onClick={handleRemoveCartItem}
                    className="bg-red-500 text-white rounded-sm"
                    disabled={isDeleting}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default CartItem;

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque excepturi animi officia perferendis inventore delectus officiis molestiae error obcaecati eius quia minus eos nam neque, hic, cumque blanditiis ipsa adipisci.
