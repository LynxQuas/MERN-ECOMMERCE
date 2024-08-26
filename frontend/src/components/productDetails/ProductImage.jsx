const ProductImage = ({ src, alt }) => {
    return (
        <img
            src={src}
            alt={alt}
            className=" w-full max-w-md md:max-w-lg lg:max-w-xl  xl:max-w-2xl h-auto md:h-[60vh] lg:h-[70vh] xl:h-[80vh] object-cover rounded-lg   shadow-md transition-transform transform hover:scale-105"
        />
    );
};

export default ProductImage;
