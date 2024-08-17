import testImg from "../../assets/card.jpg";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

const CartItem = () => {
    return (
        <div className="flex gap-1 items-center justify-around md:gap-6 shadow-md">
            <img className="w-28 h-28 object-cover" src={testImg} />

            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">Red Men Tee</h3>
                <div className="flex gap-3 items-center">
                    <p>$42.00</p>
                    <div className="w-5 h-5 bg-black rounded-full" />
                    <span>XL</span>
                </div>
                <div>
                    <span className="text-orange-400">pending</span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-md bg-gray-200 px-4 py-2">
                <button>
                    <MinusIcon className="w-5 h-5" />
                </button>
                <span className="text-xl">1</span>
                <button>
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
