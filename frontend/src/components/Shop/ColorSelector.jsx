import { cn } from "../../utils/clsx";

const ColorSelector = ({ colors, selectedColor, onSelectColor }) => (
    <div className="flex gap-3 my-5 items-center w-full h-10">
        {colors?.map((color) => (
            <div
                key={color}
                data-color={color}
                onClick={onSelectColor}
                style={{ backgroundColor: color }}
                className={cn(
                    `w-5 h-5 block border-2 rounded-full transition-all duration-300 cursor-pointer hover:w-8 hover:h-8`,
                    `${selectedColor === color && "w-8 h-8"}`
                )}
            />
        ))}
    </div>
);

export default ColorSelector;
