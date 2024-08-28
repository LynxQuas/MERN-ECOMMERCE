const ProductImage = ({ src, alt }) => {
    return (
        <img
            src={src}
            alt={alt}
            className="md:w-[500px] w-full h-auto md:h-[35rem] object-cover rounded-lg shadow-md transition-transform transform hover:scale-105 shrink-0"
        />
    );
};

export default ProductImage;
