import { cn } from "../../utils/clsx";

const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => (
    <div className="flex gap-4 my-5 items-center h-10">
        {sizes.map((size) => (
            <span
                key={size}
                data-size={size}
                onClick={onSelectSize}
                className={cn(
                    `py-2 px-3 text-center rounded-md bg-gray-200 font-semibold cursor-pointer transition-all hover:text-3xl hover:text-purple-700 `,
                    `${selectedSize === size && "text-purple-700 text-3xl"}`
                )}
            >
                {size}
            </span>
        ))}
    </div>
);

export default SizeSelector;
