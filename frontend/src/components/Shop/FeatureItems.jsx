import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import img1 from "../../assets/test2.jpg";
const FeatureItems = () => {
    return (
        <div className="py-5 px-4 flex  relative md:h-[450px] md:mx-6">
            <img
                src={img1}
                alt="Feature item"
                className="object-cover rounded-2xl"
            />

            <div className="bg-purple-500 text-white rounded-full w-10 h-10 p-2 absolute top-[50%] left-0 translate-y-[-50%]">
                <ArrowLeftIcon />
            </div>
            <div className="bg-purple-500 text-white rounded-full w-10 h-10 p-2 absolute top-[50%] right-0 translate-y-[-50%]">
                <ArrowRightIcon />
            </div>

            <div
                className=" flex gap-4 justify-center items-center absolute bottom-8 left-[50%]
        translate-x-[-50%]"
            >
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <div className="w-3 h-3 rounded-full bg-white" />
                <div className="w-3 h-3 rounded-full bg-white" />
            </div>

            <div className="absolute top-5 left-0 bg-red-600 p-2 rounded-full px-4 rotate-12">
                <span className="text-white font-semibold">BEST SELLERS</span>
            </div>
        </div>
    );
};

export default FeatureItems;
