import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CartItem from "./CartItem";
import { useUser } from "../../context/UserContext";
import EmptyCard from "./EmptyCard";

const CartContainer = ({ isOpen, onClose }) => {
    const cartRef = useRef(null);

    useClickOutside(() => {
        if (isOpen) onClose();
    });

    const { auth } = useUser();
    const user = auth?.user;

    return (
        <>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40"
                        aria-hidden="true"
                        role="presentation"
                        onClick={onClose}
                    />
                    <div
                        ref={cartRef}
                        className={`fixed animate-slideInCart top-0 right-0 w-[100%] md:w-[40%] h-screen bg-white shadow-md z-50 pb-80 ${
                            user.cart.length === 0
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
                        {!user ? (
                            <h3 className="text-center my-40 text-2xl">
                                Please login to see cart items.
                            </h3>
                        ) : (
                            <div className="p-4 flex flex-col gap-5 ">
                                {user.cart.length < 0 ? (
                                    user.cart.map((cart) => (
                                        <CartItem key={cart.id} />
                                    ))
                                ) : (
                                    <EmptyCard onClose={onClose} />
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default CartContainer;
