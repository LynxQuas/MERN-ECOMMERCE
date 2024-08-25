import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import img1 from "../../assets/test2.jpg";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../libs/product";
import { useState } from "react";
import { Link } from "react-router-dom";

const FeatureItems = () => {
    const {
        data: products,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    const featureItems = products?.filter((product) => product.isFeature) || [];
    const [featureIndex, setFeatureIndex] = useState(0);

    const handleFeatureItemChange = (direction) => {
        setFeatureIndex((prevIndex) => {
            if (direction === "next") {
                return prevIndex === featureItems.length - 1
                    ? 0
                    : prevIndex + 1;
            } else if (direction === "prev") {
                return prevIndex === 0
                    ? featureItems.length - 1
                    : prevIndex - 1;
            }
        });
    };

    if (isLoading) {
        return <div className="text-white">Loading...</div>;
    }

    if (isError) {
        return <div className="text-white">Error: {error.message}</div>;
    }

    return (
        <div className="relative flex flex-col items-center py-5 px-4 h-[450px] md:mx-6 overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 w-full md:h-[600px]">
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Link
                    to={`/shop/${featureItems[featureIndex]?.category}/${featureItems[featureIndex]?._id}`}
                >
                    <img
                        src={featureItems[featureIndex]?.imageUrl || img1}
                        alt="Feature item"
                        className="object-cover md:object-contain w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 rounded-2xl"
                    />
                </Link>

                <button
                    onClick={() => handleFeatureItemChange("prev")}
                    className="absolute top-[50%] left-4 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-purple-700 rounded-full w-12 h-12 p-2 transition duration-300 ease-in-out shadow-lg"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>

                <button
                    onClick={() => handleFeatureItemChange("next")}
                    className="absolute top-[50%] right-4 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-purple-700 rounded-full w-12 h-12 p-2 transition duration-300 ease-in-out shadow-lg"
                >
                    <ArrowRightIcon className="w-6 h-6" />
                </button>

                <div className="absolute bottom-8 left-[50%] transform -translate-x-1/2 flex gap-2">
                    {featureItems.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === featureIndex
                                    ? "bg-white"
                                    : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>

                <div className="absolute top-5 left-5 bg-red-600 p-2 rounded-full px-4 rotate-12 shadow-lg">
                    <span className="text-white font-semibold">
                        FEATURE ITEMS
                    </span>
                </div>
            </div>

            <div className="text-white text-center mt-4">
                <h2 className="text-2xl font-bold">
                    {featureItems[featureIndex]?.name || "Feature Item"}
                </h2>
                <p className="mt-2 text-lg">
                    ${featureItems[featureIndex]?.price || "0.00"}
                </p>
            </div>
        </div>
    );
};

export default FeatureItems;
