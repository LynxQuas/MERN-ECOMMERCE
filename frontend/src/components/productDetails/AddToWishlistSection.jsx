import Button from "../ui/Button";

const AddToWishlistSection = ({ isInWishlist, onToggleWishlist }) => {
    return (
        <Button
            onClick={onToggleWishlist}
            className={` ${
                isInWishlist
                    ? "bg-red-500 hover:bg-red-400"
                    : "bg-purple-700 hover:bg-purple-600"
            } text-white p-3 rounded-md font-semibold `}
        >
            {isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
        </Button>
    );
};

export default AddToWishlistSection;
