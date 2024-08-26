import ColorSelector from "../Shop/ColorSelector";
import SizeSelector from "../Shop/SizeSelector";

const ProductOptions = ({
    colors,
    selectedColor,
    onSelectColor,
    colorError,
    sizeError,
    sizes,
    selectedSize,
    onSelectSize,
}) => {
    return (
        <div className="flex flex-col gap-4 mt-4">
            <div>
                <p className="font-semibold text-gray-800 mb-2">
                    Select Color:
                </p>
                <ColorSelector
                    colors={colors}
                    selectedColor={selectedColor}
                    onSelectColor={onSelectColor}
                />
                {colorError && (
                    <p className="text-red-500 text-sm mt-1">{colorError}</p>
                )}
            </div>
            <div>
                <p className="font-semibold text-gray-800 mb-2">Select Size:</p>
                <SizeSelector
                    sizes={sizes}
                    selectedSize={selectedSize}
                    onSelectSize={onSelectSize}
                />
                {sizeError && (
                    <p className="text-red-500 text-sm mt-1">{sizeError}</p>
                )}
            </div>
        </div>
    );
};

export default ProductOptions;
