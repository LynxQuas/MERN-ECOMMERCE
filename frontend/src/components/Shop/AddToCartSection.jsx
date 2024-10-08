import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";

const AddToCartSection = ({
    onPlus,
    onMinus,
    selectedQuantity,
    onAddToCart,
    isAdding,
}) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row flex-wrap">
            <div className="flex grow items-center justify-around md:w-[10rem] bg-purple-100 p-2 rounded-md">
                <Button onClick={onMinus}>
                    <MinusIcon className="w-5 h-5" />
                </Button>
                <span className="text-2xl">{selectedQuantity}</span>
                <Button onClick={onPlus}>
                    <PlusIcon className="w-5 h-5" />
                </Button>
            </div>

            <Button
                disabled={isAdding}
                className="hover:bg-amber-500 md:px-14 bg-amber-600 transition-colors text-white p-2 rounded-md font-semibold"
                onClick={onAddToCart}
            >
                ADD TO CART
            </Button>
        </div>
    );
};

export default AddToCartSection;
