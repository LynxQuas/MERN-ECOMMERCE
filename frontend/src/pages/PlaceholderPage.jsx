import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const PlaceholderPage = () => {
    return (
        <div className="h-[70vh]  flex justify-center items-center">
            <div className="flex flex-col gap-4 p-10">
                <ExclamationTriangleIcon className="w-20 h-20 fill-amber-400" />
                <h2 className="text-xl font-bold inline-block">
                    Page Under Construction
                </h2>
                <p>
                    This page is currently under development. Please come back
                    later.
                </p>
            </div>
        </div>
    );
};

export default PlaceholderPage;
