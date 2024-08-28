import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CartItem from "./CartItem";
import { useUser } from "../../context/UserContext";
import EmptyCard from "./EmptyCard";
import { useQuery } from "@tanstack/react-query";
import { getOrderByUserId } from "../../libs/cart";
import Spinner from "../ui/Spinner";

const CartContainer = ({ isOpen, onClose }) => {
    const cartRef = useRef(null);

    useClickOutside(() => {
        if (isOpen) onClose();
    });

    const { auth } = useUser();
    const user = auth?.user;

    const { data: cart = [], isLoading } = useQuery({
        queryKey: ["carts"],
        queryFn: () => getOrderByUserId(user._id),
        enabled: isOpen,
    });

    console.log(isLoading);

    const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart
        ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);

    return (
        <>
            {isOpen && (
                <div className="w-[40%]">
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40"
                        aria-hidden="true"
                        role="presentation"
                        onClick={onClose}
                    />
                    <div
                        ref={cartRef}
                        className={`scrollbar-custom overflow-y-auto fixed animate-slideInCart top-0 right-0 w-[100%] md:w-[40%] h-screen bg-white shadow-md z-50 pb-80 ${
                            cart.length === 0
                                ? "overflow-hidden"
                                : "overflow-y-scroll"
                        }`}
                        aria-labelledby="cart-title"
                    >
                        <header className="p-4 border-b">
                            <h2
                                id="cart-title"
                                className="text-xl font-semibold"
                            >
                                Cart
                            </h2>
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                aria-label="Close cart"
                                onClick={onClose}
                            >
                                <XMarkIcon className="w-8 h-8" />
                            </button>
                        </header>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="p-4 flex flex-col gap-5">
                                {cart.length !== 0 ? (
                                    cart?.map((cart) => (
                                        <CartItem key={cart._id} data={cart} />
                                    ))
                                ) : (
                                    <EmptyCard onClose={onClose} />
                                )}
                            </div>
                        )}

                        <footer className="fixed w-full bottom-0 bg-gray-100 p-4 border-t border-gray-200 shadow-inner">
                            <div className="flex flex-col gap-4 my-4">
                                <span className="text-base font-medium border-b-2 border-stone-300 py-2">
                                    <span className="font-semibold ">
                                        Total Items:
                                    </span>{" "}
                                    {totalItems}
                                </span>

                                <span className="text-base font-medium">
                                    <span className="font-semibold">
                                        Total Price:
                                    </span>
                                    ${totalPrice}
                                </span>
                            </div>
                            <button
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                                onClick={() => {
                                    console.log("Order successfully.");
                                }}
                            >
                                Checkout
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartContainer;
