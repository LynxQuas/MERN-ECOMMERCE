import { StarIcon } from "@heroicons/react/24/outline";

const ProductRating = ({ rating }) => (
    <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
            <StarIcon
                key={index}
                className={`w-5 h-5 ${index < rating ? "fill-amber-500" : ""}`}
            />
        ))}
    </div>
);

export default ProductRating;
